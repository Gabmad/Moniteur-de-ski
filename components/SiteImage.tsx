import Image from "next/image";
import { BLUR_DATA_URL, photos, type PhotoId } from "@/lib/photos";

type SiteImageProps = {
  id: PhotoId;
  alt: string;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  showId?: boolean;
};

export default function SiteImage({
  id,
  alt,
  fill = false,
  className = "",
  priority = false,
  sizes,
  showId = true,
}: SiteImageProps) {
  const photo = photos[id];

  const image = (
    <Image
      src={photo.src}
      alt={alt || id}
      fill={fill}
      width={fill ? undefined : photo.width}
      height={fill ? undefined : photo.height}
      className={fill ? `object-cover ${className}` : className}
      priority={priority}
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      sizes={sizes ?? (fill ? "100vw" : undefined)}
    />
  );

  if (fill) {
    return (
      <>
        {image}
        {showId && <span className="photo-label">[{id}]</span>}
      </>
    );
  }

  return (
    <span className="relative inline-block">
      {image}
      {showId && <span className="photo-label">[{id}]</span>}
    </span>
  );
}
