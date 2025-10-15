"use client";

import { ChatContextProvider } from "@/context/test";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChatContextProvider>
      <>{children}</>
    </ChatContextProvider>
  );
}
