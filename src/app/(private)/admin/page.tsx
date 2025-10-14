import { AdminCard1 } from "./components/card-1";
import { AdminCard2 } from "./components/card-2";
import { AdminCard3 } from "./components/card-3";
import { AdminCard4 } from "./components/card-4";

export default function Admin() {
  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <AdminCard1 />
      <AdminCard2 />
      <AdminCard3 />
      <AdminCard4 />
    </div>
  );
}
