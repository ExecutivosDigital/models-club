"use client";
import { GenericCard } from "@/components/ui/card";
import { useModelContext } from "@/context/ModelContext";
import { cn } from "@/utils/cn";

export function ModelCard1() {
  const { models } = useModelContext();

  return (
    <GenericCard
      className={cn("xl:col-span-3", models.length === 0 && "hidden")}
    >
      <span className="from-primary to-secondary w-full bg-gradient-to-br bg-clip-text text-center text-xl font-bold text-transparent">
        Crie sua primeira modelo!
      </span>
      <span className="w-full text-center text-sm text-neutral-400">
        Preencha os campos abaixo para começar seu caminho com a Models Club
      </span>
    </GenericCard>
  );
}
