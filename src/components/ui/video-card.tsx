"use client";

import { useVideoPoster } from "@/utils/create-video-poster";

interface VideoCardProps {
  src: string;
}
export function VideoCard({ src }: VideoCardProps) {
  const { poster } = useVideoPoster(src);
  return (
    <div className="relative">
      <span className="bg-primary/60 absolute top-1 left-1 rounded-full px-1 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
        Vídeo
      </span>
      <video
        src={src}
        className="h-28 w-full rounded-xl bg-neutral-900 object-cover xl:hidden"
        muted
        playsInline
        preload="metadata"
        poster={poster as string}
      />
      <video
        src={src}
        className="hidden aspect-square w-full rounded-md object-cover xl:block"
        muted
        playsInline
        preload="metadata"
        poster={poster as string}
      />
    </div>
  );
}
