// Monogram: a single stem carrying two sets of arms — K, echoed — on a gold square.
// Rectilinear to match the site's crop-marked frames; no box-of-letters.
export default function Logo({ className = "size-11" }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 44" className={className} role="img" aria-label="Kalpesh Kinariwala monogram">
      <rect width="44" height="44" fill="var(--champagne)" />
      <g fill="none" stroke="var(--obsidian)" strokeWidth="3.4" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M13 11v22" />
        <path d="M28 11 16 22l12 11" />
        <path d="M34 11 22 22l12 11" />
      </g>
    </svg>
  );
}
