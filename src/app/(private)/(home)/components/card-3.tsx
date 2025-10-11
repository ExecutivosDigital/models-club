import { GenericCard } from "@/components/ui/card";
import Image from "next/image";

export function HomeCard3() {
  return (
    <GenericCard className="h-max xl:col-span-1 xl:h-full xl:justify-between">
      <div className="flex gap-2">
        <div className="flex flex-1 flex-col gap-2">
          <span className="font-semibold">Inserir Chave IA</span>
          <span className="text-neutral-400">
            Utilize o melhor das Inteligências Artificiais, com o Open Router
            você pode usar IAs sem censura sem preços abusivos.
          </span>
        </div>
        <Image
          src="/logos/open-router.png"
          alt=""
          width={500}
          height={500}
          className="h-10 min-h-10 w-10 min-w-10 rounded object-contain"
        />
      </div>
      <div className="flex w-full items-center gap-2">
        <label className="relative flex h-8 w-full items-center gap-1 rounded-md bg-stone-950 px-2">
          <Image
            src="/icons/key.svg"
            alt=""
            width={100}
            height={100}
            className="h-max w-4 rounded object-contain"
          />
          <input
            className="absolute top-0 left-0 h-full w-full px-8"
            placeholder="Sua API KEY aqui"
          />
        </label>
        <button className="h-8 rounded-md bg-stone-950 px-4 font-semibold">
          SALVAR
        </button>
      </div>
    </GenericCard>
  );
}
