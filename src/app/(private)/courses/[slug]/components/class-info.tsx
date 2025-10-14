import { Check } from "lucide-react";

export function ClassInfo() {
  return (
    <>
      <div className="flex flex-1 flex-col gap-4">
        <span className="text-lg font-bold">Título da Aula</span>
        <div className="flex gap-2">
          <div className="h-10 w-10 rounded-full bg-stone-800" />
          <div className="flex flex-col">
            <span>Nome do professor</span>
            <span>Lorem Ipsum</span>
          </div>
        </div>
        <span className="text-primary font-bold">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.{" "}
        </span>
        <span className="w-full max-w-[700px] text-sm text-neutral-400">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry{"'"}s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book.
        </span>
      </div>
      <div className="flex w-72 flex-col gap-4">
        <div className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-neutral-500">
          <Check className="text-green-500" />
          <span className="font-semibold">Marcar como Assistida</span>
        </div>
      </div>
    </>
  );
}
