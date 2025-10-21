import { AnalyticsCard1 } from "./components/card-1";
import { AnalyticsCard2 } from "./components/card-2";
import { AnalyticsCard3 } from "./components/card-3";

export default function Analytics() {
  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <AnalyticsCard1 />
      <AnalyticsCard2 />
      <AnalyticsCard3 />
    </div>
  );
}
