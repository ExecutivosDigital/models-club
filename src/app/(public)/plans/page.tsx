"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/blocks/accordion";
import { Check, CircleCheck, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Plans() {
  const [planType, setPlanType] = useState("yearly");
  const benefits = [
    {
      title: "Monetização Ilimitada",
      free: true,
      medium: true,
      high: true,
    },
    {
      title: "Curso Spicy Completo",
      free: true,
      medium: true,
      high: true,
    },
    {
      title: "Suporte de Elite",
      free: false,
      medium: true,
      high: true,
    },
    {
      title: "Ativação de Modelos IA",
      free: false,
      medium: false,
      high: true,
    },
    {
      title: "Suporte (Resolução de Dúvidas)",
      free: false,
      medium: true,
      mediumMessage: "Via email",
      high: true,
      highMessage: "Chat 24/7",
    },
    {
      title: "Integração com Ferramentas",
      free: false,
      medium: false,
      high: true,
    },
    {
      title: "Expansão Global",
      free: false,
      medium: false,
      high: true,
    },
    {
      title: "Gerente de Contas Dedicado",
      free: false,
      medium: false,
      high: true,
    },
  ];

  return (
    <div className="m-6 min-h-[calc(100svh-3rem)] overflow-hidden rounded-md bg-neutral-900">
      <div className="mx-auto flex max-w-[80rem] flex-col items-center gap-4 p-4 xl:p-8">
        <div className="flex flex-col items-center xl:gap-4">
          <span className="text-center text-xl font-bold text-white xl:text-3xl">
            Seu Chat IA Acessível e Escalável
          </span>
          <span className="text-sm font-semibold xl:text-base">
            Invista em IA, colha resultados reais.
          </span>
        </div>
        <div className="grid w-full grid-cols-6 gap-2 xl:grid-cols-7 xl:gap-0">
          <div className="col-span-6 flex flex-col items-center xl:col-span-1 xl:h-96 xl:items-start">
            <span className="text-lg font-bold text-white">
              Escolha seu Plano
            </span>
            <div className="flex flex-row gap-2 xl:flex-col">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  className="accent-primary focus:outline-none"
                  name="plan"
                  id="monthly"
                  checked={planType === "monthly"}
                  onChange={() => setPlanType("monthly")}
                />
                <label htmlFor="monthly" className="cursor-pointer">
                  Mensal
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  className="accent-primary focus:outline-none"
                  name="plan"
                  id="yearly"
                  checked={planType === "yearly"}
                  onChange={() => setPlanType("yearly")}
                />
                <label htmlFor="yearly" className="cursor-pointer">
                  Anual
                </label>
              </div>
            </div>
          </div>
          <div className="col-span-6 flex items-center justify-center xl:hidden">
            <Swiper slidesPerView="auto">
              <SwiperSlide>
                <div className="flex h-96 w-72 items-center bg-transparent">
                  <div className="my-auto flex h-[22rem] w-72 flex-col justify-between rounded-l-2xl border-r border-r-black bg-white p-4 text-black">
                    <span className="text-lg font-bold">Tier</span>
                    <span className="text-sm font-semibold">
                      Iniciador de Lucro
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">R$57</span>
                      <span className="text-neutral-500"> / mês</span>
                    </div>
                    <div className="h-[2px] w-full bg-black" />
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <CircleCheck className="fill-neutral-500 text-white" />
                        <span>1 Chat com IA</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CircleCheck className="fill-neutral-500 text-white" />
                        <span>Curso Spicy Completo</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CircleCheck className="fill-neutral-500 text-white" />
                        <span>PIX na Hora</span>
                      </div>
                    </div>
                    <button className="w-full rounded-lg border-2 border-black py-2 text-neutral-500">
                      Comece Agora
                    </button>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="flex h-96 w-72 items-center bg-transparent">
                  <div className="my-auto flex h-[22rem] w-72 flex-col justify-between bg-white p-4 text-black">
                    <span className="text-primary text-lg font-bold">Pro</span>
                    <span className="text-sm font-semibold">
                      Potência Dupla
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">R$97</span>
                      <span className="text-neutral-500"> / mês</span>
                    </div>
                    <div className="h-[2px] w-full bg-black" />
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <CircleCheck className="fill-neutral-500 text-white" />
                        <span>2 Chats com IA</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CircleCheck className="fill-neutral-500 text-white" />
                        <span>Suporte Prioritário</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CircleCheck className="fill-neutral-500 text-white" />
                        <span>Recursos de Monetização</span>
                      </div>
                    </div>
                    <button className="w-full rounded-lg border-2 border-black py-2 text-neutral-500">
                      Upgrade
                    </button>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="relative my-auto flex h-96 w-72 flex-col justify-between rounded-2xl bg-black p-4 py-8 text-white">
                  <div className="from-primary to-secondary absolute top-6 right-6 w-max rounded-md bg-gradient-to-br px-2 py-1 text-sm font-semibold text-white">
                    Popular
                  </div>
                  <span className="text-lg font-bold text-green-500">
                    Enterprise
                  </span>
                  <span className="text-sm font-semibold">
                    Elite da Escalada
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">R$137</span>
                    <span className="text-neutral-500"> / mês</span>
                  </div>
                  <div className="h-[2px] w-full bg-neutral-500" />
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <CircleCheck className="fill-white text-black" />
                      <span>Acesso Exclusivo aos Cursos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CircleCheck className="fill-white text-black" />
                      <span>Ative 3 Modelos Simultaneamente</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CircleCheck className="fill-white text-black" />
                      <span>Configurações IA Otimizadas</span>
                    </div>
                  </div>
                  <button className="from-primary to-secondary w-full rounded-lg border-2 border-transparent bg-gradient-to-br py-2 text-white">
                    Upgrade
                  </button>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="col-span-2 my-auto hidden h-[22rem] flex-col justify-between rounded-l-2xl border-r border-r-black bg-white p-4 text-black xl:flex">
            <span className="text-lg font-bold">Tier</span>
            <span className="text-sm font-semibold">Iniciador de Lucro</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">R$57</span>
              <span className="text-neutral-500"> / mês</span>
            </div>
            <div className="h-[2px] w-full bg-black" />
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <CircleCheck className="fill-neutral-500 text-white" />
                <span>1 Chat com IA</span>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck className="fill-neutral-500 text-white" />
                <span>Curso Spicy Completo</span>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck className="fill-neutral-500 text-white" />
                <span>PIX na Hora</span>
              </div>
            </div>
            <button className="w-full rounded-lg border-2 border-black py-2 text-neutral-500">
              Comece Agora
            </button>
          </div>
          <div className="col-span-2 my-auto hidden h-[22rem] flex-col justify-between bg-white p-4 text-black xl:flex">
            <span className="text-primary text-lg font-bold">Pro</span>
            <span className="text-sm font-semibold">Potência Dupla</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">R$97</span>
              <span className="text-neutral-500"> / mês</span>
            </div>
            <div className="h-[2px] w-full bg-black" />
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <CircleCheck className="fill-neutral-500 text-white" />
                <span>2 Chats com IA</span>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck className="fill-neutral-500 text-white" />
                <span>Suporte Prioritário</span>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck className="fill-neutral-500 text-white" />
                <span>Recursos de Monetização</span>
              </div>
            </div>
            <button className="w-full rounded-lg border-2 border-black py-2 text-neutral-500">
              Upgrade
            </button>
          </div>
          <div className="relative col-span-2 my-auto hidden h-96 flex-col justify-between rounded-2xl bg-black p-4 py-8 text-white xl:flex">
            <div className="from-primary to-secondary absolute top-6 right-6 w-max rounded-md bg-gradient-to-br px-2 py-1 text-sm font-semibold text-white">
              Popular
            </div>
            <span className="text-lg font-bold text-green-500">Enterprise</span>
            <span className="text-sm font-semibold">Elite da Escalada</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">R$137</span>
              <span className="text-neutral-500"> / mês</span>
            </div>
            <div className="h-[2px] w-full bg-neutral-500" />
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <CircleCheck className="fill-white text-black" />
                <span>Acesso Exclusivo aos Cursos</span>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck className="fill-white text-black" />
                <span>Ative 3 Modelos Simultaneamente</span>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck className="fill-white text-black" />
                <span>Configurações IA Otimizadas</span>
              </div>
            </div>
            <button className="from-primary to-secondary w-full rounded-lg border-2 border-transparent bg-gradient-to-br py-2 text-white">
              Upgrade
            </button>
          </div>
        </div>
        <div className="hidden w-full flex-col md:flex">
          <span className="text-3xl font-bold text-white">Benefícios</span>
          {benefits.map((b) => (
            <div
              key={b.title}
              className="grid w-full grid-cols-4 border-t border-t-neutral-700 py-4"
            >
              <span className="font-semibold text-white">{b.title}</span>
              <div className="flex items-center gap-2">
                {b.free ? (
                  <Check className="text-primary stroke-3" />
                ) : (
                  <X className="text-white" />
                )}
              </div>
              <div className="flex items-center gap-2">
                {b.medium ? (
                  <Check className="text-primary stroke-3" />
                ) : (
                  <X className="text-white" />
                )}
                {b.mediumMessage && (
                  <span className="text-sm text-white">{b.mediumMessage}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {b.high ? (
                  <Check className="text-primary stroke-3" />
                ) : (
                  <X className="text-white" />
                )}
                {b.highMessage && (
                  <span className="text-sm text-white">{b.highMessage}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="from-primary to-secondary relative flex h-max w-full flex-col items-center bg-gradient-to-br pt-20 pb-20 xl:h-[60vh] xl:pb-0">
        <Image
          src="/static/generic-model-3.png"
          alt=""
          width={1000}
          height={1000}
          className="absolute -right-10 bottom-0 hidden h-full w-max object-contain xl:block"
        />
        <div className="mx-auto w-full text-center xl:w-[50rem]">
          <span className="text-lg font-bold text-white xl:text-3xl">
            Perguntas Frequentes
          </span>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="shadow-none">
              <AccordionTrigger className="border-b border-b-white pb-4 text-start font-bold focus:outline-none xl:text-lg">
                {" "}
                Existem taxas de configuração ou instalação?
              </AccordionTrigger>
              <AccordionContent className="text-sm xl:text-base">
                Não! Não cobramos taxa de instalação ou configuração. Seu único
                custo inicial é a taxa de ativação do Tier escolhido (a partir
                de R$ 57/mês).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="shadow-none">
              <AccordionTrigger className="border-b border-b-white pb-4 text-start font-bold focus:outline-none xl:text-lg">
                Vocês oferecem um período de teste gratuito para qualquer um dos
                planos?
              </AccordionTrigger>
              <AccordionContent className="text-sm xl:text-base">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="shadow-none">
              <AccordionTrigger className="border-b border-b-white pb-4 text-start font-bold focus:outline-none xl:text-lg">
                Posso fazer upgrade ou downgrade do meu plano a qualquer
                momento?
              </AccordionTrigger>
              <AccordionContent className="text-sm xl:text-base">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="shadow-none">
              <AccordionTrigger className="border-b border-b-white pb-4 text-start font-bold focus:outline-none xl:text-lg">
                Posso testar a Spicy antes de me comprometer com um plano pago?
              </AccordionTrigger>
              <AccordionContent className="text-sm xl:text-base">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="shadow-none">
              <AccordionTrigger className="border-b border-b-white pb-4 text-start font-bold focus:outline-none xl:text-lg">
                Vocês oferecem descontos ?
              </AccordionTrigger>
              <AccordionContent className="text-sm xl:text-base">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
