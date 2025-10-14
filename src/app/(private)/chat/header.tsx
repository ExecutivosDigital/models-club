"use client";
import { useChatContext } from "@/context/chatContext";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function ChatHeader() {
  const { modelId, modelProfile } = useChatContext();

  type IconProps = { route: string; className?: string };

  type ButtonProps = {
    route: string;
    className?: string;
    icon: React.ComponentType<IconProps>; // << aceita className
    label: string;
  };
  const pathname = usePathname();

  function GridIcon({ route, className }: IconProps) {
    const isActive = pathname === route;
    return (
      <Image
        src={isActive ? "/gallery-pink.png" : "/galery.png"}
        alt="gallery"
        width={20}
        height={20}
        className={cn("h-5 w-5", className)}
      />
    );
  }
  return (
    <>
      <header className="sticky top-0 z-20 flex w-full flex-col justify-between backdrop-blur-sm xl:flex-row xl:items-center">
        <span className="w-full text-center xl:w-max xl:text-start">
          Converse com a IA e teste as Respostas
        </span>
        <button className="from-primary to-secondary ml-auto flex h-max items-center gap-1 rounded-md bg-gradient-to-br px-2 py-0.5 font-semibold text-white xl:ml-0 xl:w-auto">
          <span className="flex items-center gap-1">
            Alterar
            <span className="hidden xl:block"> Inteligência Artificial</span>
            <span className="xl:hidden"> I.A.</span>
          </span>
        </button>
      </header>
      {/* {selectedChat && openQrCode && (
        <PixSheetSteps
          open={openQrCode}
          onClose={() => setOpenQrCode(false)}
          modelId={selectedChat.model.id}
          modelName={selectedChat?.model.name}
          modelPhoto={selectedChat?.model.photoUrl}
        />
      )} */}
    </>
  );
}
