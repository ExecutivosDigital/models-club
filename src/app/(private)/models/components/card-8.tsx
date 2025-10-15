"use client";
import { GenericCard } from "@/components/ui/card";
import { useApiContext } from "@/context/ApiContext";
import { useModelContext } from "@/context/ModelContext";
import { cn } from "@/utils/cn";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export function ModelCard8() {
  const { PutAPI } = useApiContext();
  const {
    selectedModel,
    setSelectedModel,
    newModelData,
    setNewModelData,
    isGettingModels,
  } = useModelContext();

  const [isUpdating, setIsUpdating] = useState<
    "name" | "bio" | "contentPrompt" | null
  >(null);

  const HandleChangeModelName = (value: string) => {
    if (selectedModel) {
      setSelectedModel({
        ...selectedModel,
        name: value,
      });
    } else if (newModelData) {
      setNewModelData({
        ...newModelData,
        name: value,
      });
    } else {
      setNewModelData({
        bio: "",
        clientId: "",
        contentPrompt: "",
        instagram: null,
        name: value,
        photos: [],
        prices: [],
        sellPrompt: "",
        videos: [],
        whatsApp: null,
        photoUrl: "",
      });
    }
  };

  const HandleChangeModeBio = (value: string) => {
    if (selectedModel) {
      setSelectedModel({
        ...selectedModel,
        bio: value,
      });
    } else if (newModelData) {
      setNewModelData({
        ...newModelData,
        bio: value,
      });
    } else {
      setNewModelData({
        name: "",
        clientId: "",
        contentPrompt: "",
        instagram: null,
        bio: value,
        photos: [],
        prices: [],
        sellPrompt: "",
        videos: [],
        whatsApp: null,
        photoUrl: "",
      });
    }
  };

  const HandleChangeModePrompt = (value: string) => {
    if (selectedModel) {
      setSelectedModel({
        ...selectedModel,
        contentPrompt: value,
      });
    } else if (newModelData) {
      setNewModelData({
        ...newModelData,
        contentPrompt: value,
      });
    } else {
      setNewModelData({
        name: "",
        clientId: "",
        bio: "",
        instagram: null,
        contentPrompt: value,
        photos: [],
        prices: [],
        sellPrompt: "",
        videos: [],
        whatsApp: null,
        photoUrl: "",
      });
    }
  };

  async function HandleUpdateModel(field: "name" | "bio" | "contentPrompt") {
    if (selectedModel) {
      setIsUpdating(field);
      const update = await PutAPI(
        `/model/${selectedModel.id}`,
        {
          [field]: selectedModel[field],
        },
        true,
      );
      if (update.status === 200) {
        toast.success("Atualizado com sucesso!");
        return setIsUpdating(null);
      }
      toast.error(update.body.message);
      return setIsUpdating(null);
    }
  }

  return (
    <GenericCard
      className="h-full min-h-[760px] xl:col-span-3"
      isLoading={isGettingModels}
    >
      <div className="flex w-full flex-col justify-between xl:flex-row xl:items-center">
        <span className="text-lg font-semibold text-zinc-200">
          Biografia e Prompt da Modelo
        </span>
        <button
          disabled
          className="flex h-8 w-full items-center justify-center gap-2 rounded-lg border border-neutral-600 bg-stone-950 px-4 text-neutral-600 xl:w-max xl:justify-normal"
        >
          Solicitar Ajuda
          <ChevronRight />
        </button>
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        <div className="flex w-full flex-col gap-4 xl:col-span-1">
          <div className="flex flex-col gap-4 rounded-md bg-stone-950 p-4">
            <span className="font-semibold">Nome</span>
            <span className="text-neutral-400">Nome da Modelo</span>
            <input
              className="w-full rounded-md bg-stone-900 p-1"
              value={
                selectedModel
                  ? selectedModel.name
                  : newModelData
                    ? newModelData.name
                    : ""
              }
              disabled={isUpdating === "name"}
              onChange={(e) => HandleChangeModelName(e.target.value)}
            />

            <button
              onClick={() => HandleUpdateModel("name")}
              className={cn(
                "ml-auto flex h-8 w-32 items-center justify-center gap-2 rounded-md border border-green-500 px-4 font-semibold",
                !selectedModel && "pointer-events-none opacity-50",
              )}
            >
              {selectedModel
                ? isUpdating === "name"
                  ? "Salvando..."
                  : "Atualizar"
                : !selectedModel && "Inserir"}
            </button>
          </div>
          <div className="flex flex-col gap-4 rounded-md bg-stone-950 p-4">
            <span className="font-semibold">Biografia</span>
            <span className="text-neutral-400">
              Texto que ficará no Perfil da Modelo
            </span>
            <textarea
              className="h-32 w-full resize-none rounded-md bg-stone-900 p-1 xl:h-80"
              value={
                selectedModel
                  ? selectedModel.bio
                  : newModelData
                    ? newModelData.bio
                    : ""
              }
              disabled={isUpdating === "bio"}
              onChange={(e) => HandleChangeModeBio(e.target.value)}
            />
            <button
              onClick={() => HandleUpdateModel("bio")}
              className={cn(
                "ml-auto flex h-8 w-32 items-center justify-center gap-2 rounded-md border border-green-500 px-4 font-semibold",
                !selectedModel && "pointer-events-none opacity-50",
              )}
            >
              {selectedModel
                ? isUpdating === "bio"
                  ? "Salvando..."
                  : "Atualizar"
                : !selectedModel && "Inserir"}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-md bg-stone-950 p-4 xl:col-span-2">
          <span className="font-semibold">Prompt</span>
          <span className="text-neutral-400">
            Certifique-se que o prompt esteja de acordo com o que foi ensinado
            nos vídeos
          </span>
          <textarea
            className="h-80 w-full resize-none rounded-md bg-stone-900 p-1 xl:h-full"
            value={
              selectedModel
                ? selectedModel.contentPrompt
                : newModelData
                  ? newModelData.contentPrompt
                  : ""
            }
            disabled={isUpdating === "contentPrompt"}
            onChange={(e) => HandleChangeModePrompt(e.target.value)}
          />
          <button
            onClick={() => HandleUpdateModel("contentPrompt")}
            className={cn(
              "ml-auto flex h-8 w-32 items-center justify-center gap-2 rounded-md border border-green-500 px-4 font-semibold",
              !selectedModel && "pointer-events-none opacity-50",
            )}
          >
            {selectedModel
              ? isUpdating === "contentPrompt"
                ? "Salvando..."
                : "Atualizar"
              : !selectedModel && "Inserir"}
          </button>
        </div>
      </div>
    </GenericCard>
  );
}
