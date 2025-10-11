import { GenericCard } from "@/components/ui/card";
import Image from "next/image";

export function ModelCard2() {
  return (
    <GenericCard className="h-max xl:col-span-1">
      <div className="flex gap-2">
        <div className="flex flex-1 flex-col gap-2">
          <span className="font-semibold">Inserir @ Instagram</span>
          <span className="text-neutral-400">
            Maximize o potencial das suas postagens e redes sociais com a
            avançada ferramenta de Inteligência Artificial da Inspire AI, que
            oferece insights valiosos
          </span>
        </div>
        <Image
          src="/logos/instagram.png"
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
            placeholder="@da_sua_modelo_aqui"
          />
        </label>
        <button className="h-8 rounded-md bg-stone-950 px-4 font-semibold">
          SALVAR
        </button>
      </div>
    </GenericCard>
  );
}
