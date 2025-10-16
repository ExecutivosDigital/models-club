/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { MessageProps } from "@/@types/global";
import { useApiContext } from "@/context/ApiContext";
import { useChatContext } from "@/context/ChatContext";
import { useModelContext } from "@/context/ModelContext";
import { Loader2, SendHorizontal } from "lucide-react";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

export function MessageFooter({ onSend }: { onSend: () => void }) {
  const { selectedChatMessages, setSelectedChatMessages } = useChatContext();
  const { selectedModel } = useModelContext();
  const { PostAPI } = useApiContext();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const handleSendMessage = async (message: string) => {
    if (!selectedModel || !message || isSendingMessage) return;
    setIsSendingMessage(true);
    const connect = await PostAPI(
      `/model/prompt-test/${selectedModel.id}`,
      {
        messages: [
          ...selectedChatMessages,
          {
            entity: "USER",
            text: message,
          },
        ],
      },
      true,
    );
    if (connect.status === 200) {
      setSelectedChatMessages((prev: MessageProps[]) => [
        ...prev,
        {
          entity: "USER",
          text: message,
        },
        ...connect.body.messages,
      ]);
      onSend();
      setMessage("");
      return setIsSendingMessage(false);
    }
    if (connect.status !== 200) {
      toast.error(connect.body.message);
      return setIsSendingMessage(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight - 15}px`;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSendMessage(message);
  };

  return (
    <>
      <div className="relative flex w-full items-end gap-1 rounded-lg bg-gradient-to-br from-[#FF0080] to-[#7928CA] px-2 py-2 lg:gap-2 lg:px-2 xl:gap-4 xl:px-4">
        <>
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div className="relative flex w-full items-center gap-1 rounded-md xl:gap-2">
                <textarea
                  value={message}
                  onChange={handleChange}
                  ref={textareaRef}
                  disabled={isSendingMessage || !selectedModel}
                  placeholder="Escreva sua mensagem..."
                  className="no-scrollbar h-10 max-h-10 min-h-10 w-full rounded-lg bg-neutral-900 p-1 px-3 pt-2 pl-3 text-base break-words outline-none placeholder:text-base focus:border-[#ff0080]/60 disabled:opacity-50 xl:h-10"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey && !isSendingMessage) {
                      e.preventDefault();
                      handleSubmit(e as any);
                    }
                  }}
                  style={{
                    minHeight: "32px",
                    maxHeight: "120px",
                    overflowY: "auto",
                    resize: "none",
                  }}
                />
                <button
                  onClick={() => handleSendMessage(message)}
                  type="submit"
                  disabled={isSendingMessage || !selectedModel}
                  className="group relative z-[99] h-10 w-10 min-w-10 overflow-hidden rounded-l-md border-[#ff0080]/60 p-0 xl:h-10 xl:w-10"
                >
                  <div className="absolute top-1/2 flex h-full w-full -translate-y-1/2 cursor-pointer items-center justify-center group-hover:bg-transparent">
                    {isSendingMessage ? (
                      <Loader2 className="m-auto h-4 w-4 animate-spin" />
                    ) : (
                      <SendHorizontal className="absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-white transition duration-100 group-hover:text-[#ff0080]/60" />
                    )}
                  </div>
                </button>
              </div>
            </form>
          </div>
        </>
      </div>
    </>
  );
}
