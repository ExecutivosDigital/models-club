import { ModelCard1 } from "./components/card-1";
import { ModelCard10 } from "./components/card-10";
import { ModelCard2 } from "./components/card-2";
import { ModelCard3 } from "./components/card-3";
import { ModelCard4 } from "./components/card-4";
import { ModelCard5 } from "./components/card-5";
import { ModelCard6 } from "./components/card-6";
import { ModelCard7 } from "./components/card-7";
import { ModelCard8 } from "./components/card-8";
import { ModelCard9 } from "./components/card-9";

export default function Models() {
  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <ModelCard1 />
      <ModelCard2 />
      <ModelCard3 />
      <ModelCard4 />
      <ModelCard5 />
      <ModelCard6 />
      <ModelCard7 />
      <ModelCard8 />
      <ModelCard9 />
      <ModelCard10 />
    </div>
  );
}
