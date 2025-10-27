import { GenericCard } from "@/components/ui/card";
import { Soon } from "@/components/ui/soon";
import Image from "next/image";

export function AdminCard1() {
  return (
    <GenericCard className="xl:col-span-2 xl:justify-between">
      <Soon />
      <span className="font-semibold">Dados de Cadastro</span>
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full flex-col items-center justify-center gap-2 md:flex-row">
          <div className="flex items-center gap-2">
            <label className="flex h-8 w-full max-w-40 items-center gap-2 rounded-md border border-transparent bg-stone-950 px-2 focus-within:border-neutral-500 md:max-w-60">
              <Image
                src="/icons/credit-card.svg"
                alt=""
                width={100}
                height={100}
                className="h-4 w-max border-none object-contain"
              />
              <input
                className="text-sm text-neutral-400 focus:outline-none"
                placeholder="Nome"
              />
            </label>
            <button className="h-8 rounded-md bg-stone-950 px-2 font-semibold">
              SALVAR
            </button>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex h-8 w-full max-w-40 items-center gap-2 rounded-md border border-transparent bg-stone-950 px-2 focus-within:border-neutral-500 md:max-w-60">
              <Image
                src="/icons/credit-card.svg"
                alt=""
                width={100}
                height={100}
                className="h-4 w-max border-none object-contain"
              />
              <input
                className="text-sm text-neutral-400 focus:outline-none"
                placeholder="Telefone"
              />
            </label>
            <button className="h-8 rounded-md bg-stone-950 px-2 font-semibold">
              SALVAR
            </button>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-2 md:flex-row">
          <div className="flex items-center gap-2">
            <label className="flex h-8 w-full max-w-40 items-center gap-2 rounded-md border border-transparent bg-stone-950 px-2 focus-within:border-neutral-500 md:max-w-60">
              <Image
                src="/icons/credit-card.svg"
                alt=""
                width={100}
                height={100}
                className="h-4 w-max border-none object-contain"
              />
              <input
                className="text-sm text-neutral-400 focus:outline-none"
                placeholder="Email"
              />
            </label>
            <button className="h-8 rounded-md bg-stone-950 px-2 font-semibold">
              SALVAR
            </button>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex h-8 w-full max-w-40 items-center gap-2 rounded-md border border-transparent bg-stone-950 px-2 focus-within:border-neutral-500 md:max-w-60">
              <Image
                src="/icons/credit-card.svg"
                alt=""
                width={100}
                height={100}
                className="h-4 w-max border-none object-contain"
              />
              <input
                className="text-sm text-neutral-400 focus:outline-none"
                placeholder="CEP"
              />
            </label>
            <button className="h-8 rounded-md bg-stone-950 px-2 font-semibold">
              SALVAR
            </button>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-2 md:flex-row">
          <div className="flex items-center gap-2">
            <label className="flex h-8 w-full max-w-40 items-center gap-2 rounded-md border border-transparent bg-stone-950 px-2 focus-within:border-neutral-500 md:max-w-60">
              <Image
                src="/icons/credit-card.svg"
                alt=""
                width={100}
                height={100}
                className="h-4 w-max border-none object-contain"
              />
              <input
                className="text-sm text-neutral-400 focus:outline-none"
                placeholder="CPF ou CNPJ"
              />
            </label>
            <button className="h-8 rounded-md bg-stone-950 px-2 font-semibold">
              SALVAR
            </button>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex h-8 w-full max-w-40 items-center gap-2 rounded-md border border-transparent bg-stone-950 px-2 focus-within:border-neutral-500 md:max-w-60">
              <Image
                src="/icons/credit-card.svg"
                alt=""
                width={100}
                height={100}
                className="h-4 w-max border-none object-contain"
              />
              <input
                className="text-sm text-neutral-400 focus:outline-none"
                placeholder="Alterar Senha"
              />
            </label>
            <button className="h-8 rounded-md bg-stone-950 px-2 font-semibold">
              SALVAR
            </button>
          </div>
        </div>
      </div>
    </GenericCard>
  );
}
