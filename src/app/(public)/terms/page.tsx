"use client";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";

export default function Terms() {
  return (
    <div className="mx-auto flex h-full min-h-screen w-full max-w-[1280px] flex-col gap-2 p-2 pb-8 text-sm text-white">
      <div className="relative flex w-full items-center justify-center bg-stone-800 py-2">
        <ChevronLeft
          onClick={() => window.history.back()}
          className="absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer text-white"
        />
        <Image
          src="/logos/logo.png"
          alt=""
          width={1000}
          height={500}
          className="h-16 w-max object-contain"
        />
      </div>
      <span className="mx-auto w-max text-lg font-bold">
        Termos de Serviço - Model Club SpicyAI
      </span>
      <span className="font-semibold">1. Termos</span>
      <span>
        Ao acessar ao site Model Club SpicyAI, concorda em cumprir estes termos
        de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é
        responsável pelo cumprimento de todas as leis locais aplicáveis. Se você
        não concordar com algum desses termos, está proibido de usar ou acessar
        este site. Os materiais contidos neste site são protegidos pelas leis de
        direitos autorais e marcas comerciais aplicáveis.
      </span>
      <span className="font-semibold">2. Uso de Licença</span>
      <span>
        É concedida permissão para baixar temporariamente uma cópia dos
        materiais (informações ou software) no site Model Club SpicyAI, apenas
        para visualização transitória pessoal e não comercial. Esta é a
        concessão de uma licença, não uma transferência de título e, sob esta
        licença, você não pode:
      </span>
      <span className="pl-4">a{")"} modificar ou copiar os materiais;</span>
      <span className="pl-4">
        b{")"} usar os materiais para qualquer finalidade comercial ou para
        exibição pública (comercial ou não comercial);
      </span>
      <span className="pl-4">
        c{")"} tentar descompilar ou fazer engenharia reversa de qualquer
        software contido no site Model Club SpicyAI;
      </span>
      <span className="pl-4">
        d{")"} remover quaisquer direitos autorais ou outras notações de
        propriedade dos materiais; ou
      </span>
      <span className="pl-4">
        e{")"} transferir os materiais para outra pessoa ou {"'"}espelhe{"'"} os
        materiais em qualquer outro servidor.
      </span>
      <span>
        Esta licença será automaticamente rescindida se você violar alguma
        dessas restrições e poderá ser rescindida por Model Club SpicyAI a
        qualquer momento. Ao encerrar a visualização desses materiais ou após o
        término desta licença, você deve apagar todos os materiais baixados em
        sua posse, seja em formato eletrônico ou impresso.
      </span>
      <span className="font-semibold">3. Isenção de responsabilidade</span>
      <span>
        Os materiais no site da Model Club SpicyAI são fornecidos {"'"}como
        estão{"'"}. Model Club SpicyAI não oferece garantias, expressas ou
        implícitas, e, por este meio, isenta e nega todas as outras garantias,
        incluindo, sem limitação, garantias implícitas ou condições de
        comercialização, adequação a um fim específico ou não violação de
        propriedade intelectual ou outra violação de direitos.
      </span>
      <span>
        Além disso, o Model Club SpicyAI não garante ou faz qualquer
        representação relativa à precisão, aos resultados prováveis ​​ou à
        confiabilidade do uso dos materiais em seu site ou de outra forma
        relacionado a esses materiais ou em sites vinculados a este site.
      </span>
      <span className="font-semibold">4. Limitações</span>
      <span>
        Em nenhum caso o Model Club SpicyAI ou seus fornecedores serão
        responsáveis ​​por quaisquer danos (incluindo, sem limitação, danos por
        perda de dados ou lucro ou devido a interrupção dos negócios)
        decorrentes do uso ou da incapacidade de usar os materiais em Model Club
        SpicyAI, mesmo que Model Club SpicyAI ou um representante autorizado da
        Model Club SpicyAI tenha sido notificado oralmente ou por escrito da
        possibilidade de tais danos. Como algumas jurisdições não permitem
        limitações em garantias implícitas, ou limitações de responsabilidade
        por danos consequentes ou incidentais, essas limitações podem não se
        aplicar a você.
      </span>
      <span className="font-semibold">5. Precisão dos materiais</span>
      <span>
        Os materiais exibidos no site da Model Club SpicyAI podem incluir erros
        técnicos, tipográficos ou fotográficos. Model Club SpicyAI não garante
        que qualquer material em seu site seja preciso, completo ou atual. Model
        Club SpicyAI pode fazer alterações nos materiais contidos em seu site a
        qualquer momento, sem aviso prévio. No entanto, Model Club SpicyAI não
        se compromete a atualizar os materiais.
      </span>
      <span className="font-semibold">6. Links</span>
      <span>
        O Model Club SpicyAI não analisou todos os sites vinculados ao seu site
        e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão
        de qualquer link não implica endosso por Model Club SpicyAI do site. O
        uso de qualquer site vinculado é por conta e risco do usuário.
      </span>
      <span className="font-semibold">7. Modificações</span>
      <span>
        O Model Club SpicyAI pode revisar estes termos de serviço do site a
        qualquer momento, sem aviso prévio. Ao usar este site, você concorda em
        ficar vinculado à versão atual desses termos de serviço.
      </span>
      <span className="font-semibold">8. Lei aplicável</span>
      <span>
        Estes termos e condições são regidos e interpretados de acordo com as
        leis do Model Club SpicyAI e você se submete irrevogavelmente à
        jurisdição exclusiva dos tribunais naquele estado ou localidade.
      </span>
    </div>
  );
}
