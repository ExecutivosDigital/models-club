"use client";
import { GenericCard } from "@/components/ui/card";
import { FileUploadInput } from "@/components/ui/file-upload-input";
import { useApiContext } from "@/context/ApiContext";
import { useModelContext } from "@/context/ModelContext";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

export function ModelCard2() {
  const { PutAPI } = useApiContext();
  const {
    selectedModel,
    setSelectedModel,
    newModelData,
    setNewModelData,
    isGettingModels,
  } = useModelContext();
  const [isUploading, setIsUploading] = useState(false);

  async function UpdateSelectedModelPhoto(url: string) {
    if (selectedModel) {
      const update = await PutAPI(
        `/model/${selectedModel.id}`,
        {
          photoUrl: url,
        },
        true,
      );
      if (update.status === 200) {
        toast.success("Foto de perfil atualizada com sucesso!");
        return setIsUploading(false);
      }
      toast.error(update.body.message);
      return setIsUploading(false);
    }
  }

  const handleUpload = (url: string, fullUrl: string) => {
    if (selectedModel) {
      setSelectedModel({ ...selectedModel, photoUrl: fullUrl });
      UpdateSelectedModelPhoto(url);
    } else if (newModelData) {
      setNewModelData({ ...newModelData, photoUrl: fullUrl });
    } else {
      setNewModelData({
        bio: "",
        clientId: "",
        contentPrompt: "",
        instagram: null,
        name: "",
        photos: [],
        prices: [],
        sellPrompt: "",
        videos: [],
        whatsApp: null,
        photoUrl: fullUrl,
      });
    }
  };

  return (
    <GenericCard
      className="h-full min-h-52 xl:col-span-1"
      isLoading={isGettingModels}
    >
      <div className="flex gap-2">
        <div className="flex flex-1 flex-col gap-2">
          <span className="font-semibold">Inserir Foto de Perfil</span>
          <span className="text-neutral-400">
            Maximize o potencial das suas postagens e redes sociais com a
            avançada ferramenta de Inteligência Artificial da Inspire AI, que
            oferece insights valiosos
          </span>
        </div>
        <Image
          src="/logos/small-logo.png"
          alt=""
          width={500}
          height={500}
          className="h-10 min-h-10 w-10 min-w-10 rounded object-contain"
        />
      </div>
      <div className="flex w-full flex-1 items-center gap-2">
        <label className="relative flex h-8 w-full items-center gap-1 rounded-md bg-stone-950 px-2">
          <FileUploadInput
            isUploading={isUploading}
            setIsUploading={setIsUploading}
            handleUpload={handleUpload}
            isUploaded={
              selectedModel
                ? selectedModel.photoUrl !== ""
                : newModelData
                  ? newModelData.photoUrl !== ""
                  : false
            }
          />
        </label>
      </div>
    </GenericCard>
  );
}
