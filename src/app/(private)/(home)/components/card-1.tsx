"use client";

import { GenericCard } from "@/components/ui/card";
import { useModelContext } from "@/context/ModelContext";
import Image from "next/image";

export function HomeCard1() {
  const { selectedModel } = useModelContext();

  return (
    <GenericCard className="from-primary to-secondary max-h-44 bg-gradient-to-br xl:col-span-1">
      <Image
        src={
          selectedModel ? selectedModel.photoUrl : "/static/generic-model-1.png"
        }
        alt=""
        width={1500}
        height={500}
        className="h-full w-full rounded-md object-cover"
      />
    </GenericCard>
  );
}
