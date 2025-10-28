"use client"; // Marca este componente como um Componente de Cliente

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

// Use o ID do seu Pixel aqui
const FB_PIXEL_ID = "1530331474831467";

// Declaração de tipo para a função fbq do Facebook
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

/**
 * Este componente carrega o script do Facebook Pixel
 * e usa um hook useEffect para rastrear TODAS as visualizações de página (PageViews),
 * incluindo a carga inicial e as navegações do lado do cliente.
 */
export const FacebookPixel = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Este hook rastreia todas as mudanças de rota
    if (!window.fbq) {
      // Se o fbq (função do pixel) ainda não estiver carregado, não faz nada.
      // Isso pode acontecer se o script ainda não baixou.
      console.warn("Facebook Pixel (fbq) not loaded yet.");
      return;
    }

    // Dispara o evento PageView para o pathname atual
    // Isso funcionará para a carga inicial e para todas as
    // navegações subsequentes no App Router.
    window.fbq("track", "PageView");
  }, [pathname]); // A dependência [pathname] garante que o hook rode a cada mudança de URL

  return (
    <Script id="fb-pixel-script" strategy="afterInteractive">
      {/* Este é o código de inicialização do Facebook.
        Note que removemos o fbq('track', 'PageView') daqui
        porque ele agora é tratado pelo hook useEffect acima.
      */}
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        
        fbq('init', '${FB_PIXEL_ID}');
      `}
    </Script>
  );
};
