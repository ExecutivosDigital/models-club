"use client";
import { GenericCard } from "@/components/ui/card";
import { useApiContext } from "@/context/ApiContext";
import { useUserProfileContext } from "@/context/UserProfileContext";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function HomeCard2() {
  const { userProfile, GetUserProfile } = useUserProfileContext();
  const { PutAPI } = useApiContext();

  const [localAsaasWalletId, setLocalAsaasWalletId] = useState<string>("");
  const [canViewAsaasWalletId, setCanViewAsaasWalletId] = useState(false);
  const [isSendingAsaasWalletId, setIsSendingAsaasWalletId] = useState(false);

  async function SendAsaasKey() {
    if (localAsaasWalletId === "")
      return toast.error("Insira uma Chave Bancária válida.");
    setIsSendingAsaasWalletId(true);
    const key = await PutAPI(
      `/client/profile`,
      {
        asaasWalletId: localAsaasWalletId,
      },
      true,
    );
    if (key.status === 200) {
      toast.success("Chave Bancária inserida com sucesso!");
      setIsSendingAsaasWalletId(false);
      return GetUserProfile();
    }
    toast.error(key.body.message);
    setIsSendingAsaasWalletId(false);
  }

  useEffect(() => {
    if (userProfile) {
      setLocalAsaasWalletId(userProfile.asaasWalletId || "");
    }
  }, [userProfile]);

  return (
    <GenericCard className="h-max xl:col-span-1 xl:h-full xl:justify-between">
      <div className="flex gap-2">
        <div className="flex flex-1 flex-col gap-2">
          <span className="font-semibold">Inserir Chave Bancária</span>
          <span className="text-neutral-400">
            Use a Wallet ID do Asaas para recebimento direto na sua conta
            bancária sem constar o nome da conta de recebimento.
          </span>
        </div>
        <Image
          src="/logos/asaas.png"
          alt=""
          width={500}
          height={500}
          className="h-10 min-h-10 w-10 min-w-10 rounded object-contain"
        />
      </div>
      <div className="flex w-full items-center gap-2">
        <label className="relative flex h-8 w-full items-center gap-1 rounded-md bg-stone-950 px-2">
          <Image
            src="/icons/credit-card.svg"
            alt=""
            width={100}
            height={100}
            className="h-max w-4 rounded object-contain"
          />
          <input
            className="absolute top-0 left-0 h-full w-full px-8"
            placeholder="Sua Wallet ID aqui"
            value={localAsaasWalletId}
            onChange={(e) => setLocalAsaasWalletId(e.target.value)}
            type={canViewAsaasWalletId ? "text" : "password"}
          />
          <div className="absolute top-1/2 right-2 -translate-y-1/2">
            {canViewAsaasWalletId ? (
              <Eye
                className="w-4"
                onClick={(e) => {
                  e.stopPropagation();
                  setCanViewAsaasWalletId(!canViewAsaasWalletId);
                }}
              />
            ) : (
              <EyeOff
                className="w-4"
                onClick={(e) => {
                  e.stopPropagation();
                  setCanViewAsaasWalletId(!canViewAsaasWalletId);
                }}
              />
            )}
          </div>
        </label>
        <button
          onClick={SendAsaasKey}
          className="h-8 w-36 rounded-md bg-stone-950 px-2 font-semibold"
          disabled={isSendingAsaasWalletId}
        >
          {isSendingAsaasWalletId ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </GenericCard>
  );
}
