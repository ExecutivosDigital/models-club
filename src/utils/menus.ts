export interface PagesProps {
  title: string;
  icon: string;
  route: string;
}

export const Pages = [
  {
    title: "Home",
    icon: "home",
    route: "/",
  },
  {
    title: "Analytics",
    icon: "analytics",
    route: "/analytics",
  },
  {
    title: "Aulas",
    icon: "classes",
    route: "/classes",
  },
  {
    title: "Modelo",
    icon: "placeholder",
    route: "/model",
  },
  {
    title: "Administrativo",
    icon: "placeholder",
    route: "/adm",
  },
  {
    title: "Testar IA",
    icon: "placeholder",
    route: "/ai",
  },
];
