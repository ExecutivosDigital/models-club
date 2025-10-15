/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";

export function useVideoPoster(src: string) {
  const [poster, setPoster] = useState<string | null>(null);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!src) return;
    let aborted = false;

    const captureFrame = async () => {
      try {
        const v = document.createElement("video");
        v.crossOrigin = "anonymous";
        v.preload = "auto";
        v.src = src;

        await new Promise<void>((resolve, reject) => {
          const onLoaded = () => resolve();
          const onErr = (e: any) => reject(e);
          v.addEventListener("loadedmetadata", onLoaded, { once: true });
          v.addEventListener("error", onErr, { once: true });
        });
        if (aborted) return;

        const t = Math.max(0.1, Math.min(0.8, (v.duration || 1) - 0.2));
        v.currentTime = t;

        await new Promise<void>((resolve) => {
          const done = () => resolve();
          const rvfc = (v as any).requestVideoFrameCallback;
          if (typeof rvfc === "function") {
            rvfc.call(v, () => done());
          } else {
            v.addEventListener("seeked", done, { once: true });
          }
        });
        if (aborted) return;

        const canvas = document.createElement("canvas");
        canvas.width = v.videoWidth || 1280;
        canvas.height = v.videoHeight || 720;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(v, 0, 0, canvas.width, canvas.height);

        const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
        if (!aborted) setPoster(dataUrl);
      } catch (e) {
        if (!aborted) setError(e);
      }
    };

    captureFrame();
    return () => {
      aborted = true;
    };
  }, [src]);

  return { poster, error };
}
