import { ChevronRight } from "lucide-react";

export function ClassList() {
  return (
    <>
      <span className="text-lg font-bold">Aulas</span>
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="flex w-full items-center gap-2 rounded-md border border-neutral-500 p-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-950">
            {index}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">Título da Aula</span>
            <span className="text-sm text-neutral-500">Duração da Aula</span>
          </div>
          <ChevronRight className="ml-auto" />
        </div>
      ))}
    </>
  );
}
