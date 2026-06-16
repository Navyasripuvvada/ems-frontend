"use client";

import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import api from "@/lib/api";

export default function AttendancePage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [status, setStatus] = useState("Loading...");
  const [ready, setReady] = useState(false);

  // -----------------------------
  // INIT MODELS + CAMERA
  // -----------------------------
  useEffect(() => {
    const init = async () => {
      try {
        const MODEL_URL = "/models";

        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          await new Promise((resolve) => {
            videoRef.current!.onloadedmetadata = () => {
              videoRef.current!.play();
              resolve(true);
            };
          });
        }

        setReady(true);
        setStatus("Ready to mark attendance");
      } catch (err) {
        console.error(err);
        setStatus("Camera or model loading failed");
      }
    };

    init();
  }, []);

  // -----------------------------
  // MARK ATTENDANCE
  // -----------------------------
  const markAttendance = async () => {
    try {
      if (!videoRef.current) {
        setStatus("Camera not ready");
        return;
      }

      setStatus("Detecting face...");

      const detection = await faceapi
        .detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions({
            inputSize: 320,
            scoreThreshold: 0.5,
          })
        )
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detection || !detection.descriptor) {
        setStatus("No face detected");
        return;
      }

      const descriptor = Array.from(detection.descriptor);

      if (descriptor.length !== 128) {
        setStatus("Invalid face descriptor");
        return;
      }

      const token = localStorage.getItem("token");

      if (!token) {
        setStatus("Token missing. Please login again.");
        return;
      }

      setStatus("Marking attendance...");

      // 🔥 FIXED REQUEST (MATCH BACKEND)
      const res = await api.post(
        "http://localhost:5000/attendance/mark",
        {
          faceDescriptor: descriptor, // ✅ MUST MATCH BACKEND
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStatus(res.data.message || "Attendance marked");
    } catch (err: any) {
      console.error(err);
      setStatus(
        err?.response?.data?.message || "Attendance failed"
      );
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Face Attendance System</h2>

      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        width={400}
        height={300}
        style={{ border: "2px solid black", borderRadius: 10 }}
      />

      <br />

      <button
        onClick={markAttendance}
        disabled={!ready}
        style={{
          marginTop: 10,
          padding: "10px 20px",
          cursor: ready ? "pointer" : "not-allowed",
        }}
      >
        {ready ? "Mark Attendance" : "Loading..."}
      </button>

      <p style={{ marginTop: 10 }}>{status}</p>
    </div>
  );
}