import Image from "next/image";

// Who gave an award: the publication's logo in white, so every mark reads as one set on the dark sheets
// whatever its own colours; without a logo, its name in bold, standing on the same line as the logos.
// "plate" sets it large, centred on the press page's award cards.
export default function Outlet({ who, logo, plate = false }: { who: string; logo?: string; plate?: boolean }) {
  if (!logo)
    return plate ? (
      <p className="t-title px-6 text-center text-bone">{who}</p>
    ) : (
      <p className="t-body flex h-[clamp(30px,4svh,40px)] items-end font-bold text-bone">{who}</p>
    );
  return (
    <Image
      src={logo}
      alt={who}
      width={240}
      height={80}
      unoptimized
      className={`w-auto object-contain opacity-90 [filter:brightness(0)_invert(1)] ${
        plate ? "h-[clamp(40px,5.5svh,60px)] max-w-[72%] object-center" : "h-[clamp(30px,4svh,40px)] max-w-[200px] object-left"
      }`}
    />
  );
}
