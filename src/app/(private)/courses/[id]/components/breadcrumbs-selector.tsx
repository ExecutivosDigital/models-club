"use client";
import { useCourseContext } from "@/context/CoursesContext";
import { cn } from "@/utils/cn";
import { FilePenLine, Info, PlayCircle } from "lucide-react";

export function BreadcrumbsSelector() {
  const { selectedCourseView, setSelectedCourseView } = useCourseContext();
  return (
    <>
      <div
        onClick={() => setSelectedCourseView("info")}
        className={cn(
          "flex h-full w-24 cursor-pointer items-center justify-center border-b border-b-transparent transition xl:hidden",
          selectedCourseView === "info" && "border-b-primary",
        )}
      >
        <Info />
      </div>
      <div
        onClick={() => setSelectedCourseView("class-list")}
        className={cn(
          "flex h-full w-24 cursor-pointer items-center justify-center border-b border-b-transparent transition",
          selectedCourseView === "class-list" && "border-b-primary",
        )}
      >
        <PlayCircle />
      </div>
      <div
        onClick={() => setSelectedCourseView("transcription")}
        className={cn(
          "flex h-full w-24 cursor-pointer items-center justify-center border-b border-b-transparent transition",
          selectedCourseView === "transcription" && "border-b-primary",
        )}
      >
        <FilePenLine />
      </div>
    </>
  );
}
