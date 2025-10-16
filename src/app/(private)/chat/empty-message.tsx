"use client";
import { useModelContext } from "@/context/ModelContext";
import { MessageCircle } from "lucide-react";

export function EmptyMessage() {
  const { selectedModel } = useModelContext();

  return (
    <div className="flex h-full items-center justify-center">
      <MessageCircle className="text-7xl text-[#FF0080]" />
      <div className="text-default-400 mt-1 text-sm font-medium">
        {selectedModel
          ? "Inicie uma conversa para testar a IA"
          : "Selecione uma Modelo para iniciar os testes"}
      </div>
    </div>
  );
}
