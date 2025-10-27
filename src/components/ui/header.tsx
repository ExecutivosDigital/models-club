"use client";
import { useSidebar } from "@/store";
import { cn } from "@/utils/cn";
import { Pages } from "@/utils/menus";
import { LogOut, Menu } from "lucide-react";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export function Header() {
  const { mobileMenu, setMobileMenu } = useSidebar();
  const path = usePathname();
  const router = useRouter();
  const cookies = useCookies();

  return (
    <header className="z-50 bg-stone-900">
      <div className="w-full border-b border-b-stone-800 px-[15px] py-3 backdrop-blur-lg md:px-6">
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center">
            <div
              onClick={() => router.push("/")}
              className="text-primary hidden items-center xl:flex"
            >
              <Image
                src="/logos/logo.png"
                alt=""
                quality={100}
                width={1250}
                height={500}
                className="h-10 w-max object-contain"
              />
            </div>
            <div
              onClick={() => setMobileMenu(!mobileMenu)}
              className="text-primary flex items-center xl:hidden"
            >
              <Image
                src="/logos/logo.png"
                alt=""
                quality={100}
                width={1250}
                height={500}
                className="h-10 w-max object-contain"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 ltr:pl-2 rtl:pr-2">
              <div className="flex items-center">
                <Image
                  alt=""
                  src="/logos/icon.png"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
              </div>
              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="hover:bg-primary-100 hover:text-primary relative h-6 w-6 xl:hidden"
              >
                <Menu />
              </button>
              <LogOut
                onClick={() => {
                  if (confirm("Tem certeza que deseja sair?")) {
                    cookies.remove(
                      process.env.NEXT_PUBLIC_USER_TOKEN as string,
                    );
                    router.push("/login");
                  }
                }}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden w-full px-6 shadow-md xl:block">
        <div>
          <div className="group relative flex justify-start">
            <div className="group flex list-none gap-2">
              {Pages.map((item, index) => (
                <div
                  key={`item-${index}`}
                  className="relative"
                  onClick={() => router.push(item.route)}
                >
                  <div
                    className={cn(
                      "group data-[state=open]:text-primary flex cursor-pointer items-center gap-2 px-6 py-4",
                      ((item.route === "/" && path === "/") ||
                        item.route === path ||
                        (item.route !== "/" && path.includes(item.route))) &&
                        "border-primary from-primary/5 via-primary/30 to-primary/5 border-t-2 bg-gradient-to-r",
                    )}
                  >
                    <Image
                      src={`/icons/${item.icon}.svg`}
                      alt=""
                      width={20}
                      height={20}
                    />
                    <span className="text-sm font-medium">{item.title}</span>
                  </div>
                  {path !== item.route && (
                    <div className="hover:border-b-primary/50 absolute top-0 left-0 h-full w-full cursor-pointer border-b border-transparent transition duration-200" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
