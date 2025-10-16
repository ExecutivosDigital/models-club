"use client";
import { GenericCard } from "@/components/ui/card";
import { useApiContext } from "@/context/ApiContext";
import { useModelContext } from "@/context/ModelContext";
import { cn } from "@/utils/cn";
import { maskPhone } from "@/utils/masks";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

export function ModelCard4() {
  const { PutAPI } = useApiContext();
  const {
    selectedModel,
    setSelectedModel,
    newModelData,
    setNewModelData,
    isGettingModels,
  } = useModelContext();
  const [isUpdating, setIsUpdating] = useState(false);

  async function UpdateSelectedModelWhatsApp() {
    setIsUpdating(true);
    if (selectedModel) {
      const update = await PutAPI(
        `/model/${selectedModel.id}`,
        {
          whatsApp: selectedModel.whatsApp,
        },
        true,
      );
      if (update.status === 200) {
        toast.success("WhatsApp atualizado com sucesso!");
        return setIsUpdating(false);
      }
      toast.error(update.body.message);
      return setIsUpdating(false);
    }
  }

  const handleChangeModelWhatsApp = (value: string) => {
    if (selectedModel) {
      setSelectedModel({
        ...selectedModel,
        whatsApp: value,
      });
    } else if (newModelData) {
      setNewModelData({
        ...newModelData,
        whatsApp: value,
      });
    } else {
      setNewModelData({
        bio: "",
        clientId: "",
        contentPrompt: "",
        whatsApp: value,
        name: "",
        photos: [],
        prices: [],
        sellPrompt: "",
        videos: [],
        instagram: null,
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
          <span className="font-semibold">Inserir WhatsApp</span>
          <span className="text-neutral-400">
            Maximize o potencial das suas postagens e redes sociais com a
            avançada ferramenta de Inteligência Artificial da Inspire AI, que
            oferece insights valiosos
          </span>
        </div>
        <Image
          src="/logos/whatsapp.png"
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
            placeholder="(41) 9 9900-0099"
            maxLength={15}
            value={
              selectedModel && selectedModel.whatsApp !== null
                ? (selectedModel.whatsApp as string)
                : newModelData && newModelData.whatsApp !== null
                  ? (newModelData.whatsApp as string)
                  : ""
            }
            disabled={isUpdating}
            onChange={(e) =>
              handleChangeModelWhatsApp(maskPhone(e.target.value))
            }
          />
        </label>
        <button
          onClick={() => UpdateSelectedModelWhatsApp()}
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
