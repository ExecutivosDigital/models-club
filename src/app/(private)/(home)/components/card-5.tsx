"use client";

import { GenericCard } from "@/components/ui/card";
import { useModelContext } from "@/context/ModelContext";
import { ChevronRight } from "lucide-react";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function HomeCard5() {
  const { setSelectedModel, isGettingModels } = useModelContext();
  const cookies = useCookies();
  const router = useRouter();

  return (
    <GenericCard
      className="h-max justify-between xl:col-span-2 xl:h-48"
      isLoading={isGettingModels}
    >
      <div className="flex justify-between gap-2">
        <div className="flex flex-1 flex-col gap-2 xl:w-2/3 xl:flex-none">
          <span className="font-semibold">Criação de Modelo Digital</span>
          <span className="text-neutral-400">
            Vamos para a criação? Além de super simples você também pode contar
            com nossa equipe para criação de suas modelos, é necessário que
            tenha os perfis da IAs já criadas.
          </span>
        </div>
        <Image
          src="/logos/icon.png"
          alt=""
          width={500}
          height={500}
          className="h-10 min-h-10 w-10 min-w-10 object-contain"
        />
      </div>
      <div className="flex w-full flex-1 flex-col items-end justify-between gap-2 xl:flex-row">
        <button
          onClick={() => {
            router.push("/models");
            setSelectedModel(null);
            cookies.remove("selectedModel");
          }}
          className="from-primary to-secondary h-8 w-full rounded-md bg-gradient-to-br px-4 font-bold shadow-sm xl:w-max"
        >
          INICIAR CRIAÇÃO
        </button>
        <button className="flex h-8 w-full items-center justify-center gap-2 rounded-lg border border-neutral-600 bg-stone-950 px-4 text-neutral-600 xl:w-max xl:justify-normal">
          Solicitar Ajuda
          <ChevronRight />
        </button>
      </div>
    </GenericCard>
  );
}
