"use client";

import { useEffect, useRef, useState } from "react";
import faceapi from "@/lib/faceapi";
import api from "@/lib/api";
import { loadModels } from "@/lib/faceapi";

export default function AttendancePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    startCamera();
    loadModels();
  }, []);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) videoRef.current.srcObject = stream;
  };

  const markAttendance = async () => {
    setStatus("Scanning...");

    const detection = await faceapi
      .detectSingleFace(videoRef.current!, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) {
      setStatus("No face detected");
      return;
    }

    const descriptor = Array.from(detection.descriptor);

    const res = await api.post("/attendance/mark", {
      descriptor,
    });

    setStatus(res.data.message);
  };

  return (
    <div>
      <h1>Mark Attendance</h1>

      <video
        ref={videoRef}
        autoPlay
        muted
        width={400}
        height={300}
        style={{ border: "1px solid black" }}
      />

      <button onClick={markAttendance}>Mark Attendance</button>

      <p>{status}</p>
    </div>
  );
}