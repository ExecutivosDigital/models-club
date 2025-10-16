"use client";
import { useModelContext } from "@/context/ModelContext";
import { useUserProfileContext } from "@/context/UserProfileContext";
import { cn } from "@/utils/cn";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useCookies } from "next-client-cookies";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./blocks/dropdown-menu";

export function PrivateHeader() {
  const { models, selectedModel, setSelectedModel } = useModelContext();
  const { userProfile } = useUserProfileContext();
  const pathname = usePathname();
  const cookies = useCookies();

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
            <button className="from-primary to-secondary flex items-center justify-center gap-2 rounded-md bg-gradient-to-br px-4 py-2 font-semibold text-white focus:outline-none xl:w-60 xl:justify-normal">
              <span className="truncate">
                {selectedModel ? selectedModel.name : "Criar Modelo"}
              </span>
              <ChevronDown className="ml-auto stroke-3" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
            <DropdownMenuItem
              className={cn(
                !selectedModel
                  ? "from-primary to-secondary bg-gradient-to-br"
                  : "hover:bg-primary/20",
              )}
              onSelect={() => {
                setSelectedModel(null);
                cookies.remove("selectedModel");
              }}
            >
              Criar Modelo
            </DropdownMenuItem>
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
