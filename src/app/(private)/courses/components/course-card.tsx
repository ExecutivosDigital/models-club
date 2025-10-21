"use client";
import { GenericCard } from "@/components/ui/card";
import { Soon } from "@/components/ui/soon";
import { cn } from "@/utils/cn";
import { CheckCheck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { CoursePreviewProps } from "../page";

interface CourseCardProps {
  course: CoursePreviewProps;
}

export function CourseCard({ course }: CourseCardProps) {
  const router = useRouter();

  return (
    <GenericCard className="xl:col-span-3">
      <Soon />
      <div className="flex w-full flex-col justify-between xl:flex-row xl:items-center">
        <span className="text-lg font-semibold text-zinc-200">
          Curso: {course.title}
        </span>
        <button className="h-8 rounded-md bg-zinc-700 px-4 font-semibold">
          Ver Todas
        </button>
      </div>
      <div className="h-[26rem] min-h-[26rem] w-full xl:hidden">
        <Swiper
          spaceBetween={10}
          breakpoints={{
            300: {
              slidesPerView: 1.2,
            },
            768: {
              slidesPerView: "auto",
            },
          }}
          className="h-full w-full"
        >
          {course.classes.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="flex h-full max-w-96 cursor-pointer flex-col justify-between gap-4 rounded-md transition duration-200 hover:bg-stone-950">
                <Image
                  src={item.image}
                  alt=""
                  width={500}
                  height={500}
                  className="h-max w-96 rounded-md object-contain"
                />
                <div className="flex flex-col px-2 leading-4">
                  <span className="text-sm text-zinc-400">{item.tag}</span>
                  <span className="text-lg font-semibold">{item.title}</span>
                </div>
                <span className="px-2 text-neutral-400">
                  {item.description}
                </span>
                <div className="flex w-full items-center justify-between px-2 pb-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(
                        `/courses/${item.title.toLowerCase().replaceAll(" ", "-")}`,
                      );
                    }}
                    className="h-8 rounded-md bg-stone-950 px-2 font-semibold"
                  >
                    VER AULA
                  </button>
                  <div
                    className={cn(
                      "border-primary text-primary flex h-8 w-8 items-center justify-center rounded-md border bg-stone-950",
                      !item.seen && "opacity-0",
                    )}
                  >
                    <CheckCheck />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="hidden w-full items-center justify-between xl:flex">
        {course.classes.map((item) => (
          <div
            key={item.id}
            className="flex h-full w-72 cursor-pointer flex-col justify-between gap-4 rounded-md transition duration-200 hover:bg-stone-950"
          >
            <Image
              src={item.image}
              alt=""
              width={500}
              height={500}
              className="aspect-video w-full rounded-md object-contain"
            />
            <div className="flex flex-col px-2 leading-4">
              <span className="text-sm text-zinc-400">{item.tag}</span>
              <span className="text-lg font-semibold">{item.title}</span>
            </div>
            <span className="px-2 text-neutral-400">{item.description}</span>
            <div className="flex w-full items-center justify-between px-2 pb-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(
                    `/courses/${item.title.toLowerCase().replaceAll(" ", "-")}`,
                  );
                }}
                className="h-8 rounded-md bg-stone-950 px-2 font-semibold"
              >
                VER AULA
              </button>
              <div
                className={cn(
                  "border-primary text-primary flex h-8 w-8 items-center justify-center rounded-md border bg-stone-950",
                  !item.seen && "opacity-0",
                )}
              >
                <CheckCheck />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="flex h-8 w-max items-center gap-2 rounded-md border border-green-500 bg-stone-950 px-4 font-bold text-green-500">
        Adquirir Curso
      </button>
    </GenericCard>
  );
}
