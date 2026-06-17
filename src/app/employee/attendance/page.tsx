"use client";

import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import api from "@/lib/api";

export default function AttendancePage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // ✅ Clean state (no default text)
  const [status, setStatus] = useState("");
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

        setReady(true); // ✅ system ready silently
      } catch (err) {
        console.error(err);
        setStatus("Initialization failed");
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

      setStatus("Scanning face...");

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
        setStatus("Face not detected");
        return;
      }

      const descriptor = Array.from(detection.descriptor);

      if (descriptor.length !== 128) {
        setStatus("Invalid face data");
        return;
      }

      const token = localStorage.getItem("token");

      if (!token) {
        setStatus("Authentication required");
        return;
      }

      setStatus("Submitting attendance...");

      const res = await api.post(
        "http://localhost:5000/attendance/mark",
        {
          faceDescriptor: descriptor,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStatus(res.data.message || "Attendance recorded");
    } catch (err: any) {
      console.error(err);
      setStatus(err?.response?.data?.message || "Request failed");
    }
  };

  // -----------------------------
  // STATUS COLOR
  // -----------------------------
  const getStatusColor = () => {
    if (
      status.toLowerCase().includes("fail") ||
      status.toLowerCase().includes("not")
    ) {
      return "text-red-600";
    }

    if (
      status.toLowerCase().includes("recorded") ||
      status.toLowerCase().includes("success")
    ) {
      return "text-green-600";
    }

    return "text-gray-500";
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold text-gray-800">
          Employee Attendance
        </h1>
        <span className="text-sm text-gray-500">
          Face Recognition System
        </span>
      </header>

      {/* Main */}
      <main className="flex justify-center items-center py-10 px-4">
        <div className="bg-white w-full max-w-lg border rounded-lg shadow-sm p-6">

          <h2 className="text-md font-medium text-gray-700 mb-4">
            Mark Attendance
          </h2>

          {/* Camera */}
          <div className="border rounded-md overflow-hidden bg-black mb-4">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-auto"
            />
          </div>

          {/* Button */}
          <button
            onClick={markAttendance}
            disabled={!ready}
            className={`w-full py-2.5 text-sm font-medium rounded-md transition
              ${
                ready
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }
            `}
          >
            Mark Attendance
          </button>

          {/* Status (only when needed) */}
          {status && (
            <p className={`mt-4 text-sm ${getStatusColor()}`}>
              {status}
            </p>
          )}

        </div>
      </main>
    </div>
  );
}