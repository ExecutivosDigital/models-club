import { useCourseContext } from "@/context/CoursesContext";
import { Check } from "lucide-react";

export function ClassInfo() {
  const { currentLesson, toggleLessonWatched } = useCourseContext();

  // Se não houver aula selecionada, exibe uma mensagem
  if (!currentLesson) {
    return (
      <div className="flex flex-1 flex-col gap-4">
        <span className="text-lg font-bold">Nenhuma aula selecionada</span>
        <span className="text-sm text-neutral-400">
          Por favor, selecione uma aula na lista para visualizar os detalhes.
        </span>
      </div>
    );
  }

  const handleToggleWatched = () => {
    toggleLessonWatched(currentLesson.id, !currentLesson.watched);
  };

  return (
    <>
      <div className="flex flex-1 flex-col gap-4">
        <span className="text-lg font-bold">{currentLesson.title}</span>
        <div className="flex gap-2">
          <div className="h-10 w-10 rounded-full bg-stone-800" />
          <div className="flex flex-col">
            <span>Nome do professor</span>
            <span>{currentLesson.duration}</span>
          </div>
        </div>
        <span className="text-primary font-bold">
          {currentLesson.description}
        </span>
        <span className="w-full max-w-[700px] text-sm text-neutral-400">
          {currentLesson.description}
        </span>
      </div>
      <div className="flex w-72 flex-col gap-4">
        <div
          className={`flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-md border ${
            currentLesson.watched
              ? "border-green-500 bg-green-500/10"
              : "border-neutral-500"
          }`}
          onClick={handleToggleWatched}
        >
          <Check
            className={
              currentLesson.watched ? "text-green-500" : "text-neutral-500"
            }
          />
          <span className="font-semibold">
            {currentLesson.watched ? "Aula Assistida" : "Marcar como Assistida"}
          </span>
        </div>
      </div>
    </>
  );
}
