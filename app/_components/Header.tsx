"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Crop from "./Crop";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { DOORS, NAV, doorHref } from "./data";

// On the home page, section links stay plain hash anchors so the smooth-scroll handler takes them;
// everywhere else they are real navigations.
function NavLink({ href, home, ...rest }: React.ComponentProps<"a"> & { href: string; home: boolean }) {
  if (home && href.startsWith("/#")) return <a href={href.slice(1)} {...rest} />;
  return <Link href={href} {...rest} />;
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 12 12" className={`size-3 transition-transform duration-500 ${open ? "rotate-180" : ""}`} aria-hidden>
      <path d="M2 4.5 6 8.5 10 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

// The five audience doors, reachable from the header on every page (brief §3). Each is its own page.

// Phone menu: a plain list of names.
function DoorList({ onPick }: { onPick: () => void }) {
  return (
    <ul className="border-t border-white/10">
      {DOORS.map((d) => (
        <li key={d.slug} className="border-b border-white/10">
          <Link href={doorHref(d)} onClick={onPick} className="flex items-baseline justify-between gap-4 py-4">
            <span className="text-[22px] font-medium tracking-[-0.02em] text-bone">{d.label}</span>
            <span className="text-right text-[14px] text-ash">{d.who}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

// Desktop: a yellow sheet under the bar — the names set large, one photograph fixed beside them
// that changes with the name under the pointer.
function DoorPanel({ onPick }: { onPick: () => void }) {
  const [on, setOn] = useState(0);
  const d = DOORS[on];
  return (
    <div id="header-doors" className="fade-in hidden bg-champagne text-obsidian lg:block">
      <div className="mx-auto grid max-w-[1680px] grid-cols-12 gap-12 px-10 pb-12 pt-10">
        <ul className="col-span-7 self-center">
          {DOORS.map((door, i) => (
            <li key={door.slug} className="border-b border-obsidian/20 first:border-t">
              <Link
                href={doorHref(door)}
                onClick={onPick}
                onMouseEnter={() => setOn(i)}
                onFocus={() => setOn(i)}
                className="group flex items-baseline justify-between gap-6 py-3.5"
              >
                <span
                  className={`text-[clamp(25px,2.3vw,36px)] font-medium leading-tight tracking-[-0.03em] transition-[transform,color] duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
                    i === on ? "translate-x-2 text-obsidian" : "text-obsidian/45"
                  }`}
                >
                  {door.label}
                </span>
                <span className={`text-[15px] transition-colors duration-500 ${i === on ? "text-obsidian" : "text-obsidian/45"}`}>
                  {door.who}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="col-span-4 col-start-9">
          <div className="relative aspect-[4/3]">
            <div className="absolute inset-0 overflow-hidden bg-obsidian">
              {DOORS.map((door, i) => (
                <Image
                  key={door.slug}
                  src={door.img}
                  alt=""
                  fill
                  sizes="30vw"
                  className={`object-cover transition-opacity duration-700 ${i === on ? "opacity-100" : "opacity-0"}`}
                />
              ))}
            </div>
            <Crop tone="bg-obsidian/60" />
          </div>
          <p key={d.slug} className="fade-in mt-6 max-w-[380px] text-[16px] leading-[1.55] text-obsidian/80">
            {d.body}
          </p>
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
  const bar = useRef<HTMLSpanElement>(null);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      if (!home) return;
      const probe = window.innerHeight * 0.4;
      let current = "";
      for (const n of NAV) {
        const el = "id" in n ? document.getElementById(n.id) : null;
        if (el && el.getBoundingClientRect().top <= probe) current = n.href;
      }
      // HOP ends where the record begins; past it no section link is current.
      const end = document.getElementById("record");
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
    if (menu) window.__lenis?.stop();
    else if (window.__kkReady) window.__lenis?.start();
  }, [menu]);

  const isOn = (href: string) => (href.startsWith("/#") ? active === href : path.startsWith(href));
  const close = () => {
    setMenu(false);
    setDoors(false);
  };

  return (
    <header ref={root} className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-violet">
      <div className="mx-auto flex h-[72px] max-w-[1680px] items-center justify-between gap-8 px-5 md:px-10 lg:h-[88px]">
        <Link href={home ? "#top" : "/"} onClick={close} className="group flex items-center gap-3.5" aria-label="Kalpesh Kinariwala, home">
          <Logo className="size-10 shrink-0 md:size-11" />
          <span className="flex flex-col">
            <span className="whitespace-nowrap text-[17px] font-semibold leading-none tracking-[-0.02em] text-bone md:text-[21px]">
              Kalpesh Kinariwala
            </span>
            <span className="mt-1.5 text-[13px] leading-none text-ash transition-colors duration-300 group-hover:text-champagne md:text-[14px]">
              Platform builder, Dubai
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-12 lg:flex">
          <nav className="flex items-center gap-10" aria-label="Primary">
            {NAV.map((n) => (
              <NavLink
                key={n.href}
                href={n.href}
                home={home}
                onClick={close}
                data-active={isOn(n.href)}
                aria-current={isOn(n.href) ? "page" : undefined}
                className={`nav-link text-[16px] transition-colors duration-300 ${
                  isOn(n.href) ? "text-bone" : "text-bone/65 hover:text-bone"
                }`}
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
          <button
            onClick={() => setDoors((o) => !o)}
            aria-expanded={doors}
            aria-controls="header-doors"
            className={`flex h-12 items-center gap-3 px-6 text-[16px] font-medium transition-colors duration-300 ${
              doors ? "bg-champagne text-obsidian" : "bg-champagne text-obsidian hover:bg-bone"
            }`}
          >
            Contact
            <Chevron open={doors} />
          </button>
        </div>

        <button
          onClick={() => setMenu((o) => !o)}
          className="flex h-11 items-center gap-3 border border-white/20 px-4 text-[15px] text-bone lg:hidden"
          aria-expanded={menu}
          aria-label={menu ? "Close menu" : "Open menu"}
        >
          <span className="flex w-5 flex-col gap-[5px]">
            <span className={`h-px bg-bone transition-transform duration-500 ${menu ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`h-px bg-bone transition-transform duration-500 ${menu ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </span>
          {menu ? "Close" : "Menu"}
        </button>
      </div>

      {/* Reading progress: a single hairline along the bottom edge */}
      <span aria-hidden className="absolute inset-x-0 -bottom-px h-px overflow-hidden">
        <span ref={bar} className="block h-full origin-left scale-x-0 bg-champagne" />
      </span>

      {/* Large screens: the doors drop down under the bar */}
      {doors && <DoorPanel onPick={close} />}

      {/* Small screens: pages, then the doors */}
      {menu && (
        <div
          data-lenis-prevent
          className="fade-in h-[calc(100dvh-72px)] overflow-y-auto border-t border-white/10 bg-violet px-5 pb-10 pt-4 md:px-10 lg:hidden"
        >
          <ul>
            {NAV.map((n) => (
              <li key={n.href} className="border-b border-white/10">
                <NavLink
                  href={n.href}
                  home={home}
                  onClick={close}
                  className={`block py-4 text-[34px] font-medium leading-none tracking-[-0.03em] ${isOn(n.href) ? "text-champagne" : "text-bone"}`}
                >
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-[14px] font-medium text-ash">Contact</p>
          <div className="mt-3">
            <DoorList onPick={close} />
          </div>
        </div>
      )}
    </header>
  );
}
