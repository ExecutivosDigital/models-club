import { GenericCard } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export function ModelCard4() {
  return (
    <GenericCard className="h-max xl:col-span-2 xl:h-48">
      <div className="flex w-full flex-col items-center justify-between gap-4 xl:flex-row">
        <div className="flex w-full flex-col gap-2 xl:w-1/2">
          <span className="font-semibold">Precificação</span>
          <span className="text-neutral-400">
            Maximize o potencial das suas postagens e redes sociais com a
            avançada ferramenta de Inteligência Artificial da Inspire AI, que
            oferece insights valiosos
          </span>
          <button className="flex h-8 w-full items-center justify-center gap-2 rounded-lg border border-neutral-600 bg-stone-950 px-4 text-neutral-600 xl:w-max xl:justify-normal">
            Solicitar Ajuda
            <ChevronRight />
          </button>
        </div>
        <div className="flex w-full flex-col gap-2 xl:w-1/2">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className="flex w-full items-center justify-center gap-2 xl:justify-end"
            >
              <div className="flex h-8 w-full max-w-40 items-center gap-2 rounded-md bg-stone-950 px-2 md:max-w-60">
                <Image
                  src="/icons/price.svg"
                  alt=""
                  width={100}
                  height={100}
                  className="h-6 w-max object-contain"
                />
                <span className="text-sm text-neutral-400">
                  R$ _ _ _ _ _ _ _ _
                </span>
              </div>
              <button className="h-8 rounded-md bg-stone-950 px-2 font-semibold">
                SALVAR
              </button>
            </div>
          ))}
        </div>
      </div>
    </GenericCard>
  );
}
