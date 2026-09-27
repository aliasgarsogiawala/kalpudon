import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Characters in the longest line — gives CSS a close first guess at the size before fitGiants() measures it. */
  n: number;
  /** Tallest the letters may get, in svh. */
  max?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
};

// A word set as large as its column allows: bold grotesk, set tight, running the full measure.
export default function Giant({ children, n, max = 40, as: Tag = "p", className = "" }: Props) {
  const style = {
    "--n": n,
    "--max": `${max}svh`,
  } as CSSProperties;
  return (
    <span className="@container block">
      <Tag data-fit data-max={max} data-giant className={`giant ${className}`} style={style}>
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
