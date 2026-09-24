// Printer's crop marks: short hairlines that sit just outside each corner of a frame,
// never touching it. The site's one ornament — every photograph is a proof print.
export default function Crop({ tone = "bg-champagne/70", size = 18, gap = 6 }: { tone?: string; size?: number; gap?: number }) {
  const len = `${size}px`;
  const off = `-${size + gap}px`;
  const marks: React.CSSProperties[] = [
    { top: 0, left: off, width: len, height: 1 },
    { left: 0, top: off, height: len, width: 1 },
    { top: 0, right: off, width: len, height: 1 },
    { right: 0, top: off, height: len, width: 1 },
    { bottom: 0, left: off, width: len, height: 1 },
    { left: 0, bottom: off, height: len, width: 1 },
    { bottom: 0, right: off, width: len, height: 1 },
    { right: 0, bottom: off, height: len, width: 1 },
  ];
  return (
    <>
      {marks.map((style, i) => (
        <span key={i} aria-hidden className={`crop pointer-events-none absolute ${tone}`} style={style} />
      ))}
    </>
  );
}
