import { GenericCard } from "@/components/ui/card";
import { Soon } from "@/components/ui/soon";
import { PlusCircle } from "lucide-react";
import Image from "next/image";

export function AdminCard2() {
  return (
    <GenericCard className="xl:col-span-1 xl:justify-between">
      <Soon />
      <span className="font-semibold">Suas Modelos</span>
      <div className="flex items-center gap-2">
        <label className="flex h-8 w-full items-center gap-2 rounded-md border border-transparent bg-stone-950 px-2 focus-within:border-neutral-500">
          <Image
            src="/icons/key.svg"
            alt=""
            width={100}
            height={100}
            className="h-4 w-max border-none object-contain"
          />
          <input
            className="text-sm text-neutral-400 focus:outline-none"
            placeholder="Gabriela"
          />
        </label>
        <button className="h-8 rounded-md bg-stone-950 px-2 font-semibold">
          SALVAR
        </button>
      </div>
      <button className="from-primary to-secondary flex h-16 w-full items-center justify-center gap-2 rounded-md bg-gradient-to-br text-lg font-bold text-white">
        <PlusCircle />
        CRIAR MAIS MODELOS
      </button>
    </GenericCard>
  );
}
