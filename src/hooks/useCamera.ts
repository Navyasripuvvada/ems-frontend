import { useRef } from "react";

export const useCamera = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  return { videoRef, startCamera };
};