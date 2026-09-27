import type { ReactNode } from "react";

// Wide margins and long pauses between blocks: the client asked for a lot of empty space.
export const WRAP = "mx-auto w-full max-w-[1600px] px-6 md:px-16 lg:px-24";
export const PAD = "pb-36 pt-[132px] md:pb-56 md:pt-[200px]";

export type Wash = "ink" | "plum" | "aubergine" | "violet" | "gold";

// A soft gradient laid over a sheet's flat colour (globals.css, .wash-*).
export function WashLayer({ wash }: { wash: Wash }) {
  return <div aria-hidden className={`wash wash-${wash}`} />;
}

// A sheet of colour. Sheets.tsx makes each one stick as the next slides over it.
// theme: "dark" for the black and purple sheets (bone text), "light" for gold (ink text).
// wash: the gradient over the colour.
export default function Sheet({
  id,
  theme,
  wash,
  className = "",
  children,
}: {
  id?: string;
  theme: "light" | "dark";
  wash?: Wash;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      data-sheet
      data-theme={theme}
      className={`min-h-[100svh] ${className}`}
    >
      {wash && <WashLayer wash={wash} />}
      {children}
    </section>
  );
}


// Two columns with room between them.
export function Split({ left, right, className = "" }: { left: ReactNode; right: ReactNode; className?: string }) {
  return (
    <div className={`grid lg:grid-cols-2 ${className}`}>
      <div className="pt-10 lg:pr-20 lg:pt-14">{left}</div>
      <div className="pt-10 lg:pl-20 lg:pt-14">{right}</div>
    </div>
  );
}
