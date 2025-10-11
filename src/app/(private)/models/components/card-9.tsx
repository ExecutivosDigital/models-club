import { GenericCard } from "@/components/ui/card";
import { Check } from "lucide-react";
import Image from "next/image";

export function ModelCard9() {
  return (
    <GenericCard className="h-max xl:col-span-3">
      <div className="flex w-full flex-col items-center justify-between gap-2 xl:flex-row xl:gap-0">
        <span className="text-lg font-semibold text-zinc-200">
          Tudo pronto? Só salvar e avançar
        </span>
        <div className="flex items-center gap-4">
          <button className="flex h-8 items-center justify-center gap-2 rounded-lg border border-neutral-600 bg-stone-950 px-4 text-neutral-600 xl:justify-normal">
            RASCUNHO
            <Image
              src="/icons/save.svg"
              alt=""
              width={100}
              height={100}
              className="h-4 w-full object-contain"
            />
          </button>
          <button className="flex h-8 w-max items-center gap-2 rounded-md border border-green-500 bg-stone-950 px-4 font-semibold">
            SALVAR
            <Check />
          </button>
        </div>
      </div>
    </GenericCard>
  );
}
