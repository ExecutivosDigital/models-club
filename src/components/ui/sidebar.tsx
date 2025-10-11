"use client";
import { useSidebar } from "@/store";
import { cn } from "@/utils/cn";
import { Pages } from "@/utils/menus";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export function Sidebar() {
  const { mobileMenu, setMobileMenu } = useSidebar();
  const path = usePathname();
  const router = useRouter();

  return (
    <>
      <div
        className={cn(
          "fixed top-0 left-0 z-[9999] h-screen w-[248px] -translate-x-full transition duration-300 ease-in xl:w-[calc(100%-450px)]",
          !mobileMenu && "transparent pointer-events-none",
          mobileMenu && "translate-x-0 bg-stone-900 backdrop-blur",
        )}
      >
        <div className="px-4 py-4">
          <div className="flex items-center">
            <div className="flex flex-1 items-center justify-center gap-x-3">
              <Image
                src="/logos/logo.png"
                alt=""
                width={1250}
                height={500}
                className="h-min w-full object-contain"
              />
            </div>
          </div>
        </div>
        <div className="sidebar-menu h-[calc(100%-80px)] overflow-y-scroll">
          {Pages.map((item, index) => (
            <div
              key={`item-${index}`}
              className="relative"
              onClick={() => {
                router.push(item.route);
                setMobileMenu(false);
              }}
            >
              <div
                className={cn(
                  "group data-[state=open]:text-primary flex cursor-pointer items-center gap-2 px-6 py-4",
                  path === item.route &&
                    "border-primary from-primary/5 via-primary/30 to-primary/5 border-t-2 bg-gradient-to-r from-0% to-100% backdrop-blur backdrop-filter",
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
      {mobileMenu && (
        <div
          onClick={() => setMobileMenu(false)}
          className="overlay fixed inset-0 z-[999] bg-black/60 opacity-100 backdrop-blur-sm backdrop-filter"
        />
      )}
    </>
  );
}
