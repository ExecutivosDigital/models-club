import { GenericCard } from "@/components/ui/card";
import { Check, ChevronRight } from "lucide-react";

export function ModelCard8() {
  return (
    <GenericCard className="xl:col-span-3">
      <div className="flex w-full flex-col justify-between xl:flex-row xl:items-center">
        <span className="text-lg font-semibold text-zinc-200">
          Biografia e Prompt da Modelo
        </span>
        <button className="flex h-8 w-full items-center justify-center gap-2 rounded-lg border border-neutral-600 bg-stone-950 px-4 text-neutral-600 xl:w-max xl:justify-normal">
          Solicitar Ajuda
          <ChevronRight />
        </button>
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        <div className="flex flex-col gap-4 rounded-md bg-stone-950 p-4 xl:col-span-1">
          <span className="font-semibold">Biografia</span>
          <span className="text-neutral-400">
            Texto que ficará no Perfil da Modelo
          </span>
          <textarea className="h-32 w-full resize-none rounded-md bg-stone-900 p-1 xl:h-80" />
          <button className="ml-auto flex h-8 w-max items-center gap-2 rounded-md border border-green-500 px-4 font-semibold">
            SALVAR
            <Check />
          </button>
        </div>
        <div className="flex flex-col gap-4 rounded-md bg-stone-950 p-4 xl:col-span-2">
          <span className="font-semibold">Prompt</span>
          <span className="text-neutral-400">
            Certifique-se que o prompt esteja de acordo com o que foi ensinado
            nos vídeos
          </span>
          <textarea className="h-80 w-full resize-none rounded-md bg-stone-900 p-1" />
          <button className="ml-auto flex h-8 w-max items-center gap-2 rounded-md border border-green-500 px-4 font-semibold">
            SALVAR
            <Check />
          </button>
        </div>
      </div>
    </GenericCard>
  );
}
