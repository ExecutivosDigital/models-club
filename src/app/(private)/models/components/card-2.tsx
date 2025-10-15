"use client";
import { GenericCard } from "@/components/ui/card";
import { useApiContext } from "@/context/ApiContext";
import { useModelContext } from "@/context/ModelContext";
import { cn } from "@/utils/cn";
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
  const [isUpdating, setIsUpdating] = useState(false);

  async function UpdateSelectedModelInstagram() {
    setIsUpdating(true);
    if (selectedModel) {
      const update = await PutAPI(
        `/model/${selectedModel.id}`,
        {
          instagram: selectedModel.instagram,
        },
        true,
      );
      if (update.status === 200) {
        toast.success("Instagram atualizado com sucesso!");
        return setIsUpdating(false);
      }
      toast.error(update.body.message);
      return setIsUpdating(false);
    }
  }

  const handleChangeModelInstagram = (value: string) => {
    if (selectedModel) {
      setSelectedModel({
        ...selectedModel,
        instagram: value,
      });
    } else if (newModelData) {
      setNewModelData({
        ...newModelData,
        instagram: value,
      });
    } else {
      setNewModelData({
        bio: "",
        clientId: "",
        contentPrompt: "",
        instagram: value,
        name: "",
        photos: [],
        prices: [],
        sellPrompt: "",
        videos: [],
        whatsApp: null,
        photoUrl: "",
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
          <span className="font-semibold">Inserir @ Instagram</span>
          <span className="text-neutral-400">
            Maximize o potencial das suas postagens e redes sociais com a
            avançada ferramenta de Inteligência Artificial da Inspire AI, que
            oferece insights valiosos
          </span>
        </div>
        <Image
          src="/logos/instagram.png"
          alt=""
          width={500}
          height={500}
          className="h-10 min-h-10 w-10 min-w-10 rounded object-contain"
        />
      </div>
      <div className="flex w-full flex-1 items-center gap-2">
        <label className="relative flex h-8 w-full items-center gap-1 rounded-md bg-stone-950 px-2">
          <input
            className="absolute top-0 left-0 h-full w-full px-2"
            placeholder="@da_sua_modelo_aqui"
            value={
              selectedModel && selectedModel.instagram !== null
                ? (selectedModel.instagram as string)
                : newModelData && newModelData.instagram !== null
                  ? (newModelData.instagram as string)
                  : ""
            }
            disabled={isUpdating}
            onChange={(e) => handleChangeModelInstagram(e.target.value)}
          />
        </label>
        <button
          onClick={() => UpdateSelectedModelInstagram()}
          disabled={!selectedModel}
          className={cn(
            "h-8 w-44 rounded-md bg-stone-950 px-4 font-semibold",
            !selectedModel && "cursor-not-allowed opacity-50",
          )}
        >
          {selectedModel
            ? isUpdating
              ? "Salvando..."
              : "Atualizar"
            : !selectedModel && "Inserir"}
        </button>
      </div>
    </GenericCard>
  );
}
