// Função para converter URL do YouTube para formato de embed
export function convertToEmbedUrl(youtubeUrl: string): string {
  // Verifica se já está no formato de embed
  if (youtubeUrl.includes("/embed/")) {
    return youtubeUrl;
  }

  // Extrai o ID do vídeo de diferentes formatos de URL do YouTube
  let videoId = "";

  // Formato: https://www.youtube.com/watch?v=VIDEO_ID
  if (youtubeUrl.includes("watch?v=")) {
    videoId = youtubeUrl.split("v=")[1]?.split("&")[0] || "";
  }
  // Formato: https://youtu.be/VIDEO_ID
  else if (youtubeUrl.includes("youtu.be/")) {
    videoId = youtubeUrl.split("youtu.be/")[1]?.split("?")[0] || "";
  }
  // Formato: https://www.youtube.com/embed/VIDEO_ID
  else if (youtubeUrl.includes("/embed/")) {
    videoId = youtubeUrl.split("/embed/")[1]?.split("?")[0] || "";
  }

  // Se não conseguiu extrair o ID, retorna a URL original
  if (!videoId) {
    return youtubeUrl;
  }

  // Retorna a URL no formato de embed
  return `https://www.youtube.com/embed/${videoId}`;
}
