"use client";

import { ChatContextProvider } from "@/context/ChatContext";

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
