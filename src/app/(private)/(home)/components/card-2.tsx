import { GenericCard } from "@/components/ui/card";
import Image from "next/image";

export function HomeCard2() {
  return (
    <GenericCard className="h-max xl:col-span-1 xl:h-40">
      <div className="flex gap-2">
        <div className="flex flex-1 flex-col gap-2">
          <span className="font-semibold">Inserir Chave Bancária</span>
          <span className="text-neutral-400">
            Use a Wallet ID do Asaas para recebimento direto na sua conta
            bancária sem constar o nome da conta de recebimento.
          </span>
        </div>
        <Image
          src="/logos/asaas.png"
          alt=""
          width={500}
          height={500}
          className="h-10 min-h-10 w-10 min-w-10 rounded object-contain"
        />
      </div>
      <div className="flex w-full flex-1 items-center gap-2">
        <label className="relative flex h-8 w-full items-center gap-1 rounded-md bg-stone-950 px-2">
          <Image
            src="/icons/credit-card.svg"
            alt=""
            width={100}
            height={100}
            className="h-max w-4 rounded object-contain"
          />
          <input
            className="absolute top-0 left-0 h-full w-full px-8 focus:outline-none"
            placeholder="Sua Wallet ID aqui"
          />
        </label>
        <button className="h-8 rounded-md bg-stone-950 px-4 font-semibold">
          SALVAR
        </button>
      </div>
    </GenericCard>
  );
}
