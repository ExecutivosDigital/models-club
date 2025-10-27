"use client";

import { GenericCard } from "@/components/ui/card";
import { Soon } from "@/components/ui/soon";
import { useApiContext } from "@/context/ApiContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CourseCard } from "./components/course-card";

// Tipo de dados retornado pela API
export interface CourseDetailsProps {
  id: string;
  title: string;
  description: string;
  price: number;
  partnerId?: string | null;
  duration: string;
  lessons: number;
  purchased: boolean;
}

export default function Courses() {
  const { GetAPI } = useApiContext();
  const [courses, setCourses] = useState<CourseDetailsProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await GetAPI("/course", true);

        if (response.status !== 200) {
          toast.error(response.body.message);
          return;
        }

        setCourses(response.body.courses);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
        console.error("Erro ao buscar cursos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [GetAPI]);

  if (loading) {
    return <div className="flex justify-center p-8">Carregando cursos...</div>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <p className="mb-4 text-red-500">Erro: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <GenericCard className="h-80 xl:col-span-3">
        <Soon />
      </GenericCard>
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
