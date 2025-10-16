"use client";
import { useModelContext } from "@/context/ModelContext";
import { useUserProfileContext } from "@/context/UserProfileContext";
import { cn } from "@/utils/cn";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./blocks/dropdown-menu";

export function PrivateHeader() {
  const { userProfile } = useUserProfileContext();
  const { models, selectedModel, setSelectedModel } = useModelContext();
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "mb-6 flex w-full flex-col justify-between gap-2 xl:flex-row xl:items-center xl:gap-0",
        pathname.includes("/courses/") && "m-0",
      )}
    >
      <span className="text-lg font-semibold text-zinc-200">
        {pathname === "/"
          ? `Seja muito bem vindo ${userProfile.name}`
          : pathname === "/courses"
            ? "Cursos"
            : pathname === "/models"
              ? "Modelos"
              : pathname === "/admin"
                ? "Administrativo"
                : pathname === "/chat"
                  ? "Chat"
                  : ""}
      </span>
      {pathname === "/" ? (
        <button className="flex items-center justify-center gap-2 rounded-lg border border-neutral-600 px-4 py-2 text-neutral-600 xl:justify-normal">
          Solicitar Ajuda
          <ChevronRight />
        </button>
      ) : pathname === "/courses" ? (
        <></>
      ) : pathname === "/models" ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center justify-center gap-2 rounded-lg border border-neutral-600 px-4 py-2 text-neutral-600 xl:w-60 xl:justify-normal">
              <span className="truncate">
                {selectedModel ? selectedModel.name : "Criar Modelo"}
              </span>
              <Image
                src="/icons/save.svg"
                alt=""
                width={100}
                height={100}
                className="h-6 w-min object-contain xl:ml-auto"
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => setSelectedModel(null)}>
              Criar Modelo
            </DropdownMenuItem>
            {models.map((model) => (
              <DropdownMenuItem
                key={model.id}
                onSelect={() => setSelectedModel(model)}
              >
                {model.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : pathname === "/admin" ? (
        <button className="flex items-center justify-center gap-2 rounded-lg border border-neutral-600 px-4 py-2 text-neutral-600 xl:justify-normal">
          Solicitar Ajuda
          <ChevronRight />
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
