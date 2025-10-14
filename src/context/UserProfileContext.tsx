/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useApiContext } from "./ApiContext";

interface UserProfileContextProps {
  userProfile: UserProfileProps;
  GetUserProfile: () => Promise<void>;
}

const UserProfileContext = createContext<UserProfileContextProps | undefined>(
  undefined,
);

interface ProviderProps {
  children: React.ReactNode;
}

export interface UserProfileProps {
  asaasWalletId: string | null;
  cpfCnpj: string;
  email: string;
  name: string;
  openRouterKey: string | null;
  passwordHash: string;
  paymentId: string;
  phone: string;
}

export const UserProfileContextProvider = ({ children }: ProviderProps) => {
  const { GetAPI } = useApiContext();
  const [userProfile, setUserProfile] = useState<UserProfileProps | null>(null);

  async function GetUserProfile() {
    const profile = await GetAPI("/client/profile", true);
    if (profile.status === 200) {
      setUserProfile(profile.body.client);
    }
  }

  useEffect(() => {
    GetUserProfile();
  }, []);

  if (!userProfile) {
    return null;
  }

  return (
    <UserProfileContext.Provider
      value={{
        userProfile,
        GetUserProfile,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export function useUserProfileContext() {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error(
      "useUserProfileContext deve ser usado dentro de um UserProfileContextProvider",
    );
  }
  return context;
}
