"use client";
import { ChatContextProvider } from "@/context/chatContext";

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
