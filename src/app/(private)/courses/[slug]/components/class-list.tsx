import { useCourseContext } from "@/context/CoursesContext";
import { Check } from "lucide-react";

export function ClassList() {
  const { lessons, currentLesson, selectLesson, toggleLessonWatched } =
    useCourseContext();

  return (
    <>
      <span className="text-lg font-bold">Aulas</span>
      {lessons.map((lesson) => (
        <div
          key={lesson.id}
          className={`flex w-full cursor-pointer items-center gap-2 rounded-md border p-2 transition-colors ${
            currentLesson?.id === lesson.id
              ? "border-primary bg-primary/10"
              : lesson.watched
                ? "border-green-500/50 bg-green-500/10"
                : "border-neutral-500"
          }`}
          onClick={() => selectLesson(lesson)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-950">
            {lesson.order}
          </div>
          <div className="flex flex-1 flex-col">
            <span className="font-semibold">{lesson.title}</span>
            <span className="text-sm text-neutral-500">{lesson.duration}</span>
          </div>

          {/* Botão para marcar/desmarcar como assistida */}
          <button
            className="rounded-full p-1 transition-colors hover:bg-neutral-700"
            onClick={(e) => {
              e.stopPropagation(); // Impede que o clique se propague para o div principal
              toggleLessonWatched(lesson.id, !lesson.watched);
            }}
            title={
              lesson.watched
                ? "Desmarcar como assistida"
                : "Marcar como assistida"
            }
          >
            <Check
              className={lesson.watched ? "text-green-500" : "text-neutral-500"}
              size={20}
            />
          </button>
        </div>
      ))}
    </>
  );
}
