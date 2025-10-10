import { GenericCard } from "@/components/ui/card";

export default function Models() {
  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <GenericCard className="h-40 xl:col-span-1" />
      <GenericCard className="h-40 xl:col-span-1" />
      <GenericCard className="h-40 xl:col-span-1" />

      <GenericCard className="h-40 xl:col-span-2" />
      <GenericCard className="h-40 xl:col-span-1" />

      <GenericCard className="h-96 xl:col-span-3" />

      <GenericCard className="h-96 xl:col-span-3" />

      <GenericCard className="h-96 xl:col-span-3" />

      <GenericCard className="h-20 xl:col-span-3" />
    </div>
  );
}
