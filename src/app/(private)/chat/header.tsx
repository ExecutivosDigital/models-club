"use client";

export function ChatHeader() {
  return (
    <>
      <header className="sticky top-0 z-20 flex w-full flex-col justify-between backdrop-blur-sm xl:flex-row xl:items-center">
        <span className="w-full text-center xl:w-max xl:text-start">
          Converse com a IA e teste as Respostas
        </span>
        <button className="from-primary to-secondary ml-auto flex h-max items-center gap-1 rounded-md bg-gradient-to-br px-2 py-0.5 font-semibold text-white xl:ml-0 xl:w-auto">
          <span className="flex items-center gap-1">
            Alterar
            <span className="hidden xl:block"> Inteligência Artificial</span>
            <span className="xl:hidden"> I.A.</span>
          </span>
        </button>
      </header>
      {/* {selectedChat && openQrCode && (
        <PixSheetSteps
          open={openQrCode}
          onClose={() => setOpenQrCode(false)}
          modelId={selectedChat.model.id}
          modelName={selectedChat?.model.name}
          modelPhoto={selectedChat?.model.photoUrl}
        />
      )} */}
    </>
  );
}
