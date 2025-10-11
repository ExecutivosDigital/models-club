import { HomeCard1 } from "./components/card-1";
import { HomeCard2 } from "./components/card-2";
import { HomeCard3 } from "./components/card-3";
import { HomeCard4 } from "./components/card-4";
import { HomeCard5 } from "./components/card-5";
import { HomeCard6 } from "./components/card-6";
import { HomeCard7 } from "./components/card-7";

export default function Home() {
  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <HomeCard1 />
      <HomeCard2 />
      <HomeCard3 />

      <HomeCard4 />
      <HomeCard5 />

      <HomeCard6 />
      <HomeCard7 />
    </div>
  );
}
