"use client";

import { useCourseContext } from "@/context/CoursesContext";
import { ClassInfo } from "./class-info";
import { ClassList } from "./class-list";
import { ClassTranscription } from "./class-transcription";

export function DesktopSidebar() {
  const { selectedCourseView } = useCourseContext();
  return (
    <>
      {selectedCourseView === "info" ? (
        <ClassInfo />
      ) : selectedCourseView === "class-list" ? (
        <ClassList />
      ) : selectedCourseView === "transcription" ? (
        <ClassTranscription />
      ) : (
        <></>
      )}
    </>
  );
}
