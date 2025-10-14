"use client";

import { CourseCard } from "./components/course-card";

export interface ClassPreviewProps {
  id: string;
  image: string;
  tag: string;
  title: string;
  description: string;
  seen: boolean;
}

export interface CoursePreviewProps {
  id: string;
  title: string;
  classes: ClassPreviewProps[];
}

export default function Courses() {
  const Courses: CoursePreviewProps[] = [
    {
      id: "1",
      title: "Bem Vindos",
      classes: [
        {
          id: "1",
          image: "/static/placeholder-thumbnail-1.png",
          tag: "Obrigatório*",
          title: "Bem Vindos",
          description:
            "Visão geral da plataforma e das oportunidades de criar e vender conteúdo +18 com IA.",
          seen: true,
        },
        {
          id: "2",
          image: "/static/placeholder-thumbnail-2.png",
          tag: "Obrigatório*",
          title: "Criar minha Modelo",
          description:
            "Passo a passo para desenvolver e personalizar sua própria personagem de IA.",
          seen: true,
        },
        {
          id: "3",
          image: "/static/placeholder-thumbnail-3.png",
          tag: "Obrigatório*",
          title: "Como receber?",
          description:
            "Aprenda a configurar formas de pagamento e organizar seus ganhos com segurança.",
          seen: false,
        },
        {
          id: "4",
          image: "/static/placeholder-thumbnail-4.png",
          tag: "Obrigatório*",
          title: "Key da IA",
          description:
            "Entenda o que é a chave da IA, como gerar e usar para liberar acessos e integrações.",
          seen: false,
        },
      ],
    },
    {
      id: "2",
      title: "Criar minha Modelo",
      classes: [
        {
          id: "1",
          image: "/static/placeholder-thumbnail-1.png",
          tag: "Obrigatório*",
          title: "Bem Vindos",
          description:
            "Visão geral da plataforma e das oportunidades de criar e vender conteúdo +18 com IA.",
          seen: true,
        },
        {
          id: "2",
          image: "/static/placeholder-thumbnail-2.png",
          tag: "Obrigatório*",
          title: "Criar minha Modelo",
          description:
            "Passo a passo para desenvolver e personalizar sua própria personagem de IA.",
          seen: true,
        },
        {
          id: "3",
          image: "/static/placeholder-thumbnail-3.png",
          tag: "Obrigatório*",
          title: "Como receber?",
          description:
            "Aprenda a configurar formas de pagamento e organizar seus ganhos com segurança.",
          seen: false,
        },
        {
          id: "4",
          image: "/static/placeholder-thumbnail-4.png",
          tag: "Obrigatório*",
          title: "Key da IA",
          description:
            "Entenda o que é a chave da IA, como gerar e usar para liberar acessos e integrações.",
          seen: false,
        },
      ],
    },
  ];
  return (
    <div className="grid gap-6 xl:grid-cols-3">
      {Courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
