"use client";
import { GenericCard } from "@/components/ui/card";
import { cn } from "@/utils/cn";
import { BookOpen, CheckCheck, Clock, DollarSign } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CourseDetailsProps } from "../page";

interface CourseCardProps {
  course: CourseDetailsProps;
}

export function CourseCard({ course }: CourseCardProps) {
  const router = useRouter();

  // const handlePurchase = () => {
  //   // Lógica para redirecionar para a página de compra
  //   router.push(/purchase/${course.id});
  // };

  const handleViewDetails = () => {
    // Lógica para redirecionar para a página de detalhes do curso
    router.push(`/courses/${course.id}`);
  };

  return (
    <GenericCard className="xl:col-span-3">
      <div className="flex w-full flex-col justify-between xl:flex-row xl:items-center">
        <span className="text-lg font-semibold text-zinc-200">
          Curso: {course.title}
        </span>
        <button
          onClick={handleViewDetails}
          className="h-8 rounded-md bg-zinc-700 px-4 font-semibold transition-colors hover:bg-zinc-600"
        >
          Ver Detalhes
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        <div className="aspect-video w-full overflow-hidden rounded-md bg-zinc-800">
          <Image
            src="/placeholder-course.jpg" // Imagem padrão, ajuste conforme necessário
            alt={`Capa do curso ${course.title}`}
            width={800}
            height={450}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-neutral-400">{course.description}</p>

          <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen size={16} />
              <span>{course.lessons} aulas</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign size={16} />
              <span>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(course.price)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {course.purchased && (
            <div className="flex items-center gap-1 text-green-500">
              <CheckCheck size={20} />
              <span className="text-sm font-medium">Adquirido</span>
            </div>
          )}
          {course.partnerId && (
            <span className="rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-300">
              Parceria
            </span>
          )}
        </div>

        <button
          // onClick={handlePurchase}
          disabled={course.purchased}
          className={cn(
            "flex h-8 w-max items-center gap-2 rounded-md border px-4 font-bold transition-colors",
            course.purchased
              ? "cursor-not-allowed border-zinc-600 bg-zinc-700 text-zinc-400"
              : "border-green-500 bg-stone-950 text-green-500 hover:bg-green-500 hover:text-stone-950",
          )}
        >
          {course.purchased ? "Curso Adquirido" : "Adquirir Curso"}
        </button>
      </div>
    </GenericCard>
  );
}
