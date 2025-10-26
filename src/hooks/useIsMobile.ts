// hooks/useIsMobile.ts
"use client";

import { useEffect, useState } from "react";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Definimos 768px como breakpoint para mobile
    };

    // Verifica inicialmente
    checkIsMobile();

    // Adiciona listener para redimensionamento da janela
    window.addEventListener("resize", checkIsMobile);

    // Limpa o listener quando o componente é desmontado
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return isMobile;
}
