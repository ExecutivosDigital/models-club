"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/blocks/dropdown-menu";
import { GenericCard } from "@/components/ui/card";
import { useModelContext } from "@/context/ModelContext";
import { cn } from "@/utils/cn";
import { copyToClipboard } from "@/utils/copy-to-clipboard";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ChevronsUpDown } from "lucide-react";
import { useCookies } from "next-client-cookies";
import toast from "react-hot-toast";

export function HomeCard4() {
  const { selectedModel, setSelectedModel, models, isGettingModels } =
    useModelContext();
  const cookies = useCookies();

  return (
    <GenericCard
      className="relative h-48 bg-[url('/static/generic-model-1.png')] bg-cover bg-center bg-no-repeat xl:col-span-1"
      isLoading={isGettingModels}
    >
      <div
        className={cn(
          "from-primary to-secondary absolute top-0 left-0 h-full w-full bg-gradient-to-br opacity-80",
          isGettingModels ? "-z-10" : "z-10 delay-500",
        )}
      />
      <div
        className={cn(
          "flex flex-1 flex-col justify-between gap-2",
          isGettingModels ? "-z-10" : "z-20 delay-500",
        )}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center justify-center gap-2 rounded-lg border border-white px-4 py-2 text-white xl:w-60 xl:justify-between">
              {selectedModel?.name || "Alterar Modelo"}
              <ChevronsUpDown />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
            {models.map((model) => (
              <DropdownMenuItem
                key={model.id}
                onSelect={() => {
                  setSelectedModel(model);
                  cookies.set("selectedModel", model.id as string);
                }}
                className="w-full text-base font-medium"
              >
                {model.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex w-full flex-col rounded-md bg-white/10 p-1 backdrop-blur-sm">
          <span>Link do seu Chat:</span>
          <span className="truncate text-sm font-bold text-neutral-300">
            <button
              onClick={() => {
                if (selectedModel) {
                  copyToClipboard(`https://spicyai.com.br/${selectedModel.id}`);
                  toast.success("Link copiado com sucesso!");
                }
              }}
            >
              {selectedModel
                ? `https://spiceai.com.br/${selectedModel.id}`
                : "Selecione uma modelo"}
            </button>
          </span>
        </div>
        <div className="flex w-full flex-col rounded-md bg-white/10 p-1 backdrop-blur-sm">
          <span>Acesso ao Banco de Dados:</span>
          <span className="w-full truncate text-justify text-sm text-neutral-300 italic">
            Em breve
          </span>
        </div>
      </div>
    </GenericCard>
  );
}
