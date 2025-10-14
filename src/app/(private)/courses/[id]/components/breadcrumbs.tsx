"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { BreadcrumbsSelector } from "./breadcrumbs-selector";

export function Breadcrumbs() {
  const router = useRouter();

  return (
    <div className="col-span-11 flex h-12 w-full items-center justify-between border-b border-b-stone-800 bg-stone-900 px-4">
      <div className="flex items-center gap-2">
        <ChevronLeft
          className="cursor-pointer transition hover:text-white"
          onClick={() => router.back()}
        />
        <span>Curso Tal</span>
      </div>
      <div className="hidden h-full items-center xl:flex">
        <BreadcrumbsSelector />
      </div>
    </div>
  );
}
