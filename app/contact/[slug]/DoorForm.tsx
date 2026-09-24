"use client";

import { useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";

type Props = { label: string; desk: string; field: string; cta: string; topics: string[] };

export default function DoorForm({ label, desk, field, cta, topics }: Props) {
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState(topics[0]);

  // TODO: deliver to the right inbox per door (brief §8) once the email provider and addresses are chosen.
  const submit = (e: FormEvent) => {
    e.preventDefault();
    track("door_submit", { door: label, topic });
    setSent(true);
  };

  const input =
    "mt-2 w-full border-b border-white/20 bg-transparent py-3 text-[17px] text-bone outline-none transition-colors placeholder:text-ash/40 focus:border-champagne";

  if (sent) {
    return (
      <div className="fade-in" role="status">
        <p className="display text-[clamp(38px,4.1vw,65px)]">
          Received<em className="text-champagne">.</em>
        </p>
        <p className="mt-5 max-w-[420px] text-[17px] leading-[1.6] text-ash">
          Your note has gone to the people who handle {desk} enquiries.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-7">
      <fieldset>
        <legend className="text-[15px] text-ash">About</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {topics.map((t) => (
            <label
              key={t}
              className={`cursor-pointer border px-4 py-2.5 text-[15px] transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-champagne ${
                topic === t ? "border-champagne bg-champagne text-obsidian" : "border-white/20 text-bone/80 hover:border-champagne"
              }`}
            >
              <input type="radio" name="topic" value={t} checked={topic === t} onChange={() => setTopic(t)} className="sr-only" />
              {t}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-7 md:grid-cols-2">
        <label className="block text-[15px] text-ash">
          Full name
          <input required name="name" autoComplete="name" className={input} placeholder="Your name" />
        </label>
        <label className="block text-[15px] text-ash">
          Email
          <input required type="email" name="email" autoComplete="email" className={input} placeholder="you@company.com" />
        </label>
      </div>
      <label className="block text-[15px] text-ash">
        {field}
        <input name="org" className={input} />
      </label>
      <label className="block text-[15px] text-ash">
        A few lines
        <textarea name="message" rows={3} className={`${input} resize-none`} placeholder="What should we know?" />
      </label>
      <button
        type="submit"
        className="mt-2 w-fit bg-champagne px-8 py-4 text-[16px] font-medium text-obsidian transition-colors duration-500 hover:bg-bone"
      >
        {cta} →
      </button>
    </form>
  );
}
