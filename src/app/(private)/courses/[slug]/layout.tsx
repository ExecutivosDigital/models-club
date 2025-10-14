"use client";

import { CourseContextProvider } from "@/context/CoursesContext";

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CourseContextProvider>
      {/* <Breadcrumbs /> */}
      {children}
    </CourseContextProvider>
  );
}
