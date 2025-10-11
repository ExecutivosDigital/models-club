"use client";
import { GenericCard } from "@/components/ui/card";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

export function ModelCard7() {
  const array = [
    {
      id: "1",
      image: "/static/placeholder-thumbnail-1.png",
    },
    {
      id: "2",
      image: "/static/placeholder-thumbnail-2.png",
    },
    {
      id: "3",
      image: "/static/placeholder-thumbnail-3.png",
    },
    {
      id: "4",
      image: "/static/placeholder-thumbnail-4.png",
    },
    {
      id: "5",
      image: "/static/placeholder-thumbnail-5.png",
    },
    {
      id: "6",
      image: "/static/placeholder-thumbnail-6.png",
    },
    {
      id: "7",
      image: "/static/placeholder-thumbnail-7.png",
    },
    {
      id: "8",
      image: "/static/placeholder-thumbnail-8.png",
    },
    {
      id: "9",
      image: "/static/placeholder-thumbnail-1.png",
    },
    {
      id: "10",
      image: "/static/placeholder-thumbnail-2.png",
    },
    {
      id: "11",
      image: "/static/placeholder-thumbnail-3.png",
    },
    {
      id: "12",
      image: "/static/placeholder-thumbnail-4.png",
    },
    {
      id: "13",
      image: "/static/placeholder-thumbnail-5.png",
    },
    {
      id: "14",
      image: "/static/placeholder-thumbnail-6.png",
    },
    {
      id: "15",
      image: "/static/placeholder-thumbnail-7.png",
    },
    {
      id: "16",
      image: "/static/placeholder-thumbnail-8.png",
    },
  ];

  return (
    <GenericCard className="xl:col-span-3">
      <div className="flex w-full flex-col justify-between xl:flex-row xl:items-center">
        <span className="text-lg font-semibold text-zinc-200">
          Inserir Fotos: Pago
        </span>
        <button className="h-8 rounded-md bg-zinc-700 px-4 font-semibold">
          Ver Todas
        </button>
      </div>
      <div className="w-full xl:hidden">
        <Swiper spaceBetween={10} slidesPerView="auto" className="w-full">
          {array.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="flex h-full max-w-28 cursor-pointer flex-col justify-between gap-2 rounded-md transition duration-200 hover:bg-stone-900">
                <Image
                  src={item.image}
                  alt=""
                  width={500}
                  height={500}
                  className="aspect-square w-full rounded-md object-cover"
                />
                <div className="flex items-center justify-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md border border-red-600 bg-stone-950 text-red-600">
                    <Image
                      src="/icons/trash.svg"
                      alt=""
                      width={100}
                      height={100}
                      className="h-max w-4 object-contain"
                    />
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-md border border-white bg-stone-950 text-white">
                    <Image
                      src="/icons/resize.svg"
                      alt=""
                      width={100}
                      height={100}
                      className="h-max w-4 object-contain"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="hidden w-full items-center justify-between justify-items-center gap-x-2 gap-y-4 xl:grid xl:grid-cols-8">
        {array.map((item) => (
          <div
            key={item.id}
            className="flex h-max w-32 cursor-pointer flex-col justify-between gap-2 rounded-md"
          >
            <Image
              src={item.image}
              alt=""
              width={500}
              height={500}
              className="aspect-square w-full rounded-md object-cover"
            />
            <div className="flex items-center justify-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-red-600 bg-stone-950 text-red-600">
                <Image
                  src="/icons/trash.svg"
                  alt=""
                  width={100}
                  height={100}
                  className="h-max w-4 object-contain"
                />
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-white bg-stone-950 text-white">
                <Image
                  src="/icons/resize.svg"
                  alt=""
                  width={100}
                  height={100}
                  className="h-max w-4 object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </GenericCard>
  );
}
