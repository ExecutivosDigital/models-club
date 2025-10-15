"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/blocks/dropdown-menu";
import { GenericCard } from "@/components/ui/card";
import { FileUploadInput } from "@/components/ui/file-upload-input";
import { VideoCard } from "@/components/ui/video-card";
import { useApiContext } from "@/context/ApiContext";
import {
  PhotoProps,
  useModelContext,
  VideoProps,
} from "@/context/ModelContext";
import { cn } from "@/utils/cn";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";

interface MediaProps {
  photos: PhotoProps[];
  videos: VideoProps[];
}

interface GalleryItemProps {
  src: string;
  id: string;
  type: "photo" | "video";
  isFreeAvailable: boolean;
  poster?: string;
}

export function ModelCard6() {
  const { PostAPI, DeleteAPI } = useApiContext();
  const { selectedModel, newModelData, setNewModelData, isGettingModels } =
    useModelContext();
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [media, setMedia] = useState<MediaProps>({
    photos: [],
    videos: [],
  });
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [viewAll, setViewAll] = useState(false);

  function toGalleryItems(m: MediaProps): GalleryItemProps[] {
    const photos: GalleryItemProps[] = m.photos.map((p) => ({
      src: p.photoUrl,
      id: p.id,
      isFreeAvailable: p.isFreeAvailable,
      type: "photo",
    }));
    const videos: GalleryItemProps[] = m.videos.map((v) => ({
      src: v.videoUrl,
      id: v.id,
      isFreeAvailable: v.isFreeAvailable,
      type: "video",
    }));

    // interleave opcional
    const out: GalleryItemProps[] = [];
    let i = 0,
      j = 0;
    while (i < photos.length || j < videos.length) {
      if (i < photos.length) out.push(photos[i++]);
      if (j < videos.length) out.push(videos[j++]);
    }
    return out;
  }

  const allMediaItems = useMemo(() => toGalleryItems(media), [media]);

  const freeMedia = useMemo(() => {
    return allMediaItems.filter((m) => m.isFreeAvailable);
  }, [allMediaItems]);

  async function HandleUploadMedia(
    type: "photo" | "video",
    url: string,
    isFreeAvailable: boolean,
  ) {
    if (selectedModel) {
      const upload = await PostAPI(
        `${type}`,
        {
          photoUrl: url,
          videoUrl: url,
          isFreeAvailable,
          modelId: selectedModel.id,
        },
        true,
      );
      if (upload.status === 200) {
        toast.success("Upload realizado com sucesso!");
        setMedia((prev) => {
          if (type === "photo") {
            return {
              ...prev,
              photos: [
                ...prev.photos,
                {
                  id: upload.body.photo.id as string,
                  photoUrl: upload.body.photo.photoUrl,
                  isFreeAvailable,
                  modelId: selectedModel.id as string,
                },
              ],
            };
          } else {
            return {
              ...prev,
              videos: [
                ...prev.videos,
                {
                  id: upload.body.video.id as string,
                  videoUrl: upload.body.video.videoUrl,
                  isFreeAvailable,
                  modelId: selectedModel.id as string,
                },
              ],
            };
          }
        });
        return;
      }
      toast.error(upload.body.message);
    }
  }

  async function HandleDeleteMedia(type: "photo" | "video", id: string) {
    setIsDeleting(id);
    if (selectedModel) {
      const deleted = await DeleteAPI(`${type}/${id}`, true);
      if (deleted.status === 200) {
        toast.success("Mídia excluída com sucesso!");
        setMedia((prev) => {
          if (type === "photo") {
            return {
              ...prev,
              photos: prev.photos.filter((p) => p.id !== id),
            };
          } else {
            return {
              ...prev,
              videos: prev.videos.filter((p) => p.id !== id),
            };
          }
        });
        return setIsDeleting(null);
      }
      toast.error(deleted.body.message);
      return setIsDeleting(null);
    }
  }

  useEffect(() => {
    if (selectedModel) {
      setMedia({
        photos: selectedModel.photos,
        videos: selectedModel.videos,
      });
    } else {
      setMedia({
        photos: [],
        videos: [],
      });
    }
  }, [selectedModel]);

  console.log("media: ", media);

  return (
    <GenericCard
      className="h-full min-h-60 xl:col-span-3 xl:min-h-[26rem]"
      isLoading={isGettingModels}
    >
      <div className="flex w-full flex-col justify-between xl:flex-row xl:items-center">
        <span className="text-lg font-semibold text-zinc-200">
          Inserir Mídias Gratuitas
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewAll(!viewAll)}
            className={cn(
              "hidden h-8 rounded-md bg-zinc-700 px-4 font-semibold",
              freeMedia.length <= 16 ? "xl:hidden" : "xl:block",
            )}
          >
            Ver Todas
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="h-8 rounded-md bg-zinc-700 px-4 font-semibold">
                Adicionar Mídia
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <>
                  <FileUploadInput
                    isUploading={isUploadingPhoto}
                    setIsUploading={setIsUploadingPhoto}
                    isUploaded={false}
                    handleUpload={(url, fullUrl) => {
                      if (selectedModel) {
                        HandleUploadMedia("photo", url, true);
                      } else {
                        setMedia((prev) => ({
                          ...prev,
                          photos: [
                            ...prev.photos,
                            {
                              id: "",
                              photoUrl: fullUrl,
                              isFreeAvailable: true,
                              modelId: "",
                            },
                          ],
                        }));
                        if (newModelData) {
                          setNewModelData({
                            ...newModelData,
                            photos: [
                              ...newModelData.photos,
                              {
                                id: "",
                                photoUrl: fullUrl,
                                isFreeAvailable: true,
                                modelId: "",
                              },
                            ],
                          });
                        }
                      }
                    }}
                    title="Fotos"
                  />
                </>
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <>
                  <FileUploadInput
                    isUploading={isUploadingVideo}
                    setIsUploading={setIsUploadingVideo}
                    isUploaded={false}
                    handleUpload={(url, fullUrl) => {
                      if (selectedModel) {
                        HandleUploadMedia("video", url, true);
                      } else {
                        setMedia((prev) => ({
                          ...prev,
                          videos: [
                            ...prev.videos,
                            {
                              id: "",
                              videoUrl: fullUrl,
                              isFreeAvailable: true,
                              modelId: "",
                            },
                          ],
                        }));
                        if (newModelData) {
                          setNewModelData({
                            ...newModelData,
                            videos: [
                              ...newModelData.videos,
                              {
                                id: "",
                                videoUrl: fullUrl,
                                isFreeAvailable: true,
                                modelId: "",
                              },
                            ],
                          });
                        }
                      }
                    }}
                    title="Vídeos"
                  />
                </>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="w-full xl:hidden">
        <Swiper
          spaceBetween={10}
          slidesPerView={freeMedia.length !== 0 ? "auto" : 1}
          className="w-full"
        >
          {isGettingModels ? (
            <>
              {Array.from({ length: 16 }).map((_, index) => (
                <SwiperSlide key={index}>
                  <div className="flex h-28 w-28 cursor-pointer flex-col justify-between gap-2 rounded-md transition duration-200 hover:bg-stone-900" />{" "}
                </SwiperSlide>
              ))}
            </>
          ) : !isGettingModels && freeMedia.length !== 0 ? (
            freeMedia.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="flex h-full max-w-28 cursor-pointer flex-col justify-between gap-2 rounded-md transition duration-200 hover:bg-stone-900">
                  {item.type === "photo" ? (
                    <Image
                      src={item.src}
                      alt=""
                      width={500}
                      height={500}
                      className="aspect-square w-full rounded-md object-cover"
                    />
                  ) : (
                    <VideoCard src={item.src} />
                  )}
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => {
                        if (
                          confirm("Tem certeza que deseja excluir esta mídia?")
                        ) {
                          HandleDeleteMedia(item.type, item.id);
                        }
                      }}
                      disabled={isDeleting === item.id}
                      className="flex h-8 w-8 items-center justify-center rounded-md border border-red-600 bg-stone-950 text-red-600"
                    >
                      {isDeleting === item.id ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <Image
                          src="/icons/trash.svg"
                          alt=""
                          width={100}
                          height={100}
                          className="h-max w-4 object-contain"
                        />
                      )}
                    </button>
                    <div className="flex h-8 w-8 items-center justify-center rounded-md border border-white bg-stone-950 text-white">
                      <Image
                        src="/icons/resize.svg"
                        alt=""
                        width={100}
                        height={100}
                        className="h-max w-4 object-contain"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            !isGettingModels &&
            freeMedia.length === 0 && (
              <span className="flex h-28 w-full items-center justify-center text-center text-xl font-bold text-white">
                Nenhuma Mídia Inserida
              </span>
            )
          )}
        </Swiper>
      </div>
      <div
        className={cn(
          "hidden h-[22rem] w-full items-center justify-between justify-items-center gap-x-2 gap-y-4 transition duration-200 xl:grid xl:grid-cols-8",
          viewAll && "h-full",
        )}
      >
        {isGettingModels ? (
          <>
            {Array.from({ length: 16 }).map((_, index) => (
              <div
                key={index}
                className="flex h-max w-32 cursor-pointer flex-col justify-between gap-2 rounded-md"
              />
            ))}
          </>
        ) : !isGettingModels && freeMedia.length !== 0 ? (
          freeMedia.map((item) => (
            <div
              key={item.id}
              className="flex h-max w-32 cursor-pointer flex-col justify-between gap-2 rounded-md"
            >
              {item.type === "photo" ? (
                <Image
                  src={item.src}
                  alt=""
                  width={500}
                  height={500}
                  className="aspect-square w-full rounded-md object-cover"
                />
              ) : (
                <VideoCard src={item.src} />
              )}
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => {
                    if (confirm("Tem certeza que deseja excluir esta mídia?")) {
                      HandleDeleteMedia(item.type, item.id);
                    }
                  }}
                  disabled={isDeleting === item.id}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-red-600 bg-stone-950 text-red-600"
                >
                  {isDeleting === item.id ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Image
                      src="/icons/trash.svg"
                      alt=""
                      width={100}
                      height={100}
                      className="h-max w-4 object-contain"
                    />
                  )}
                </button>
                <div className="flex h-8 w-8 items-center justify-center rounded-md border border-white bg-stone-950 text-white">
                  <Image
                    src="/icons/resize.svg"
                    alt=""
                    width={100}
                    height={100}
                    className="h-max w-4 object-contain"
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          !isGettingModels &&
          freeMedia.length === 0 && (
            <span className="flex h-full w-full items-center justify-center text-center text-xl font-bold text-white xl:col-span-8">
              Nenhuma Mídia Inserida
            </span>
          )
        )}
      </div>
    </GenericCard>
  );
}
