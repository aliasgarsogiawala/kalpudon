import Image from "next/image";

// Gold line drawings for the five doors, in the hand of the client's architectural sketches (Raj, 2026-10-03:
// "Can we try icons in the same sketch style"): the Pantheon front for Capital, a stage for HOP, a terraced tower
// for Careers, a studio microphone for Press, a sealed letter for Contact. Each is a pen-inked SVG in
// public/sketch/, drawn as front elevations with hatched shadow sides.
export default function DoorSketch({ kind, className = "" }: { kind: string; className?: string }) {
  return (
    <span aria-hidden className={`block aspect-square ${className}`}>
      <Image src={`/sketch/${kind}.svg`} alt="" width={400} height={400} unoptimized className="size-full" />
    </span>
  );
}
