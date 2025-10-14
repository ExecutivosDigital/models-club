import { MessageCircle } from "lucide-react";

export function EmptyMessage() {
  return (
    <div className="flex h-full items-center justify-center">
      <MessageCircle className="text-7xl text-[#FF0080]" />
      <div className="text-default-400 mt-1 text-sm font-medium">
        Inicie uma conversa para testar a IA
      </div>
    </div>
  );
}
