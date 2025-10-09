"use client";
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
        <div className="px-6 pt-6 pb-8">
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
              <main>{children}</main>
            </motion.div>
            <Sidebar />
          </>
        </div>
      </div>
    </>
  );
}
