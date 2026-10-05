import Image from "next/image";

// Who gave an award: the publication's logo in white, so every mark reads as one set on the dark sheets
// whatever its own colours; without a logo, its name in bold, standing on the same line as the logos.
export default function Outlet({ who, logo, className = "" }: { who: string; logo?: string; className?: string }) {
  if (!logo) return <p className={`t-body flex h-[clamp(30px,4svh,40px)] items-end font-bold text-bone ${className}`}>{who}</p>;
  return (
    <Image
      src={logo}
      alt={who}
      width={240}
      height={80}
      unoptimized
      className={`h-[clamp(30px,4svh,40px)] w-auto max-w-[200px] object-contain object-left opacity-90 [filter:brightness(0)_invert(1)] ${className}`}
    />
  );
}
