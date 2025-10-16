"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/blocks/accordion";
import { useApiContext } from "@/context/ApiContext";
import { Check, CircleCheck, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

interface PlanProps {
  id: string;
  pixValue: number;
}

export default function Plans() {
  const { GetAPI } = useApiContext();
  const router = useRouter();
  const [plans, setPlans] = useState<PlanProps[]>([]);
  const benefits = [
    {
      title: "Perfil de IA",
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
      title: "Receber PIX na Hora",
      free: true,
      medium: true,
      high: true,
    },
    {
      title: "2 Chats com IA",
      free: false,
      medium: true,
      high: true,
    },
    {
      title: "1 Reunião em Grupo no mês",
      free: false,
      medium: true,
      high: true,
    },
    {
      title: "Afiliado Básicos",
      free: false,
      medium: true,
      high: true,
    },
    {
      title: "Contato Desenvolvedores",
      free: false,
      medium: false,
      high: true,
    },
    {
      title: "Reuniões One on One",
      free: false,
      medium: false,
      high: true,
    },
    {
      title: "Afiliado Master",
      free: false,
      medium: false,
      high: true,
    },
  ];

  async function GetPlans() {
    const plans = await GetAPI("/signature-plan", true);
    console.log("plans", plans);
    if (plans.status === 200) {
      setPlans(plans.body.plans);
    }
  }

  useEffect(() => {
    GetPlans();
  }, []);

  if (plans.length === 0) return null;

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
          {/* <div className="col-span-6 flex flex-col items-center xl:col-span-1 xl:h-96 xl:items-start">
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
          </div> */}
          <div className="col-span-6 flex items-center justify-center xl:hidden">
            <Swiper slidesPerView="auto">
              <SwiperSlide>
                <div className="flex h-96 w-72 items-center bg-transparent">
                  <div className="my-auto flex h-[22rem] w-72 flex-col justify-between rounded-l-2xl border-r border-r-black bg-white p-4 text-black">
                    <span className="text-lg font-bold">Básico</span>
                    <span className="text-sm font-semibold">
                      {/* Iniciador de Lucro */}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">
                        {(plans[0]?.pixValue / 12).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
                      <span className="text-neutral-500"> / mês</span>
                    </div>
                    <div className="h-[2px] w-full bg-black" />
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <CircleCheck className="fill-neutral-500 text-white" />
                        <span>Perfil de IA</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CircleCheck className="fill-neutral-500 text-white" />
                        <span>Curso Spicy Completo</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CircleCheck className="fill-neutral-500 text-white" />
                        <span>Receber PIX na Hora</span>
                      </div>
                    </div>
                    <button
                      onClick={() => router.push(`/checkout/${plans[0].id}`)}
                      className="w-full rounded-lg border-2 border-black py-2 text-neutral-500"
                    >
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
                      {/* Potência Dupla */}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">
                        {(plans[1]?.pixValue / 12).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
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
                        <span>1 Reunião em Grupo no mês</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CircleCheck className="fill-neutral-500 text-white" />
                        <span>Afiliado Básicos</span>
                      </div>
                    </div>
                    <button
                      onClick={() => router.push(`/checkout/${plans[1].id}`)}
                      className="w-full rounded-lg border-2 border-black py-2 text-neutral-500"
                    >
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
                    {/* Elite da Escalada */}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">
                      {(plans[2]?.pixValue).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                    <span className="text-neutral-500"> / ano</span>
                  </div>
                  <div className="h-[2px] w-full bg-neutral-500" />
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <CircleCheck className="fill-white text-black" />
                      <span>Contato Desenvolvedores</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CircleCheck className="fill-white text-black" />
                      <span>Reuniões One on One</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CircleCheck className="fill-white text-black" />
                      <span>Afiliado Master</span>
                    </div>
                  </div>
                  <button
                    onClick={() => router.push(`/checkout/${plans[2].id}`)}
                    className="from-primary to-secondary w-full rounded-lg border-2 border-transparent bg-gradient-to-br py-2 text-white"
                  >
                    Upgrade
                  </button>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="col-span-2 col-start-2 my-auto hidden h-[22rem] flex-col justify-between rounded-l-2xl border-r border-r-black bg-white p-4 text-black xl:flex">
            <span className="text-lg font-bold">Básicos</span>
            <span className="text-sm font-semibold">
              {/* Iniciador de Lucro */}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">
                {(plans[0]?.pixValue / 12).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
              <span className="text-neutral-500"> / mês</span>
            </div>
            <div className="h-[2px] w-full bg-black" />
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <CircleCheck className="fill-neutral-500 text-white" />
                <span>Perfil de IA</span>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck className="fill-neutral-500 text-white" />
                <span>Curso Spicy Completo</span>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck className="fill-neutral-500 text-white" />
                <span>Receber PIX na Hora</span>
              </div>
            </div>
            <button
              onClick={() => router.push(`/checkout/${plans[0].id}`)}
              className="w-full rounded-lg border-2 border-black py-2 text-neutral-500"
            >
              Comece Agora
            </button>
          </div>
          <div className="col-span-2 my-auto hidden h-[22rem] flex-col justify-between bg-white p-4 text-black xl:flex">
            <span className="text-primary text-lg font-bold">Pro</span>
            <span className="text-sm font-semibold">
              {/* Potência Dupla */}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">
                {(plans[1]?.pixValue / 12).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
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
                <span>1 Reunião em Grupo por mês</span>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck className="fill-neutral-500 text-white" />
                <span>Afiliado Básicos</span>
              </div>
            </div>
            <button
              onClick={() => router.push(`/checkout/${plans[1].id}`)}
              className="w-full rounded-lg border-2 border-black py-2 text-neutral-500"
            >
              Upgrade
            </button>
          </div>
          <div className="relative col-span-2 my-auto hidden h-96 flex-col justify-between rounded-2xl bg-black p-4 py-8 text-white xl:flex">
            <div className="from-primary to-secondary absolute top-6 right-6 w-max rounded-md bg-gradient-to-br px-2 py-1 text-sm font-semibold text-white">
              Popular
            </div>
            <span className="text-lg font-bold text-green-500">Enterprise</span>
            <span className="text-sm font-semibold">
              {/* Elite da Escalada */}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">
                {(plans[2]?.pixValue).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
              <span className="text-neutral-500"> / ano</span>
            </div>
            <div className="h-[2px] w-full bg-neutral-500" />
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <CircleCheck className="fill-white text-black" />
                <span>Contato Desenvolvedores</span>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck className="fill-white text-black" />
                <span>Reuniões One on One</span>
              </div>
              <div className="flex items-center gap-2">
                <CircleCheck className="fill-white text-black" />
                <span>Afiliado Master</span>
              </div>
            </div>
            <button
              onClick={() => router.push(`/checkout/${plans[2].id}`)}
              className="from-primary to-secondary w-full rounded-lg border-2 border-transparent bg-gradient-to-br py-2 text-white"
            >
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
              </div>
              <div className="flex items-center gap-2">
                {b.high ? (
                  <Check className="text-primary stroke-3" />
                ) : (
                  <X className="text-white" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="from-primary to-secondary relative flex h-max w-full flex-col items-center bg-gradient-to-br pt-20 pb-20 xl:pb-0 2xl:h-[60vh]">
        <Image
          src="/static/generic-model-3.png"
          alt=""
          width={1000}
          height={1000}
          className="absolute -right-10 bottom-0 hidden h-2/3 w-max object-contain xl:block 2xl:h-full"
        />
        <div className="mx-auto w-full text-center xl:w-[50rem]">
          <span className="text-lg font-bold text-white xl:text-3xl">
            Perguntas Frequentes
          </span>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="shadow-none">
              <AccordionTrigger className="border-b border-b-white pb-4 text-start font-bold focus:outline-none xl:text-lg">
                Existem taxas de configuração ou instalação?
              </AccordionTrigger>
              <AccordionContent className="text-start text-sm xl:text-base">
                Não. Nossos planos são 100% transparentes, sem nenhuma taxa de
                configuração, instalação ou custos escondidos. O valor que você
                vê é o valor que você paga.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="shadow-none">
              <AccordionTrigger className="border-b border-b-white pb-4 text-start font-bold focus:outline-none xl:text-lg">
                Vocês oferecem um período de teste gratuito para qualquer um dos
                planos?
              </AccordionTrigger>
              <AccordionContent className="text-start text-sm xl:text-base">
                Sim. Oferecemos uma garantia de satisfação de 7 dias. Você pode
                assinar qualquer plano e, se por qualquer motivo não ficar
                satisfeito, basta solicitar o reembolso total do valor pago
                dentro desse período. Risco zero para você experimentar.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="shadow-none">
              <AccordionTrigger className="border-b border-b-white pb-4 text-start font-bold focus:outline-none xl:text-lg">
                Posso fazer upgrade do meu plano a qualquer momento?
              </AccordionTrigger>
              <AccordionContent className="text-start text-sm xl:text-base">
                Sim. Você pode fazer o upgrade do seu plano a qualquer momento e
                o acesso aos novos recursos é imediato.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
