"use client";
import { GenericCard } from "@/components/ui/card";
import { useApiContext } from "@/context/ApiContext";
import { useUserProfileContext } from "@/context/UserProfileContext";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function HomeCard3() {
  const { userProfile, GetUserProfile } = useUserProfileContext();
  const { PutAPI } = useApiContext();

  const [localOpenRouterKey, setLocalOpenRouterKey] = useState<string>("");
  const [canViewOpenRouterKey, setCanViewOpenRouterKey] = useState(false);
  const [isSendingOpenRouterKey, setIsSendingOpenRouterKey] = useState(false);

  async function SendAsaasKey() {
    if (localOpenRouterKey === "")
      return toast.error("Insira uma Chave IA válida.");
    setIsSendingOpenRouterKey(true);
    const key = await PutAPI(
      `/client/profile`,
      {
        openRouterKey: localOpenRouterKey,
      },
      true,
    );
    if (key.status === 200) {
      toast.success("Chave IA inserida com sucesso!");
      setIsSendingOpenRouterKey(false);
      return GetUserProfile();
    }
    toast.error(key.body.message);
    setIsSendingOpenRouterKey(false);
  }

  useEffect(() => {
    if (userProfile) {
      setLocalOpenRouterKey(userProfile.openRouterKey || "");
    }
  }, [userProfile]);

  return (
    <GenericCard className="h-max xl:col-span-1 xl:h-full xl:justify-between">
      <div className="flex gap-2">
        <div className="flex flex-1 flex-col gap-2">
          <span className="font-semibold">Inserir Chave IA</span>
          <span className="text-neutral-400">
            Utilize o melhor das Inteligências Artificiais, com o Open Router
            você pode usar IAs sem censura sem preços abusivos.
          </span>
        </div>
        <Image
          src="/logos/open-router.png"
          alt=""
          width={500}
          height={500}
          className="h-10 min-h-10 w-10 min-w-10 rounded object-contain"
        />
      </div>
      <div className="flex w-full items-center gap-2">
        <label className="relative flex h-8 w-full items-center gap-1 rounded-md bg-stone-950 px-2">
          <Image
            src="/icons/key.svg"
            alt=""
            width={100}
            height={100}
            className="h-max w-4 rounded object-contain"
          />
          <input
            className="absolute top-0 left-0 h-full w-full px-8"
            placeholder="Sua API KEY aqui"
            value={localOpenRouterKey}
            onChange={(e) => setLocalOpenRouterKey(e.target.value)}
            type={canViewOpenRouterKey ? "text" : "password"}
          />
          <div className="absolute top-1/2 right-2 -translate-y-1/2">
            {canViewOpenRouterKey ? (
              <Eye
                className="w-4"
                onClick={(e) => {
                  e.stopPropagation();
                  setCanViewOpenRouterKey(!canViewOpenRouterKey);
                }}
              />
            ) : (
              <EyeOff
                className="w-4"
                onClick={(e) => {
                  e.stopPropagation();
                  setCanViewOpenRouterKey(!canViewOpenRouterKey);
                }}
              />
            )}
          </div>
        </label>
        <button
          onClick={SendAsaasKey}
          className="h-8 w-36 rounded-md bg-stone-950 px-2 font-semibold"
          disabled={isSendingOpenRouterKey}
        >
          {isSendingOpenRouterKey ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </GenericCard>
  );
}
