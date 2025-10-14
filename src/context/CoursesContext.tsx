/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { createContext, useContext, useState } from "react";

interface CourseContextProps {
  selectedCourseView: "info" | "class-list" | "transcription";
  setSelectedCourseView: React.Dispatch<
    React.SetStateAction<"info" | "class-list" | "transcription">
  >;
}

const CourseContext = createContext<CourseContextProps | undefined>(undefined);

interface ProviderProps {
  children: React.ReactNode;
}

export const CourseContextProvider = ({ children }: ProviderProps) => {
  const [selectedCourseView, setSelectedCourseView] = useState<
    "info" | "class-list" | "transcription"
  >("class-list");

  return (
    <CourseContext.Provider
      value={{
        selectedCourseView,
        setSelectedCourseView,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export function useCourseContext() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error(
      "useCourseContext deve ser usado dentro de um CourseContextProvider",
    );
  }
  return context;
}
