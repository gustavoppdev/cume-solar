import Image from "next/image";
import { images, type ImageName } from "@/content/images";
import { cn } from "@/lib/utils";

type LandingImageProps = {
  name: ImageName;
  alt: string;
  sizes: string;
  className?: string;
  /** The above-the-fold image: fetched eagerly at high priority. */
  priority?: boolean;
};

export function LandingImage({ name, alt, sizes, className, priority = false }: LandingImageProps) {
  const slot = images[name];
  const frame = cn("relative overflow-hidden", className);
  const aspectRatio = slot.ratio.replace("/", " / ");

  if (!slot.src) {
    return (
      <div
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        data-placeholder={name}
        className={cn(frame, "bg-[repeating-linear-gradient(135deg,var(--muted)_0_12px,var(--secondary)_12px_24px)]")}
        style={{ aspectRatio }}
      />
    );
  }

  return (
    <div className={frame} style={{ aspectRatio }}>
      <Image
        src={slot.src}
        alt={alt}
        sizes={sizes}
        fill
        placeholder="blur"
        loading={priority ? "eager" : undefined}
        fetchPriority={priority ? "high" : undefined}
        quality={slot.role === "hero" ? 85 : 75}
        className="object-cover"
      />
    </div>
  );
}
