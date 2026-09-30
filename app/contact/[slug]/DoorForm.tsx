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
    "mt-2 w-full border-b border-white/20 bg-transparent py-3 text-[17px] text-bone outline-none transition-colors placeholder:text-stone/40 focus:border-gold";

  if (sent) {
    return (
      <div className="fade-in" role="status">
        <p className="t-statement">
          Received<em className="text-gold-soft">.</em>
        </p>
        <p className="t-body mt-5 max-w-[420px] text-stone">
          Your note has gone to the people who handle {desk} enquiries.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-7">
      <fieldset>
        <legend className="text-[15px] text-stone">About</legend>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
          {topics.map((t) => (
            <label
              key={t}
              className={`cursor-pointer py-1 text-[16px] transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-gold ${
                topic === t ? "text-gold-soft underline decoration-gold underline-offset-[6px]" : "text-bone/60 hover:text-bone"
              }`}
            >
              <input type="radio" name="topic" value={t} checked={topic === t} onChange={() => setTopic(t)} className="sr-only" />
              {t}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-7 md:grid-cols-2">
        <label className="block text-[15px] text-stone">
          Full name
          <input required name="name" autoComplete="name" className={input} placeholder="Your name" />
        </label>
        <label className="block text-[15px] text-stone">
          Email
          <input required type="email" name="email" autoComplete="email" className={input} placeholder="you@company.com" />
        </label>
      </div>
      <label className="block text-[15px] text-stone">
        {field}
        <input name="org" className={input} />
      </label>
      <label className="block text-[15px] text-stone">
        A few lines
        <textarea name="message" rows={3} className={`${input} resize-none`} placeholder="Your note" />
      </label>
      <button
        type="submit"
        className="t-title link-line mt-4 w-fit text-gold-soft transition-colors duration-500 hover:text-bone"
      >
        {cta} →
      </button>
    </form>
  );
}
