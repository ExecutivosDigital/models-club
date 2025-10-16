"use client";
import { Modal } from "@/components/ui/modal";
import { X } from "lucide-react";
import Image from "next/image";
import { GalleryItemProps } from "./card-7";

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMedia: GalleryItemProps;
}

export function MediaModal({
  isOpen,
  onClose,
  selectedMedia,
}: MediaModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="w-[90vw] relative max-h-[90vh] xl:h-[90vh] xl:w-auto xl:max-w-[90vw]"
    >
      <X
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-2 right-2 z-10 cursor-pointer stroke-3 text-white"
      />
      {selectedMedia.type === "photo" ? (
        <Image
          src={selectedMedia.src}
          width={2000}
          height={2000}
          quality={100}
          className="h-full w-full object-contain"
          alt=""
        />
      ) : (
        selectedMedia.type === "video" && (
          <video
            src={selectedMedia.src}
            className="h-full w-full object-contain"
            controls
          />
        )
      )}
    </Modal>
  );
}
