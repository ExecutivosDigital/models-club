import Image from "next/image";

export function Soon() {
  return (
    <>
      <div className="absolute top-0 left-0 z-10 h-full w-full bg-black/60" />
      <div className="pointer-events-none absolute top-0 left-0 z-20 flex h-full w-full flex-col items-center justify-center gap-2 bg-black/40 backdrop-blur-md">
        <Image
          src="/logos/logo.png"
          alt=""
          width={500}
          height={250}
          className="h-max w-2/3 max-w-96 object-contain"
        />
        <span className="text-2xl font-bold">Em Breve</span>
      </div>
    </>
  );
}
