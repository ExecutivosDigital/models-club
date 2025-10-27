"use client";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { useState } from "react";
import ForgotPassword from "./components/forgot";
import SignIn from "./components/login";
import CreateAccount from "./components/register";

export default function Login() {
  const [selectedStep, setSelectedStep] = useState(0);
  const [forgot, setForgot] = useState<boolean>(false);

  return (
    <>
      <div className="relative flex h-full min-h-[100svh] gap-2 overflow-x-hidden p-2 2xl:gap-4 2xl:p-4">
        <div className="relative mx-auto hidden w-full max-w-[50vw] items-center justify-center xl:flex">
          <iframe
            src="https://www.youtube.com/embed/LrSwFoLAAO0?si=xgGFvrKD43dWWAiG"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="m-auto block h-[90%] w-full rounded-[1.25rem]"
          ></iframe>
          {/* <Image
            className="m-auto block h-[90%] w-max rounded-[1.25rem] bg-blue-500 object-contain"
            src="/static/login.gif"
            alt=""
            width={1000}
            height={1000}
          /> */}
        </div>
        <div className="relative flex w-full rounded-[1.25rem] bg-stone-900 p-2 xl:max-w-[50vw]">
          <div className="m-auto w-full max-w-[31.5rem]">
            {forgot ? (
              <ForgotPassword onClick={() => setForgot(false)} />
            ) : (
              <>
                <Image
                  className="mx-auto mb-2 h-auto w-48 2xl:mb-8 2xl:w-80"
                  src="/logos/logo.png"
                  width={1000}
                  height={500}
                  alt=""
                />
                <div>
                  <div className="mb-2 flex rounded-md bg-stone-800 p-1 2xl:mb-8">
                    <div
                      onClick={() => setSelectedStep(0)}
                      className={cn(
                        "flex h-10 w-1/2 cursor-pointer items-center justify-center rounded-md transition-colors outline-none",
                        selectedStep === 0 && "bg-stone-700 font-semibold",
                      )}
                    >
                      Entrar
                    </div>
                    <div
                      onClick={() => setSelectedStep(1)}
                      className={cn(
                        "flex h-10 w-1/2 cursor-pointer items-center justify-center rounded-md transition-colors outline-none",
                        selectedStep === 1 && "bg-stone-700 font-semibold",
                      )}
                    >
                      Contrate Agora
                    </div>
                  </div>
                  <div>
                    <div className={cn("", selectedStep !== 0 && "hidden")}>
                      <SignIn onClick={() => setForgot(true)} />
                    </div>
                    <div className={cn("", selectedStep !== 1 && "hidden")}>
                      <CreateAccount />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
