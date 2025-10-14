import { GenericCard } from "@/components/ui/card";
import Image from "next/image";

export function AdminCard3() {
  return (
    <GenericCard className="relative h-max rounded-3xl p-0 text-white xl:col-span-1 xl:justify-between">
      <Image
        src="/static/card-template.png"
        alt=""
        width={1500}
        height={500}
        quality={100}
        className="h-full w-full rounded-md object-cover"
      />
      <span className="absolute top-1/2 left-[5%] -translate-y-1/2 text-xl font-bold">
        3234 8678 4234 7628
      </span>
      <span className="absolute bottom-[10%] left-[5%] max-w-[45%] truncate font-bold">
        GABRIEL ANTÔNIO TESTE TESTE
      </span>
      <span className="absolute bottom-[10%] left-[55%] font-bold">08/24</span>
    </GenericCard>
  );
}
