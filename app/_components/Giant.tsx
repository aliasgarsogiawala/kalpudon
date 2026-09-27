import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Characters in the longest line — gives CSS a close first guess at the size before fitGiants() measures it. */
  n: number;
  /** Tallest the letters may get (before any stretch), in svh. */
  max?: number;
  /** Vertical stretch, for follow.art's tall poster letters; stretchSm replaces it on phones. */
  stretch?: number;
  stretchSm?: number;
  /** Lines in the word (for a <br />), so the space the stretch adds is reserved below it. */
  lines?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
};

// A word set as large as its column allows: ultra-condensed caps that run the full measure (follow.art).
export default function Giant({ children, n, max = 40, stretch, stretchSm, lines = 1, as: Tag = "p", className = "" }: Props) {
  const style = {
    "--n": n,
    "--max": `${max}svh`,
    "--lines": lines,
    ...(stretch && { "--stretch": stretch }),
    ...(stretchSm && { "--stretch-sm": stretchSm }),
  } as CSSProperties;
  return (
    <span className="@container block">
      <Tag data-fit data-max={max} data-giant data-stretch={stretch ? "" : undefined} className={`giant ${className}`} style={style}>
        <span className="giant-in">{children}</span>
      </Tag>
    </span>
  );
}

// Sets every giant word to the exact size that fills its column (capped by its max), from the real glyph widths.
export function fitGiants(root: ParentNode = document) {
  const probe = document.createElement("div");
  probe.style.cssText = "position:fixed;top:0;width:0;height:100svh;visibility:hidden;pointer-events:none";
  document.body.append(probe);
  const svh = probe.offsetHeight / 100;
  probe.remove();

  root.querySelectorAll<HTMLElement>("[data-fit]").forEach((el) => {
    const inner = el.firstElementChild as HTMLElement | null;
    const width = inner?.offsetWidth;
    if (!width) return;
    const current = parseFloat(getComputedStyle(el).fontSize);
    const cap = (Number(el.dataset.max) || 40) * svh;
    el.style.fontSize = `${Math.min((current * el.clientWidth) / width, cap)}px`;
  });
}
