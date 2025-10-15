import { cn } from "@/utils/cn";

interface GenericCardProps {
  className?: string;
  isLoading?: boolean;
  children?: React.ReactNode;
}

export function GenericCard({
  className,
  isLoading,
  children,
}: GenericCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-2 overflow-hidden rounded-md bg-stone-900 p-4",
        className,
      )}
    >
      <>
        {isLoading ? (
          <div
            className={cn(
              "absolute top-0 left-0 z-10 h-full w-full bg-neutral-900 transition duration-100",
              isLoading && "animate-pulse opacity-100",
              !isLoading && "pointer-events-none opacity-0",
            )}
          />
        ) : (
          <>{children}</>
        )}
      </>
    </div>
  );
}
