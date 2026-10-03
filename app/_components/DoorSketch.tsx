// Gold line sketches for the five doors, in the hand of the client's architectural drawings (Raj,
// 2026-10-03: "Can we try icons in the same sketch style"). Each is drawn twice — a firm line and a fainter,
// slightly displaced one — through a turbulence filter, so the strokes wobble like ink rather than vectors.

type Kind = "capital" | "hop" | "careers" | "press" | "general";

const L = { fill: "none", strokeLinecap: "round", strokeLinejoin: "round" } as const;

// Capital: a temple front, the Pantheon of the name — pediment, six columns, three steps.
function Capital() {
  return (
    <>
      <path d="M30 70 L100 34 L170 70 Z" />
      <path d="M44 66 L100 39 L156 66" opacity=".55" />
      <path d="M90 56 a10 6 0 0 1 20 0" opacity=".7" />
      <path d="M26 70 H174 M28 77 H172" />
      {[42, 65, 88, 112, 135, 158].map((x) => (
        <g key={x}>
          <path d={`M${x - 6} 81 H${x + 6} M${x - 4} 84 V146 M${x + 4} 84 V146 M${x - 6} 149 H${x + 6}`} />
          <path d={`M${x - 1.5} 88 V142 M${x + 1.5} 90 V140`} opacity=".45" />
        </g>
      ))}
      <path d="M22 152 H178 M16 159 H184 M10 166 H190" />
      <path d="M10 172 H190" opacity=".4" />
      <path d="M22 168 l6 -4 6 4 6 -4 M160 168 l6 -4 6 4 6 -4" opacity=".5" />
    </>
  );
}

// Partner with HOP: a stage under a lighting truss, three beams falling, a mic stand at centre.
function Hop() {
  return (
    <>
      <path d="M24 40 H176 M24 50 H176" />
      {Array.from({ length: 16 }, (_, i) => 24 + i * 10).map((x) => (
        <path key={x} d={`M${x} 40 L${x + 10} 50`} opacity=".55" />
      ))}
      <path d="M30 50 V150 M170 50 V150 M36 50 V150 M164 50 V150" />
      {[62, 100, 138].map((x) => (
        <g key={x}>
          <path d={`M${x - 5} 52 h10 v8 l-2 6 h-6 l-2 -6 z`} />
          <path d={`M${x - 3} 66 L${x - 26} 150 M${x + 3} 66 L${x + 26} 150`} opacity=".35" />
        </g>
      ))}
      <path d="M100 98 a5 7 0 1 1 0.1 0 M100 112 V146 M90 150 h20" />
      <path d="M14 150 H186 L180 168 H20 Z" />
      <path d="M26 158 H174" opacity=".45" />
      {[40, 70, 130, 160].map((x) => (
        <path key={x} d={`M${x} 186 a8 8 0 0 1 16 0 M${x + 8} 178 a5 5 0 1 1 0.1 0`} opacity=".6" />
      ))}
    </>
  );
}

// Careers: a tower rising floor by floor beside a tower crane.
function Careers() {
  return (
    <>
      <path d="M90 176 V78 H150 V176" />
      {[90, 102, 114, 126, 138, 150, 162].map((y) => (
        <path key={y} d={`M90 ${y} H150`} opacity=".7" />
      ))}
      {[90, 102, 114, 126, 138, 150, 162].map((y) =>
        [98, 112, 126, 140].map((x) => <path key={`${x}-${y}`} d={`M${x} ${y + 3} h6 v6 h-6 z`} opacity=".45" />),
      )}
      <path d="M150 78 V66 M90 78 V66" opacity=".5" />
      <path d="M48 176 V30 M56 176 V30" />
      {Array.from({ length: 14 }, (_, i) => 176 - i * 10.5).map((y) => (
        <path key={y} d={`M48 ${y} L56 ${y - 10.5}`} opacity=".5" />
      ))}
      <path d="M30 30 H176 M30 38 H176 M52 30 L52 16 M52 16 L30 30 M52 16 L120 30" />
      <path d="M30 30 h-8 v12 h14 v-12" />
      <path d="M150 38 V70 M146 70 h8 l-2 6 h-4 z" />
      <path d="M20 176 H186" />
      <path d="M26 182 H180" opacity=".4" />
    </>
  );
}

// Press: a classic broadcast microphone on its stand, sound lines either side.
function Press() {
  return (
    <>
      <path d="M78 46 a22 22 0 0 1 44 0 V104 a22 22 0 0 1 -44 0 Z" />
      {[56, 66, 76, 86, 96].map((y) => (
        <path key={y} d={`M80 ${y} H120`} opacity=".55" />
      ))}
      {[88, 100, 112].map((x) => (
        <path key={x} d={`M${x} 30 V120`} opacity=".3" />
      ))}
      <path d="M66 92 a34 34 0 0 0 68 0" />
      <path d="M100 126 V164 M80 168 H120 M74 176 H126" />
      <path d="M100 126 h-6 M100 126 h6" opacity=".5" />
      <path d="M48 58 a40 40 0 0 0 0 56 M36 48 a56 56 0 0 0 0 76" opacity=".5" />
      <path d="M152 58 a40 40 0 0 1 0 56 M164 48 a56 56 0 0 1 0 76" opacity=".5" />
    </>
  );
}

// Contact: a sealed letter with a fountain pen resting across it.
function General() {
  return (
    <>
      <path d="M26 66 H158 V160 H26 Z" />
      <path d="M26 66 L92 118 L158 66" />
      <path d="M26 160 L76 106 M158 160 L108 106" opacity=".6" />
      <path d="M92 118 a12 12 0 1 1 0.1 0" />
      <path d="M86 122 l6 -6 6 6 -6 6 z" opacity=".6" />
      {[80, 92, 104, 116, 128, 140].map((y) => (
        <path key={y} d={`M34 ${y + 10} L46 ${y}`} opacity=".3" />
      ))}
      <path d="M120 176 L182 54 L190 58 L130 180 Z" />
      <path d="M182 54 L190 58 L194 46 Z" />
      <path d="M126 168 L134 172" opacity=".6" />
      <path d="M120 176 L114 190 L130 180" />
      <path d="M156 104 L164 108" opacity=".5" />
    </>
  );
}

const ART: Record<Kind, () => React.ReactNode> = { capital: Capital, hop: Hop, careers: Careers, press: Press, general: General };

export default function DoorSketch({ kind, className = "" }: { kind: string; className?: string }) {
  const Art = ART[kind as Kind] ?? General;
  const id = `ink-${kind}`;
  return (
    <svg viewBox="0 0 200 200" aria-hidden className={className}>
      <defs>
        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#f6dc9c" />
          <stop offset=".55" stopColor="#d6a44e" />
          <stop offset="1" stopColor="#9a6b28" />
        </linearGradient>
        <filter id={`${id}-wobble`} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="3" />
          <feDisplacementMap in="SourceGraphic" scale="2.6" />
        </filter>
        <filter id={`${id}-wobble2`} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="11" />
          <feDisplacementMap in="SourceGraphic" scale="3.4" />
        </filter>
      </defs>
      <g {...L} stroke={`url(#${id}-gold)`} strokeWidth="1.5" filter={`url(#${id}-wobble)`}>
        <Art />
      </g>
      <g {...L} stroke={`url(#${id}-gold)`} strokeWidth=".8" opacity=".45" filter={`url(#${id}-wobble2)`} transform="translate(1.2 0.8)">
        <Art />
      </g>
    </svg>
  );
}
