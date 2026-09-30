"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOORS, ELSEWHERE, NAV, doorHref } from "./data";

// On the home page, section links stay plain hash anchors so the smooth-scroll handler takes them;
// everywhere else they are real navigations.
function NavLink({ href, home, ...rest }: React.ComponentProps<"a"> & { href: string; home: boolean }) {
  if (home && href.startsWith("/#")) return <a href={href.slice(1)} {...rest} />;
  return <Link href={href} {...rest} />;
}

const condensed = "display";
const RING = 2 * Math.PI * 19;

// The mark: KK inside a gold ring that fills as the page is read.
function Monogram({ progress }: { progress: React.RefObject<SVGCircleElement | null> }) {
  return (
    <span className="relative grid size-11 shrink-0 place-items-center">
      <svg viewBox="0 0 44 44" className="absolute inset-0 -rotate-90" aria-hidden>
        {/* data-edge: the hero sets his name to run from here to the header's last mark */}
        <circle data-edge cx="22" cy="22" r="19" fill="none" stroke="currentColor" strokeOpacity=".18" strokeWidth="1.2" />
        <circle
          ref={progress}
          cx="22"
          cy="22"
          r="19"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray={RING}
          strokeDashoffset={RING}
        />
      </svg>
      <span className={`text-[17px] leading-none text-gold-soft ${condensed}`}>KK</span>
    </span>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`size-3.5 ${className}`} aria-hidden>
      <path d="M3 8h9.5M8.5 4 12.5 8l-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

// The five audience doors (brief §3), dropped from the capsule. Names set large; one photograph beside
// them changes with the name under the pointer. Each door is its own page.
function DoorPanel({ onPick }: { onPick: () => void }) {
  const [on, setOn] = useState(0);
  const d = DOORS[on];
  return (
    <div
      id="header-doors"
      className="fade-in absolute inset-x-0 top-full mt-2 hidden overflow-hidden rounded-[28px] border border-white/10 bg-[rgb(12_9_18/0.92)] shadow-[0_40px_90px_-30px_rgba(0,0,0,.8)] backdrop-blur-xl lg:block"
    >
      <div className="grid grid-cols-12 gap-10 p-10">
        <div className="col-span-7">
          <p className="eyebrow text-stone">What brings you here?</p>
          <ul className="mt-5">
            {DOORS.map((door, i) => (
              <li key={door.slug}>
                <Link
                  href={doorHref(door)}
                  onClick={onPick}
                  onMouseEnter={() => setOn(i)}
                  onFocus={() => setOn(i)}
                  className="flex items-center justify-between gap-6 py-3"
                >
                  <span className="flex items-baseline gap-4">
                    <span
                      className={`text-[clamp(34px,3vw,52px)] leading-[0.9] transition-[transform,color] duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${condensed} ${
                        i === on ? "translate-x-1.5 text-bone" : "text-stone/45"
                      }`}
                    >
                      {door.label}
                    </span>
                  </span>
                  <span className={`text-right text-[14px] transition-colors duration-500 ${i === on ? "text-gold-soft" : "text-stone/50"}`}>
                    {door.who}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-5 flex flex-col">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-smoke">
            {DOORS.map((door, i) => (
              <Image
                key={door.slug}
                src={door.img}
                alt=""
                fill
                sizes="34vw"
                className={`object-cover transition-[opacity,transform] duration-700 ${i === on ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <p className={`absolute bottom-4 left-5 text-[28px] leading-none text-bone ${condensed}`}>{d.title}</p>
          </div>
          <p key={d.slug} className="fade-in mt-5 text-[15px] leading-[1.6] text-bone/75">
            {d.body}
          </p>
          <Link
            href={doorHref(d)}
            onClick={onPick}
            className="mt-auto inline-flex w-fit items-center gap-2 pt-5 text-[14px] text-gold-soft transition-colors hover:text-bone"
          >
            {d.cta} <Arrow />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const path = usePathname();
  const home = path === "/";
  const [active, setActive] = useState("");
  const [menu, setMenu] = useState(false);
  const [doors, setDoors] = useState(false);
  const [float, setFloat] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [pill, setPill] = useState({ x: 0, w: 0, on: false });
  const root = useRef<HTMLElement>(null);
  const nav = useRef<HTMLElement>(null);
  const ring = useRef<SVGCircleElement>(null);
  const open = menu || doors;

  // Condense into the glass capsule after the first few pixels; always in view.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      ring.current?.setAttribute("stroke-dashoffset", String(RING * (1 - (max > 0 ? Math.min(y / max, 1) : 0))));
      setFloat(y > 40);
      if (!home) return;
      const probe = window.innerHeight * 0.4;
      let current = "";
      for (const n of NAV) {
        const el = "id" in n ? document.getElementById(n.id) : null;
        if (el && el.getBoundingClientRect().top <= probe) current = n.href;
      }
      // HOP ends where the ideas begin; past it no section link is current.
      const end = document.getElementById("ideas");
      if (end && end.getBoundingClientRect().top <= probe) current = "";
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [home]);

  // The doors panel closes on Escape or a click anywhere outside the header.
  useEffect(() => {
    if (!doors) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDoors(false);
    const onDown = (e: PointerEvent) => !root.current?.contains(e.target as Node) && setDoors(false);
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [doors]);

  useEffect(() => {
    if (!menu) return;
    window.__lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (window.__kkReady) window.__lenis?.start();
    };
  }, [menu]);

  const isOn = (href: string) => (href.startsWith("/#") ? active === href : path.startsWith(href));
  const current = NAV.find((n) => isOn(n.href))?.href ?? null;
  const target = hover ?? current;

  // The gold pill slides to the link under the pointer, or rests on the current one.
  useLayoutEffect(() => {
    const el = target ? nav.current?.querySelector<HTMLElement>(`[data-href="${target}"]`) : null;
    if (el) setPill({ x: el.offsetLeft, w: el.offsetWidth, on: true });
    else setPill((p) => ({ ...p, on: false }));
  }, [target, float]);

  const close = () => {
    setMenu(false);
    setDoors(false);
  };

  return (
    <header
      ref={root}
      data-state={float ? "float" : "top"}
      data-open={open}
      className="nav-shell fixed inset-x-0 top-0 z-50 px-3 pt-3 text-bone md:px-6 md:pt-4 lg:px-10"
    >
      <div className="relative mx-auto max-w-[1600px]">
        <div className="nav-capsule flex h-[60px] items-center justify-between gap-6 rounded-full px-2 md:pl-3 lg:h-[64px] lg:pr-2.5">
          <Link href={home ? "#top" : "/"} onClick={close} className="flex items-center gap-3" aria-label="Kalpesh Kinariwala, home">
            <Monogram progress={ring} />
            <span className={`text-[20px] leading-none text-bone md:text-[22px] ${condensed}`}>Kalpesh Kinariwala</span>
          </Link>

          <div className="flex items-center gap-3">
            <nav ref={nav} aria-label="Primary" className="relative hidden items-center lg:flex" onMouseLeave={() => setHover(null)}>
              <span
                aria-hidden
                className="nav-pill absolute left-0 top-1/2 h-10 rounded-full bg-white/[0.08] ring-1 ring-gold/25"
                style={{ transform: `translate(${pill.x}px, -50%)`, width: pill.w, opacity: pill.on ? 1 : 0 }}
              />
              {NAV.map((n) => (
                <NavLink
                  key={n.href}
                  href={n.href}
                  home={home}
                  data-href={n.href}
                  onClick={close}
                  onMouseEnter={() => setHover(n.href)}
                  onFocus={() => setHover(n.href)}
                  onBlur={() => setHover(null)}
                  aria-current={isOn(n.href) ? "page" : undefined}
                  className={`relative flex h-10 items-center gap-1.5 rounded-full px-5 text-[14px] transition-colors duration-300 ${
                    target === n.href ? "text-bone" : "text-bone/60"
                  }`}
                >
                  {n.label}
                </NavLink>
              ))}
            </nav>

            <button
              onClick={() => {
                setMenu(false);
                setDoors((o) => !o);
              }}
              aria-expanded={doors}
              aria-controls="header-doors"
              className={`hidden h-10 items-center px-5 text-[14px] transition-colors duration-300 hover:text-gold-soft lg:flex ${doors ? "text-gold-soft" : "text-bone/60"}`}
            >
              <span data-edge>Contact</span>
            </button>

            <button
              data-edge
              onClick={() => {
                setDoors(false);
                setMenu((o) => !o);
              }}
              className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/[0.04] lg:hidden"
              aria-expanded={menu}
              aria-controls="site-menu"
              aria-label={menu ? "Close menu" : "Open menu"}
            >
              <span className="flex w-[18px] flex-col gap-[5px]">
                <span className={`h-px bg-bone transition-transform duration-500 ${menu ? "translate-y-[3px] rotate-45" : ""}`} />
                <span className={`h-px bg-bone transition-transform duration-500 ${menu ? "-translate-y-[3px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>

        {/* Large screens: the doors drop from the capsule */}
        {doors && <DoorPanel onPick={close} />}
      </div>

      {/* Small screens: a full-screen menu — the pages set large, then the doors, then elsewhere */}
      {menu && (
        <div id="site-menu" data-lenis-prevent className="fade-in fixed inset-0 -z-10 overflow-y-auto bg-ink px-6 pb-10 pt-[100px] lg:hidden">
          <div aria-hidden className="wash wash-violet" />
          <ul>
            {[{ href: "/", label: "Home" }, ...NAV].map((n, i) => (
              <li key={n.href} className="menu-in" style={{ animationDelay: `${80 + i * 60}ms` }}>
                <NavLink
                  href={n.href}
                  home={home}
                  onClick={close}
                  className={`block py-1 ${n.href !== "/" && isOn(n.href) ? "text-gold-soft" : "text-bone"}`}
                >
                  <span className={`text-[clamp(56px,16vw,88px)] leading-[0.92] ${condensed}`}>{n.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <p className="menu-in mt-12 text-[14px] text-stone" style={{ animationDelay: "380ms" }}>
            Enquiries
          </p>
          <ul className="menu-in mt-2" style={{ animationDelay: "440ms" }}>
            {DOORS.map((d) => (
              <li key={d.slug}>
                <Link href={doorHref(d)} onClick={close} className="block py-2.5">
                  <span className="block text-[20px] text-bone">{d.label}</span>
                  <span className="block text-[13px] text-stone">{d.who}</span>
                </Link>
              </li>
            ))}
          </ul>

          <ul className="menu-in mt-10 flex gap-6 text-[15px]" style={{ animationDelay: "500ms" }}>
            {ELSEWHERE.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noreferrer" className="link-line text-bone/80">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
