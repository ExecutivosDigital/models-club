import { GenericCard } from "@/components/ui/card";
import { HomeCard1 } from "./components/card-1";
import { HomeCard2 } from "./components/card-2";
import { HomeCard3 } from "./components/card-3";
import { HomeCard4 } from "./components/card-4";
import { HomeCard5 } from "./components/card-5";

export default function Home() {
  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <HomeCard1 />
      <HomeCard2 />
      <HomeCard3 />

      <HomeCard4 />
      <HomeCard5 />

      <GenericCard className="h-80 xl:col-span-3" />

      <GenericCard className="h-80 xl:col-span-3" />
    </div>
  );
}
