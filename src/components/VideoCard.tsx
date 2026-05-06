import { CirclePlay } from 'lucide-react';

export const VideoCard = ({
  src,
  poster,
  caption,
  className = '',
}: {
  src: string;
  poster?: string;
  caption: string;
  className?: string;
}) => (
  <figure className={`relative overflow-hidden rounded-[2rem] border border-white/10 ${className}`}>
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      className="h-full w-full object-cover"
    >
      <source src={src} type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
      <div className="max-w-[16rem] text-sm leading-6 text-white/80">{caption}</div>
      <CirclePlay className="h-6 w-6 text-white/70" />
    </div>
  </figure>
);
