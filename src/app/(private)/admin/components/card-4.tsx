import { GenericCard } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

export function AdminCard4() {
  return (
    <GenericCard className="xl:col-span-2 xl:justify-between">
      <div className="flex w-full flex-col items-end justify-between gap-2 xl:flex-row">
        <button className="h-8 w-full rounded-md bg-stone-950 px-4 font-semibold xl:w-max">
          PRECIFICAÇÃO
        </button>
        <button className="flex h-8 w-full items-center justify-center gap-2 rounded-lg border border-neutral-600 bg-stone-950 px-4 text-neutral-600 xl:w-max xl:justify-normal">
          Solicitar Ajuda
          <ChevronRight />
        </button>
      </div>
      <div className="flex w-full flex-col justify-between gap-4 md:flex-row md:gap-0">
        <span className="w-full text-sm text-neutral-400 md:w-[95%]">
          Maximize o potencial das suas postagens e redes sociais com a avançada
          ferramenta de Inteligência Artificial da Inspire AI, que oferece
          insights valiosos Maximize o potencial das suas postagens e redes
          sociais com a avançada ferramenta de Inteligência Artificial da
          Inspire AI, que oferece insights valiosos
        </span>
        <div className="flex w-full flex-col items-end gap-4">
          <div className="from-primary to-secondary relative h-10 w-full rounded-md bg-gradient-to-br md:max-w-80">
            <div className="absolute top-1/2 left-1/2 z-10 flex h-[90%] w-[99%] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 rounded-md bg-stone-900 px-2">
              <Image
                src="/icons/ticket.png"
                alt=""
                width={100}
                height={100}
                className="h-4 w-max object-contain"
              />
              <span className="text-sm font-bold text-white">
                VISUALIZAR NOTAS FISCAIS
              </span>
            </div>
          </div>
          <div className="from-primary to-secondary relative h-10 w-full rounded-md bg-gradient-to-br md:max-w-80">
            <div className="absolute top-1/2 left-1/2 z-10 flex h-[90%] w-[99%] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 rounded-md bg-stone-900 px-2">
              <Image
                src="/icons/ticket.png"
                alt=""
                width={100}
                height={100}
                className="h-4 w-max object-contain"
              />
              <span className="text-sm font-bold text-white">
                VISUALIZAR ASSINATURA
              </span>
            </div>
          </div>
          <div className="from-primary to-secondary relative h-10 w-full rounded-md bg-gradient-to-br md:max-w-80">
            <div className="absolute top-1/2 left-1/2 z-10 flex h-[90%] w-[99%] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 rounded-md bg-stone-900 px-2">
              <Image
                src="/icons/credit-card-2.png"
                alt=""
                width={100}
                height={100}
                className="h-4 w-max object-contain"
              />
              <span className="text-sm font-bold text-white">
                MÉTODO DE PAGAMENTO
              </span>
            </div>
          </div>
        </div>
      </div>
    </GenericCard>
  );
}
