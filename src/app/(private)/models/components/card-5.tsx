import { GenericCard } from "@/components/ui/card";
import Image from "next/image";

export function ModelCard5() {
  return (
    <GenericCard className="from-primary to-secondary h-max bg-gradient-to-br xl:col-span-1 xl:h-48">
      <Image
        src="/static/generic-model-1.png"
        alt=""
        width={1500}
        height={500}
        className="h-full w-full rounded-md object-cover"
      />
    </GenericCard>
  );
}
