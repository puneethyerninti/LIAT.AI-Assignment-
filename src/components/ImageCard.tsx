export const ImageCard = ({
  src,
  alt,
  className = '',
  caption,
}: {
  src: string;
  alt: string;
  className?: string;
  caption?: string;
}) => (
  <figure className={`relative overflow-hidden rounded-[2rem] border border-white/10 ${className}`}>
    <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
    {caption ? (
      <figcaption className="absolute bottom-0 left-0 right-0 p-5 text-sm text-white/80">
        {caption}
      </figcaption>
    ) : null}
  </figure>
);
