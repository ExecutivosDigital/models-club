"use client";

import { useApiContext } from "@/context/ApiContext";
import { ImageIcon, Loader2, Upload } from "lucide-react";
import toast from "react-hot-toast";

interface FileUploadInputProps {
  handleUpload: (url: string, fullUrl: string) => void;
  isUploading: boolean;
  setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
  isUploaded: boolean;
  title?: string;
}

export function FileUploadInput({
  handleUpload,
  isUploading,
  setIsUploading,
  isUploaded,
  title,
}: FileUploadInputProps) {
  const { PostAPI } = useApiContext();

  const handleUploadFile = async (selectedFile: File) => {
    if (!selectedFile) return;
    setIsUploading(true);
    const formData = new FormData();
    const sanitized = selectedFile.name.replace(/\s+/g, "-");
    formData.append("file", selectedFile, sanitized);
    const res = await PostAPI("/file", formData, true);
    if (res.status === 200) {
      handleUpload(res.body.url, res.body.fullUrl);
      return setIsUploading(false);
    }
    toast.error(res?.body?.message ?? "Falha no upload.");
    return setIsUploading(false);
  };

  return (
    <label className="relative flex h-full w-full items-center justify-between gap-2">
      {isUploaded && !isUploading ? (
        <>
          <span>Alterar Foto</span>
          <ImageIcon className="text-neutral-600" />
        </>
      ) : isUploading ? (
        <>
          <span>Carregando...</span>
          <Loader2 className="animate-spin text-neutral-600" />
        </>
      ) : (
        <>
          <span>{title ?? "Upload de Arquivo"}</span>
          <Upload className="text-neutral-600" />
        </>
      )}
      <input
        type="file"
        className="absolute inset-0 top-0 left-0 cursor-pointer opacity-0"
        onChange={(e) => e.target.files && handleUploadFile(e.target.files[0])}
        readOnly
        disabled={isUploading}
      />
    </label>
  );
}
