import { cn } from "@/utils/cn";

interface GenericCardProps {
  className?: string;
  children?: React.ReactNode;
}

export function GenericCard({ className, children }: GenericCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 overflow-hidden rounded-md bg-stone-900 p-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
