"use client";
import { GenericCard } from "@/components/ui/card";
import { useModelContext } from "@/context/ModelContext";
import { copyToClipboard } from "@/utils/copy-to-clipboard";
import toast from "react-hot-toast";

export function ModelCard1() {
  const { models, selectedModel, isGettingModels } = useModelContext();

  return (
    <GenericCard className="xl:col-span-3" isLoading={isGettingModels}>
      {models.length === 0 ? (
        <>
          <span className="from-primary to-secondary w-full bg-gradient-to-br bg-clip-text text-center text-xl font-bold text-transparent">
            Crie sua primeira modelo!
          </span>
          <span className="w-full text-center text-sm text-neutral-400">
            Preencha os campos abaixo para começar seu caminho com a Models Club
          </span>
        </>
      ) : models.length !== 0 && selectedModel ? (
        <>
          <span className="from-primary to-secondary w-full bg-gradient-to-br bg-clip-text text-center text-xl font-bold text-transparent">
            Acesse o site público da {selectedModel?.name}
          </span>
          <span
            className="w-full text-center text-sm text-neutral-400"
            onClick={() => {
              if (selectedModel) {
                copyToClipboard(`https://spicyai.com.br/${selectedModel.id}`);
                toast.success("Link copiado com sucesso!");
              }
            }}
          >
            https://spiceai.com.br/{selectedModel?.id}{" "}
          </span>
        </>
      ) : (
        models.length !== 0 &&
        !selectedModel && (
          <>
            <span className="from-primary to-secondary w-full bg-gradient-to-br bg-clip-text text-center text-xl font-bold text-transparent">
              Preencha os campos abaixo para criar outra modelo
            </span>
            <span className="w-full text-center text-sm text-neutral-400">
              Ou selecione uma modelo para editar seus dados
            </span>
          </>
        )
      )}
    </GenericCard>
  );
}
