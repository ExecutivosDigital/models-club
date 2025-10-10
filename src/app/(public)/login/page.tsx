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
      <div className="relative flex h-screen overflow-x-hidden md:px-4 md:pt-16 md:pb-10 lg:p-6">
        <div className="relative my-6 flex w-full max-w-[45rem] xl:max-w-[30rem] xl:p-10 2xl:max-w-[40rem]">
          <Image
            className="mx-auto block h-full w-auto rounded-[1.25rem] object-contain"
            src="/static/login.gif"
            alt=""
            width={1000}
            height={1000}
          />
        </div>
        <div className="bg-n-1 bg-n-8 relative my-6 mr-6 flex grow rounded-[1.25rem] p-10 md:p-0 md:px-2 lg:m-0">
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
                  <div className="bg-n-2 mb-8 flex rounded-xl bg-[#151718] p-1">
                    <div
                      onClick={() => setSelectedStep(0)}
                      className="base2 text-n-4 hover:text-n-7 ui-selected:bg-n-1 ui-selected:text-n-7 ui-selected:shadow-[0_0.125rem_0.125rem_rgba(0,0,0,0.07),inset_0_0.25rem_0.125rem_#FFFFFF] tap-highlight-color hover:text-n-1 ui-selected:bg-secondary-1 ui-selected:text-n-1 ui-selected:shadow-[0_0.125rem_0.125rem_rgba(0,0,0,0.07),inset_0_0.0625rem_0.125rem_rgba(255,255,255,0.02)] h-10 basis-1/2 rounded-[0.625rem] font-semibold transition-colors outline-none"
                    >
                      Entrar
                    </div>
                    <div
                      onClick={() => setSelectedStep(1)}
                      className="base2 text-n-4 hover:text-n-7 ui-selected:bg-n-1 ui-selected:text-n-7 ui-selected:shadow-[0_0.125rem_0.125rem_rgba(0,0,0,0.07),inset_0_0.25rem_0.125rem_#FFFFFF] tap-highlight-color hover:text-n-1 ui-selected:bg-secondary-1 ui-selected:text-n-1 ui-selected:shadow-[0_0.125rem_0.125rem_rgba(0,0,0,0.07),inset_0_0.0625rem_0.125rem_rgba(255,255,255,0.02)] h-10 basis-1/2 rounded-[0.625rem] font-semibold transition-colors outline-none"
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
