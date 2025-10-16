"use client";
import { GenericCard } from "@/components/ui/card";
import { useModelContext } from "@/context/ModelContext";
import { cn } from "@/utils/cn";
import Image from "next/image";

export function ModelCard6() {
  const { newModelData, selectedModel, isGettingModels } = useModelContext();

  return (
    <GenericCard
      className={cn(
        "h-max xl:col-span-1 xl:h-48",
        !isGettingModels && "from-primary to-secondary h-max bg-gradient-to-br",
      )}
      isLoading={isGettingModels}
    >
      <Image
        src={
          selectedModel
            ? selectedModel.photoUrl
            : newModelData && newModelData.photoUrl !== ""
              ? newModelData.photoUrl
              : "/static/generic-model-1.png"
        }
        alt=""
        width={1500}
        height={500}
        className="h-full w-full rounded-md object-cover"
      />
    </GenericCard>
  );
}
