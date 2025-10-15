"use client";

import { GenericCard } from "@/components/ui/card";
import { useApiContext } from "@/context/ApiContext";
import { ModelPriceProps, useModelContext } from "@/context/ModelContext";
import { cn } from "@/utils/cn";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CurrencyInput } from "react-currency-mask";
import toast from "react-hot-toast";

export function ModelCard4() {
  const { PutAPI } = useApiContext();
  const {
    selectedModel,
    setSelectedModel,
    newModelData,
    setNewModelData,
    isGettingModels,
  } = useModelContext();

  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [prices, setPrices] = useState<ModelPriceProps[]>([
    {
      modelId: "",
      name: "Tier Inicial",
      description: "Duração: 30 dias",
      duration: 30,
      price: 0,
    },
    {
      modelId: "",
      name: "Tier Intermediário",
      description: "Duração: 60 dias",
      duration: 60,
      price: 0,
    },
    {
      modelId: "",
      name: "Tier Avançado",
      description: "Duração: 90 dias",
      duration: 90,
      price: 0,
    },
    {
      modelId: "",
      name: "Tier Profissional",
      description: "Duração: 120 dias",
      duration: 120,
      price: 0,
    },
  ]);

  async function UpdateModelPricing(pricingId: string, price: number) {
    setIsUpdating(pricingId);
    if (selectedModel) {
      const update = await PutAPI(
        `/model-price/edit/${pricingId}`,
        {
          price,
        },
        true,
      );
      if (update.status === 200) {
        toast.success("Preço atualizado com sucesso!");
        return setIsUpdating(null);
      }
      toast.error(update.body.message);
      return setIsUpdating(null);
    }
  }

  const handlePriceChange = (value: number, editedIndex: number) => {
    if (selectedModel) {
      setSelectedModel({
        ...selectedModel,
        prices: selectedModel.prices.map((item, index) => {
          if (index === editedIndex) {
            return {
              ...item,
              price: value,
            };
          }
          return item;
        }),
      });
    } else if (newModelData) {
      setNewModelData({
        ...newModelData,
        prices: newModelData.prices.map((item, index) => {
          if (index === editedIndex) {
            return {
              ...item,
              price: value,
            };
          }
          return item;
        }),
      });
    } else {
      setNewModelData({
        bio: "",
        clientId: "",
        contentPrompt: "",
        whatsApp: "",
        name: "",
        photos: [],
        prices: [
          {
            modelId: "",
            name: "Tier Inicial",
            description: "Duração: 30 dias",
            duration: 30,
            price: 0,
          },
          {
            modelId: "",
            name: "Tier Intermediário",
            description: "Duração: 60 dias",
            duration: 60,
            price: 0,
          },
          {
            modelId: "",
            name: "Tier Avançado",
            description: "Duração: 90 dias",
            duration: 90,
            price: 0,
          },
          {
            modelId: "",
            name: "Tier Profissional",
            description: "Duração: 120 dias",
            duration: 120,
            price: 0,
          },
        ],
        sellPrompt: "",
        videos: [],
        instagram: null,
        photoUrl: "",
      });
    }
  };

  useEffect(() => {
    if (selectedModel) {
      setPrices(selectedModel.prices);
    } else {
      setPrices([
        {
          modelId: "",
          name: "Tier Inicial",
          description: "Duração: 30 dias",
          duration: 30,
          price: 0,
        },
        {
          modelId: "",
          name: "Tier Intermediário",
          description: "Duração: 60 dias",
          duration: 60,
          price: 0,
        },
        {
          modelId: "",
          name: "Tier Avançado",
          description: "Duração: 90 dias",
          duration: 90,
          price: 0,
        },
        {
          modelId: "",
          name: "Tier Profissional",
          description: "Duração: 120 dias",
          duration: 120,
          price: 0,
        },
      ]);
    }
  }, [selectedModel]);

  return (
    <GenericCard
      className="h-max xl:col-span-2 xl:h-48"
      isLoading={isGettingModels}
    >
      <div className="flex w-full flex-col items-center justify-between gap-4 xl:flex-row">
        <div className="flex w-full flex-col gap-2 xl:w-1/2">
          <span className="font-semibold">Precificação</span>
          <span className="text-neutral-400">
            Maximize o potencial das suas postagens e redes sociais com a
            avançada ferramenta de Inteligência Artificial da Inspire AI, que
            oferece insights valiosos
          </span>
          <button
            disabled
            className="flex h-8 w-full items-center justify-center gap-2 rounded-lg border border-neutral-600 bg-stone-950 px-4 text-neutral-600 xl:w-max xl:justify-normal"
          >
            Solicitar Ajuda
            <ChevronRight />
          </button>
        </div>
        <div className="flex w-full flex-col gap-2 xl:w-1/2">
          <div className="flex w-full items-center justify-center gap-2 xl:justify-end">
            <div className="relative flex h-8 w-full max-w-40 items-center gap-2 rounded-md bg-stone-950 px-2 outline outline-transparent focus-within:outline-neutral-500 md:max-w-60">
              <Image
                src="/icons/price.svg"
                alt=""
                width={100}
                height={100}
                className="h-6 w-max object-contain"
              />
              <span className="absolute top-1/2 right-2 flex -translate-y-1/2 items-center text-sm text-neutral-700">
                {prices[0].duration} d
                <span className="hidden xl:block">ias</span>
              </span>
              <CurrencyInput
                value={prices[0].price}
                onChangeValue={(_event, originalValue) => {
                  handlePriceChange(Number(originalValue), 0);
                }}
                InputElement={
                  <input
                    className="text-sm text-neutral-400 focus:outline-none"
                    placeholder="R$0,00"
                    disabled={isUpdating === prices[0].id}
                  />
                }
              />
            </div>
            <button
              onClick={() =>
                UpdateModelPricing(prices[0].id as string, prices[0].price)
              }
              disabled={!selectedModel}
              className={cn(
                "h-8 w-40 rounded-md bg-stone-950 px-2 font-semibold",
                !selectedModel && "cursor-not-allowed opacity-50",
              )}
            >
              {selectedModel
                ? isUpdating === prices[0].id
                  ? "Salvando..."
                  : "Atualizar"
                : !selectedModel && "Inserir"}
            </button>
          </div>
          <div className="flex w-full items-center justify-center gap-2 xl:justify-end">
            <div className="relative flex h-8 w-full max-w-40 items-center gap-2 rounded-md bg-stone-950 px-2 outline outline-transparent focus-within:outline-neutral-500 md:max-w-60">
              <Image
                src="/icons/price.svg"
                alt=""
                width={100}
                height={100}
                className="h-6 w-max object-contain"
              />
              <span className="absolute top-1/2 right-2 flex -translate-y-1/2 items-center text-sm text-neutral-700">
                {prices[1].duration} d
                <span className="hidden xl:block">ias</span>
              </span>
              <CurrencyInput
                value={prices[1].price}
                onChangeValue={(_event, originalValue) => {
                  handlePriceChange(Number(originalValue), 1);
                }}
                InputElement={
                  <input
                    className="text-sm text-neutral-400 focus:outline-none"
                    placeholder="R$0,00"
                    disabled={isUpdating === prices[1].id}
                  />
                }
              />
            </div>
            <button
              onClick={() =>
                UpdateModelPricing(prices[1].id as string, prices[1].price)
              }
              disabled={!selectedModel}
              className={cn(
                "h-8 w-40 rounded-md bg-stone-950 px-2 font-semibold",
                !selectedModel && "cursor-not-allowed opacity-50",
              )}
            >
              {selectedModel
                ? isUpdating === prices[1].id
                  ? "Salvando..."
                  : "Atualizar"
                : !selectedModel && "Inserir"}
            </button>
          </div>
          <div className="flex w-full items-center justify-center gap-2 xl:justify-end">
            <div className="relative flex h-8 w-full max-w-40 items-center gap-2 rounded-md bg-stone-950 px-2 outline outline-transparent focus-within:outline-neutral-500 md:max-w-60">
              <Image
                src="/icons/price.svg"
                alt=""
                width={100}
                height={100}
                className="h-6 w-max object-contain"
              />
              <span className="absolute top-1/2 right-2 flex -translate-y-1/2 items-center text-sm text-neutral-700">
                {prices[2].duration} d
                <span className="hidden xl:block">ias</span>
              </span>
              <CurrencyInput
                value={prices[2].price}
                onChangeValue={(_event, originalValue) => {
                  handlePriceChange(Number(originalValue), 2);
                }}
                InputElement={
                  <input
                    className="text-sm text-neutral-400 focus:outline-none"
                    placeholder="R$0,00"
                    disabled={isUpdating === prices[2].id}
                  />
                }
              />
            </div>
            <button
              onClick={() =>
                UpdateModelPricing(prices[2].id as string, prices[2].price)
              }
              disabled={!selectedModel}
              className={cn(
                "h-8 w-40 rounded-md bg-stone-950 px-2 font-semibold",
                !selectedModel && "cursor-not-allowed opacity-50",
              )}
            >
              {selectedModel
                ? isUpdating === prices[2].id
                  ? "Salvando..."
                  : "Atualizar"
                : !selectedModel && "Inserir"}
            </button>
          </div>
          <div className="flex w-full items-center justify-center gap-2 xl:justify-end">
            <div className="relative flex h-8 w-full max-w-40 items-center gap-2 rounded-md bg-stone-950 px-2 outline outline-transparent focus-within:outline-neutral-500 md:max-w-60">
              <Image
                src="/icons/price.svg"
                alt=""
                width={100}
                height={100}
                className="h-6 w-max object-contain"
              />
              <span className="absolute top-1/2 right-2 flex -translate-y-1/2 items-center text-sm text-neutral-700">
                {prices[3].duration} d
                <span className="hidden xl:block">ias</span>
              </span>
              <CurrencyInput
                value={prices[3].price}
                onChangeValue={(_event, originalValue) => {
                  handlePriceChange(Number(originalValue), 3);
                }}
                InputElement={
                  <input
                    className="text-sm text-neutral-400 focus:outline-none"
                    placeholder="R$0,00"
                    disabled={isUpdating === prices[3].id}
                  />
                }
              />
            </div>
            <button
              onClick={() =>
                UpdateModelPricing(prices[3].id as string, prices[3].price)
              }
              disabled={!selectedModel}
              className={cn(
                "h-8 w-40 rounded-md bg-stone-950 px-2 font-semibold",
                !selectedModel && "cursor-not-allowed opacity-50",
              )}
            >
              {selectedModel
                ? isUpdating === prices[3].id
                  ? "Salvando..."
                  : "Atualizar"
                : !selectedModel && "Inserir"}
            </button>
          </div>
        </div>
      </div>
    </GenericCard>
  );
}
