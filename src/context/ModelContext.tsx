/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useApiContext } from "./ApiContext";

interface ModelContextProps {
  models: ModelProps[];
  selectedModel: ModelProps | null;
  setSelectedModel: React.Dispatch<React.SetStateAction<ModelProps | null>>;
  newModelData: ModelProps;
  setNewModelData: React.Dispatch<React.SetStateAction<ModelProps>>;
  GetModels: () => void;
  isGettingModels: boolean;
}

const ModelContext = createContext<ModelContextProps | undefined>(undefined);

interface ProviderProps {
  children: React.ReactNode;
}

export interface ModelPriceProps {
  modelId: string;
  id?: string;
  price: number;
  name: string;
  description: string;
  duration: number;
}

export interface PhotoProps {
  id: string;
  modelId: string;
  photoUrl: string;
  photoShootId?: string | null;
  isFreeAvailable: boolean;
}

export interface VideoProps {
  id: string;
  modelId: string;
  videoUrl: string;
  photoShootId?: string | null;
  isFreeAvailable: boolean;
}

export interface ModelProps {
  name: string;
  photoUrl: string;
  bio: string;
  id?: string;
  sellPrompt: string;
  contentPrompt: string;
  clientId: string;
  instagram: string | null;
  whatsApp: string | null;
  prices: ModelPriceProps[];
  photos: PhotoProps[];
  videos: VideoProps[];
}

export const ModelContextProvider = ({ children }: ProviderProps) => {
  const { GetAPI } = useApiContext();
  const [models, setModels] = useState<ModelProps[]>([]);
  const [selectedModel, setSelectedModel] = useState<ModelProps | null>(null);
  const [newModelData, setNewModelData] = useState<ModelProps>({
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
  const [isGettingModels, setIsGettingModels] = useState(true);

  async function GetModels() {
    const models = await GetAPI("/model", true);
    if (models.status === 200) {
      setModels(models.body.models);
      setSelectedModel(models.body.models[0]);
      setIsGettingModels(false);
    }
    setIsGettingModels(false);
  }

  useEffect(() => {
    GetModels();
  }, []);

  return (
    <ModelContext.Provider
      value={{
        models,
        selectedModel,
        setSelectedModel,
        newModelData,
        setNewModelData,
        GetModels,
        isGettingModels,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};

export function useModelContext() {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error(
      "useModelContext deve ser usado dentro de um ModelContextProvider",
    );
  }
  return context;
}
