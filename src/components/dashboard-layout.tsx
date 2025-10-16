"use client";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";
import { Header } from "./ui/header";
import { Sidebar } from "./ui/sidebar";

export function DashBoardLayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = usePathname();

  return (
    <>
      <Header />
      <div className="transition-all duration-150">
        <div
          className={cn(
            "px-6 pt-6 pb-8",
            location.includes("/courses/") && "p-0",
            location === "/models" && "pb-0",
          )}
        >
          <>
            <motion.div
              key={location}
              initial="pageInitial"
              animate="pageAnimate"
              exit="pageExit"
              variants={{
                pageInitial: {
                  opacity: 0,
                  y: 50,
                },
                pageAnimate: {
                  opacity: 1,
                  y: 0,
                },
                pageExit: {
                  opacity: 0,
                  y: -50,
                },
              }}
              transition={{
                type: "tween",
                ease: "easeInOut",
                duration: 0.5,
              }}
            >
              <main
                className={cn(
                  "mx-auto max-w-[1280px]",
                  location.includes("/courses/") && "max-w-full",
                )}
              >
                {children}
              </main>
            </motion.div>
            <Sidebar />
          </>
        </div>
      </div>
    </>
  );
}
