"use client";
import { GenericCard } from "@/components/ui/card";
import { VideoModal } from "@/components/ui/videoModal";
import { useModelContext } from "@/context/ModelContext";
import { CheckCheck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

export function HomeCard7() {
  const { isGettingModels } = useModelContext();
  const [selectedVideo, setSelectedVideo] = useState<{
    id: string;
    videoId: string;
    title: string;
    description: string;
  } | null>(null);

  const array = [
    {
      id: "5",
      videoId: "OEwULyHd358",
      image: "/static/placeholder-thumbnail-5.png",
      tag: "Livre*",
      title: "Automação N8N",
      description:
        "Configure fluxos automáticos para organizar tarefas e ganhar produtividade.",
    },
    {
      id: "6",
      videoId: "NM52Nqdvg8g",
      image: "/static/placeholder-thumbnail-6.png",
      tag: "Livre*",
      title: "Integração com Instagram",
      description:
        "Passo a passo para desenvolver e personalizar sua própria personagem de IA.",
    },
    {
      id: "7",
      videoId:
        "https://drive.google.com/file/d/1HXBeoXAs_bqyTTSirz7j2ovZE9HY3f3K/view?usp=sharing",
      image: "/static/placeholder-thumbnail-7.png",
      tag: "Livre*",
      title: "IA sem cesura",
      description:
        "Utilize o melhor do mercado, com técnicas avançadas para criação de modelos com consistência.",
    },
    {
      id: "8",
      videoId: "3ME7EwabHXk",
      image: "/static/placeholder-thumbnail-8.png",
      tag: "Livre*",
      title: "Por Que usar N8N?",
      description: "Entenda toda a lógica por trás da importância de usar N8N.",
    },
  ];

  const handleOpenVideo = (item: (typeof array)[0]) => {
    setSelectedVideo({
      id: item.id,
      videoId: item.videoId,
      title: item.title,
      description: item.description,
    });
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  return (
    <>
      <GenericCard
        className="h-full min-h-60 xl:col-span-3 xl:min-h-[26rem]"
        isLoading={isGettingModels}
      >
        <div className="flex w-full flex-col justify-between xl:flex-row xl:items-center">
          <span className="text-lg font-semibold text-zinc-200">
            Vídeos para começar: Opcional*
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
            {array.map((item) => (
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
                    <button className="h-8 rounded-md bg-stone-950 px-2 font-semibold">
                      VER ATIVIDADE
                    </button>
                    <div className="border-primary text-primary flex h-8 w-8 items-center justify-center rounded-md border bg-stone-950">
                      <CheckCheck />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="hidden w-full items-center justify-between xl:flex">
          {array.map((item) => (
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
                  onClick={() => handleOpenVideo(item)}
                  className="h-8 rounded-md bg-stone-950 px-2 font-semibold"
                >
                  VER ATIVIDADE
                </button>
                <div className="border-primary text-primary flex h-8 w-8 items-center justify-center rounded-md border bg-stone-950">
                  <CheckCheck />
                </div>
              </div>
            </div>
          ))}
        </div>
      </GenericCard>
      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={handleCloseModal}
          videoId={selectedVideo.videoId}
          title={selectedVideo.title}
          description={selectedVideo.description}
        />
      )}
    </>
  );
}
