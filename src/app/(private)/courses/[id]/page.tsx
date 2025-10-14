import { Breadcrumbs } from "./components/breadcrumbs";
import { BreadcrumbsSelector } from "./components/breadcrumbs-selector";
import { ClassInfo } from "./components/class-info";
import { DesktopSidebar } from "./components/desktop-sidebar";

export default function CourseDetails() {
  return (
    <div className="min-h-[calc(100svh-65px)] w-full bg-stone-900 xl:h-[calc(100svh-119px)] xl:max-h-[calc(100svh-119px)] xl:min-h-auto">
      <Breadcrumbs />
      <div className="grid w-full grid-cols-10 xl:h-[calc(100%-48px)] xl:max-h-[calc(100%-48px)]">
        <div className="custom-scrollbar col-span-10 flex flex-col overflow-y-scroll border-r border-r-stone-800 bg-stone-950 xl:col-span-8">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/uaS75cHC3iU?si=ERiuHqjw-j4ZYWRm"
            title="YouTube video player"
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
