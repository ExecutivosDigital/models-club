/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { MessageProps } from "@/@types/global";
import { useChatContext } from "@/context/ChatContext";
import { useModelContext } from "@/context/ModelContext";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EmptyMessage } from "./empty-message";
import { ChatHeader } from "./header";
import { MessageFooter } from "./message-footer";
import { Messages } from "./messages";

export type GalleryItem = {
  src: string;
  alt?: string;
  badge?: string;
  locked?: boolean;
  poster?: string;
  mediaType?: "image" | "video";
  placeholder?: boolean;
};

export default function ChatPage() {
  const { selectedChatMessages, isChatsLoading } = useChatContext();
  const { selectedModel } = useModelContext();
  const containerRef = useRef(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToBottom = () => {
    setIsAutoScrollEnabled(true);
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    if (selectedChatMessages.length > 0 && isAutoScrollEnabled) {
      handleScrollToBottom();
    }
  }, [selectedChatMessages, isAutoScrollEnabled, selectedModel]);

  useEffect(() => {
    const chatElement: any = containerRef.current;
    const handleScroll = () => {
      const scrollTop = chatElement.scrollTop;
      const scrollHeight = chatElement.scrollHeight;
      const clientHeight = chatElement.clientHeight;

      if (scrollTop < lastScrollTop.current) {
        setIsAutoScrollEnabled(false);
      } else if (Math.abs(scrollTop + clientHeight - scrollHeight) <= 10) {
        setIsAutoScrollEnabled(true);
      }

      lastScrollTop.current = scrollTop;
    };

    if (chatElement) {
      chatElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (chatElement) {
        chatElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [containerRef.current, selectedModel]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chatElement: any = containerRef.current;
    if (chatElement) {
      lastScrollTop.current = chatElement.scrollTop;
    }
  }, [selectedModel]);

  useEffect(() => {
    setIsAutoScrollEnabled(true);
  }, [selectedModel]);

  return (
    <div className="flex h-[calc(100svh-175px)] gap-2 rounded-md bg-stone-900 text-white xl:h-[calc(100svh-240px)]">
      <div className="relative flex h-full w-full flex-col gap-4 p-4">
        <ChatHeader />
        <div
          className="custom-scrollbar flex h-full w-full flex-col overflow-y-auto rounded-md bg-stone-950 py-4 lg:py-2 xl:py-4"
          ref={containerRef}
        >
          {isChatsLoading || selectedChatMessages.length === 0 ? (
            <EmptyMessage />
          ) : (
            selectedChatMessages.map((message: MessageProps, i: number) => (
              <Messages
                key={`message-list-${i}-${message.text}`}
                message={message}
              />
            ))
          )}
          <div ref={bottomRef} />
        </div>
        {!isAutoScrollEnabled &&
          !isChatsLoading &&
          selectedChatMessages.length !== 0 && (
            <button
              onClick={handleScrollToBottom}
              className="absolute bottom-24 left-1/2 z-[100] -translate-x-1/2 rounded-full bg-stone-800 p-1"
            >
              <ArrowDown />
            </button>
          )}
        <MessageFooter
          onSend={() => {
            setIsAutoScrollEnabled(true);
            handleScrollToBottom();
          }}
        />
      </div>
    </div>
  );
}
