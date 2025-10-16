"use client";
import { GenericCard } from "@/components/ui/card";
import { useModelContext } from "@/context/ModelContext";
import { CheckCheck } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

export function HomeCard6() {
  const { isGettingModels } = useModelContext();

  const array = [
    {
      id: "1",
      image: "/static/placeholder-thumbnail-1.png",
      tag: "Obrigatório*",
      title: "Bem Vindos",
      description:
        "Visão geral da plataforma e das oportunidades de criar e vender conteúdo +18 com IA.",
    },
    {
      id: "2",
      image: "/static/placeholder-thumbnail-2.png",
      tag: "Obrigatório*",
      title: "Criar minha Modelo",
      description:
        "Passo a passo para desenvolver e personalizar sua própria personagem de IA.",
    },
    {
      id: "3",
      image: "/static/placeholder-thumbnail-3.png",
      tag: "Obrigatório*",
      title: "Como receber?",
      description:
        "Aprenda a configurar formas de pagamento e organizar seus ganhos com segurança.",
    },
    {
      id: "4",
      image: "/static/placeholder-thumbnail-4.png",
      tag: "Obrigatório*",
      title: "Key da IA",
      description:
        "Entenda o que é a chave da IA, como gerar e usar para liberar acessos e integrações.",
    },
  ];

  return (
    <GenericCard
      className="h-full min-h-60 xl:col-span-3 xl:min-h-[26rem]"
      isLoading={isGettingModels}
    >
      {" "}
      <div className="flex w-full flex-col justify-between xl:flex-row xl:items-center">
        <span className="text-lg font-semibold text-zinc-200">
          Vídeos para começar: Obrigatório*
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
              <button className="h-8 rounded-md bg-stone-950 px-2 font-semibold">
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
  );
}
