"use client";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { useState } from "react";
import SignIn from "./components/login";
import CreateAccount from "./components/register";

export default function Login() {
  const [selectedStep, setSelectedStep] = useState(0);
  const [forgot, setForgot] = useState<boolean>(false);

  return (
    <>
      <div className="relative flex h-[100svh] overflow-x-hidden md:px-4 md:pt-16 md:pb-10 lg:p-6">
        <div className="relative my-6 hidden w-full max-w-[45rem] lg:flex xl:max-w-[30rem] xl:p-10 2xl:max-w-[40rem]">
          <Image
            className="mx-auto block h-full w-auto rounded-[1.25rem] object-contain"
            src="/static/login.gif"
            alt=""
            width={1000}
            height={1000}
          />
        </div>
        <div className="relative m-6 flex grow rounded-[1.25rem] bg-stone-900 p-2 md:p-0 md:px-2 lg:m-0">
          <div className="m-auto w-full max-w-[31.5rem]">
            {forgot ? (
              forgot
            ) : (
              // <ForgotPassword onClick={() => setForgot(false)} />
              <>
                <Image
                  className="mx-auto mb-8 w-80"
                  src="/logos/logo.png"
                  width={1000}
                  height={500}
                  alt=""
                />
                <div>
                  <div className="mb-8 flex rounded-md bg-stone-800 p-1">
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
