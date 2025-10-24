// components/VideoModal.tsx
"use client";

import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  title: string;
  description: string;
}

export function VideoModal({
  isOpen,
  onClose,
  videoId,
  title,
  description,
}: VideoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative w-full max-w-4xl rounded-lg bg-zinc-900 p-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full bg-zinc-800 p-2 text-white hover:bg-zinc-700"
        >
          <X size={20} />
        </button>

        <div className="mb-4">
          <h2 className="text-xl font-bold text-white">{title}</h2>
        </div>

        <div className="aspect-video w-full overflow-hidden rounded-lg">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>

        <div className="mt-4">
          <p className="text-zinc-300">{description}</p>
        </div>
      </div>
    </div>
  );
}
