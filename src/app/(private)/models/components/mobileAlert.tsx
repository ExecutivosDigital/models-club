// components/MobileSoon.tsx
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/blocks/dropdown-menu";
import { useModelContext } from "@/context/ModelContext";
import { useIsMobile } from "@/hooks/useIsMobile";
import { cn } from "@/utils/cn";
import { ChevronDown } from "lucide-react";
import { useCookies } from "next-client-cookies";
import Image from "next/image";

export function MobileSoon() {
  const cookies = useCookies();
  const isMobile = useIsMobile();
  const { selectedModel, setSelectedModel, models } = useModelContext();

  if (!isMobile || (isMobile && selectedModel)) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 z-10 h-full w-full bg-black/60" />
      <div className="fixed inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-black/40 backdrop-blur-md">
        <Image
          src="/logos/logo.png"
          alt=""
          width={500}
          height={250}
          className="h-max w-2/3 max-w-96 object-contain"
        />
        <span className="px-4 text-center text-xl font-bold">
          Utilize um computador para criar modelos
        </span>

        <div className="mt-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="from-primary to-secondary flex items-center justify-center gap-2 rounded-md bg-gradient-to-br px-4 py-2 font-semibold text-white focus:outline-none xl:w-60 xl:justify-normal">
                <span className="truncate">
                  {selectedModel ? selectedModel.name : "Selecionar Modelo"}
                </span>
                <ChevronDown className="ml-auto stroke-3" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="z-50 w-[var(--radix-dropdown-menu-trigger-width)]"
              side="bottom"
              align="center"
              sideOffset={5}
            >
              {models.map((model) => (
                <DropdownMenuItem
                  key={model.id}
                  className={cn(
                    model.id === selectedModel?.id
                      ? "from-primary to-secondary bg-gradient-to-br"
                      : "hover:bg-primary/20",
                  )}
                  onSelect={() => {
                    setSelectedModel(model);
                    cookies.set("selectedModel", model.id as string);
                  }}
                >
                  {model.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}
