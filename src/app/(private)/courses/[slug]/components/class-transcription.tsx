export function ClassTranscription() {
  return (
    <>
      <span className="text-lg font-bold">Transcrição</span>
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="flex w-full gap-2 rounded-md p-2 hover:bg-stone-700"
        >
          <span className="text-sm text-neutral-500">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry{"'"}s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </span>
        </div>
      ))}
    </>
  );
}
