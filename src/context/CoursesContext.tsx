/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useApiContext } from "./ApiContext";

// Interface para os detalhes da aula
export interface LessonDetailsProps {
  id: string;
  title: string;
  description: string;
  courseId: string;
  videoUrl: string;
  duration: string;
  order: number;
  watched: boolean;
}

interface CourseContextProps {
  selectedCourseView: "info" | "class-list" | "transcription";
  setSelectedCourseView: React.Dispatch<
    React.SetStateAction<"info" | "class-list" | "transcription">
  >;
  lessons: LessonDetailsProps[];
  loading: boolean;
  error: string | null;
  fetchLessons: () => Promise<void>;
  currentLesson: LessonDetailsProps | null;
  setCurrentLesson: React.Dispatch<
    React.SetStateAction<LessonDetailsProps | null>
  >;
  selectLesson: (lesson: LessonDetailsProps) => void;
  toggleLessonWatched: (lessonId: string, isWatched: boolean) => Promise<void>;
  nextLesson: () => void;
  previousLesson: () => void;
  hasNextLesson: boolean;
  hasPreviousLesson: boolean;
}

const CourseContext = createContext<CourseContextProps | undefined>(undefined);

interface ProviderProps {
  children: React.ReactNode;
}

export const CourseContextProvider = ({ children }: ProviderProps) => {
  const [selectedCourseView, setSelectedCourseView] = useState<
    "info" | "class-list" | "transcription"
  >("class-list");

  const [lessons, setLessons] = useState<LessonDetailsProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentLesson, setCurrentLesson] = useState<LessonDetailsProps | null>(
    null,
  );

  const { GetAPI, PostAPI, DeleteAPI } = useApiContext();
  const params = useParams();

  // Função para buscar as aulas do curso
  const fetchLessons = async () => {
    try {
      setLoading(true);
      setError(null);

      // Obtém o ID do curso dos parâmetros da rota
      const courseId = params.slug as string;

      if (!courseId) {
        setError("ID do curso não encontrado na URL");
        return;
      }

      // Faz a chamada à API para buscar as aulas
      const response = await GetAPI(`/lesson/${courseId}`, true);

      if (response.status !== 200) {
        toast.error(response.body.message || "Erro ao buscar as aulas");
        setError(response.body.message || "Erro ao buscar as aulas");
        return;
      }

      // Atualiza o estado com as aulas retornadas
      const fetchedLessons = response.body.lessons || [];
      setLessons(fetchedLessons);

      const firstWatchedLesson = fetchedLessons.find(
        (lesson: LessonDetailsProps) => lesson.watched,
      );

      setCurrentLesson(firstWatchedLesson || fetchedLessons[0]);

      // Se não houver aula selecionada, seleciona a primeira aula por padrão
      if (fetchedLessons.length > 0 && !currentLesson) {
        setCurrentLesson(fetchedLessons[0]);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Erro ao buscar aulas do curso:", err);
    } finally {
      setLoading(false);
    }
  };

  // Função para marcar/desmarcar uma aula como assistida
  const toggleLessonWatched = async (lessonId: string, isWatched: boolean) => {
    try {
      // Determina qual método usar com base no estado atual
      const response = isWatched
        ? await PostAPI(`/client-lesson/${lessonId}`, { isDone: true }, true)
        : await DeleteAPI(`/client-lesson/${lessonId}`, true);

      if (response.status !== 200 && response.status !== 201) {
        toast.error(
          response.body.message || "Erro ao atualizar o status da aula",
        );
        return;
      }

      // Atualiza o estado local
      setLessons((prevLessons) =>
        prevLessons.map((lesson) =>
          lesson.id === lessonId ? { ...lesson, watched: isWatched } : lesson,
        ),
      );

      // Se a aula atual for a que está sendo atualizada, atualize também o estado currentLesson
      if (currentLesson && currentLesson.id === lessonId) {
        setCurrentLesson({ ...currentLesson, watched: isWatched });
      }

      toast.success(
        isWatched
          ? "Aula marcada como assistida!"
          : "Aula desmarcada como assistida!",
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      toast.error(errorMessage);
      console.error("Erro ao atualizar status da aula:", err);
    }
  };

  // Função para selecionar uma aula
  const selectLesson = (lesson: LessonDetailsProps) => {
    setCurrentLesson(lesson);
  };

  // Função para ir para a próxima aula
  const nextLesson = () => {
    if (!currentLesson) return;

    const currentIndex = lessons.findIndex(
      (lesson) => lesson.id === currentLesson.id,
    );
    if (currentIndex < lessons.length - 1) {
      setCurrentLesson(lessons[currentIndex + 1]);
    }
  };

  // Função para ir para a aula anterior
  const previousLesson = () => {
    if (!currentLesson) return;

    const currentIndex = lessons.findIndex(
      (lesson) => lesson.id === currentLesson.id,
    );
    if (currentIndex > 0) {
      setCurrentLesson(lessons[currentIndex - 1]);
    }
  };

  // Verifica se existe uma próxima aula
  const hasNextLesson = currentLesson
    ? lessons.findIndex((lesson) => lesson.id === currentLesson.id) <
      lessons.length - 1
    : false;

  // Verifica se existe uma aula anterior
  const hasPreviousLesson = currentLesson
    ? lessons.findIndex((lesson) => lesson.id === currentLesson.id) > 0
    : false;

  // Busca as aulas quando o ID do curso mudar
  useEffect(() => {
    if (params.slug) {
      fetchLessons();
    }
  }, [params.slug]);

  return (
    <CourseContext.Provider
      value={{
        selectedCourseView,
        setSelectedCourseView,
        lessons,
        loading,
        error,
        fetchLessons,
        currentLesson,
        setCurrentLesson,
        selectLesson,
        toggleLessonWatched,
        nextLesson,
        previousLesson,
        hasNextLesson,
        hasPreviousLesson,
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
