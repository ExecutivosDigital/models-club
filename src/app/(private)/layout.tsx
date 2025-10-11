"use client";
import { DashBoardLayoutProvider } from "@/components/dashboard-layout";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <DashBoardLayoutProvider>
      <div className="mb-6 flex w-full flex-col justify-between gap-2 xl:flex-row xl:items-center xl:gap-0">
        <span className="text-lg font-semibold text-zinc-200">
          {pathname === "/"
            ? "Seja muito bem vindo Gabriel Antônio"
            : pathname === "/models"
              ? "Modelos"
              : ""}
        </span>
        {pathname === "/" ? (
          <button className="flex items-center justify-center gap-2 rounded-lg border border-neutral-600 px-4 py-2 text-neutral-600 xl:justify-normal">
            Solicitar Ajuda
            <ChevronRight />
          </button>
        ) : pathname === "/models" ? (
          <button className="flex items-center justify-center gap-2 rounded-lg border border-neutral-600 px-4 py-2 text-neutral-600 xl:justify-normal">
            RASCUNHOS
            <Image
              src="/icons/save.svg"
              alt=""
              width={100}
              height={100}
              className="h-6 w-max object-contain"
            />
          </button>
        ) : (
          <></>
        )}
      </div>
      <>{children}</>
    </DashBoardLayoutProvider>
  );
}
