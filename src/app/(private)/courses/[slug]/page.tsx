"use client";
import { useCourseContext } from "@/context/CoursesContext";
import { convertToEmbedUrl } from "@/utils/functions";
import { Breadcrumbs } from "./components/breadcrumbs";
import { BreadcrumbsSelector } from "./components/breadcrumbs-selector";
import { ClassInfo } from "./components/class-info";
import { DesktopSidebar } from "./components/desktop-sidebar";

export default function CourseDetails() {
  const { currentLesson } = useCourseContext();

  if (!currentLesson) {
    return (
      <div className="flex min-h-[calc(100svh-65px)] w-full items-center justify-center bg-stone-900">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">
            Nenhuma aula selecionada
          </h2>
          <p className="text-neutral-400">
            Por favor, selecione uma aula na lista para começar a assistir.
          </p>
        </div>
      </div>
    );
  }

  const embedUrl = convertToEmbedUrl(currentLesson.videoUrl);

  return (
    <div className="min-h-[calc(100svh-65px)] w-full bg-stone-900 xl:h-[calc(100svh-119px)] xl:max-h-[calc(100svh-119px)] xl:min-h-auto">
      <Breadcrumbs />
      <div className="grid w-full grid-cols-10 xl:h-[calc(100%-48px)] xl:max-h-[calc(100%-48px)]">
        <div className="custom-scrollbar col-span-10 flex flex-col overflow-y-scroll border-r border-r-stone-800 bg-stone-950 xl:col-span-8">
          <iframe
            width="100%"
            height="100%"
            src={embedUrl}
            title={currentLesson.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="mx-auto aspect-video h-full w-full rounded-md xl:h-4/5 xl:w-max"
          ></iframe>

          <div className="hidden w-full flex-col gap-4 bg-stone-900 p-4 xl:flex xl:flex-row">
            <ClassInfo />
          </div>
        </div>
        <div className="col-span-10 flex h-12 w-full justify-center gap-4 bg-stone-900 xl:hidden">
          <BreadcrumbsSelector />
        </div>

        <div className="custom-scrollbar col-span-10 flex h-full flex-col gap-4 overflow-y-scroll bg-stone-900 p-4 xl:col-span-2">
          <DesktopSidebar />
        </div>
      </div>
    </div>
  );
}
