import { GenericCard } from "@/components/ui/card";
import { ChevronsUpDown } from "lucide-react";

export function HomeCard4() {
  return (
    <GenericCard className="relative h-48 bg-[url('/static/generic-model-1.png')] bg-cover bg-center bg-no-repeat xl:col-span-1">
      <div className="from-primary to-secondary absolute top-0 left-0 z-10 h-full w-full bg-gradient-to-br opacity-80" />
      <div className="z-20 flex flex-1 flex-col justify-between gap-2">
        <button className="flex h-8 w-max items-center gap-2 rounded-md border border-white px-2 text-white">
          Alterar Modelo
          <ChevronsUpDown />
        </button>
        <div className="flex w-full flex-col rounded-md bg-white/10 p-1 backdrop-blur-sm">
          <span>Link do seu Chat:</span>
          <span className="text-sm text-neutral-300">
            (Ainda não concluído)
          </span>
        </div>
        <div className="flex w-full flex-col rounded-md bg-white/10 p-1 backdrop-blur-sm">
          <span>Acesso ao Banco de Dados:</span>
          <span className="w-full truncate text-justify text-sm text-neutral-300">
            https://str-oriental-integration-object.trycloudflare.com/signature/validation/phone/c6c525c3-dbce-44e6-88cf-d800df3ce991
          </span>
        </div>
      </div>
    </GenericCard>
  );
}
