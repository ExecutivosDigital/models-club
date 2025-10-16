/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { GenericCard } from "@/components/ui/card";
import { useApiContext } from "@/context/ApiContext";
import { useModelContext } from "@/context/ModelContext";
import { cn } from "@/utils/cn";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export function ModelCard10() {
  const { PostAPI } = useApiContext();
  const { selectedModel, newModelData } = useModelContext();
  const [isCreating, setIsCreating] = useState(false);

  async function CreateModel() {
    setIsCreating(true);
    const create = await PostAPI("/model", newModelData, true);
    if (create.status === 200) {
      toast.success("Modelo criada com sucesso!");
      await CreateModelPricing(create.body.modelId);
      await CreateModelMedia(create.body.modelId);
      return setIsCreating(false);
    }
    toast.error(create.body.message);
    return setIsCreating(false);
  }

  async function CreateModelPricing(id: string) {
    if (!newModelData) return;
    await Promise.all(
      newModelData.prices.map(async (pricing: any) => {
        const createPricing = await PostAPI(
          "/model-price",
          {
            ...pricing,
            modelId: id,
          },
          true,
        );

        return createPricing;
      }),
    );
  }

  async function CreateModelMedia(id: string) {
    if (!newModelData) return;
    await Promise.all(
      newModelData.videos.map(async (media: any) => {
        const createMedia = await PostAPI(
          "/video",
          {
            ...media,
            modelId: id,
          },
          true,
        );
        return createMedia;
      }),
    );
    await Promise.all(
      newModelData.photos.map(async (media: any) => {
        const createMedia = await PostAPI(
          "/photo",
          {
            ...media,
            modelId: id,
          },
          true,
        );
        return createMedia;
      }),
    );
  }

  return (
    <GenericCard
      className={cn("h-max xl:col-span-3", selectedModel && "hidden")}
    >
      <div className="flex w-full flex-col items-center justify-between gap-2 xl:flex-row xl:gap-0">
        <span className="text-lg font-semibold text-zinc-200">
          Tudo pronto? Só salvar e avançar
        </span>
        <button
          onClick={CreateModel}
          disabled={isCreating}
          className="flex h-8 w-max items-center gap-2 rounded-md border border-green-500 bg-stone-950 px-4 font-semibold"
        >
          {isCreating ? (
            <>
              <span>Criando...</span>
              <Loader2 className="animate-spin" />
            </>
          ) : (
            <>
              <span>SALVAR</span>
              <Check />
            </>
          )}
        </button>
      </div>
    </GenericCard>
  );
}
