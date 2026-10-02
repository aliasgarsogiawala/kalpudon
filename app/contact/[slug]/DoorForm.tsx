"use client";

import { useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";

type Props = { label: string; desk: string; field: string; cta: string; topics: string[]; formId: string | null };

type FormspreeReply = { errors?: { field?: string; message: string }[] };

const FAILED = "The note could not be sent. Please try again in a moment.";

export default function DoorForm({ label, desk, field, cta, topics, formId }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const [topic, setTopic] = useState(topics[0]);

  // Delivered through Formspree, which emails every door's notes to his office; the subject names the door.
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!formId) {
      console.error("No Formspree form is set: add FORMSPREE_FORM and redeploy.");
      setError(FAILED);
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) {
        // A visitor can fix a field error ("email should be an email"); anything else is ours to fix.
        const reply: FormspreeReply = await res.json().catch(() => ({}));
        const fixable = reply.errors?.filter((x) => x.field).map((x) => `${x.field} ${x.message}.`);
        if (!fixable?.length) console.error("Formspree refused the note:", res.status, reply);
        setError(fixable?.length ? fixable.join(" ").replace(/^./, (c) => c.toUpperCase()) : FAILED);
        setStatus("idle");
        return;
      }
      track("door_submit", { door: label, topic });
      setStatus("sent");
    } catch {
      setError(FAILED);
      setStatus("idle");
    }
  };

  const input =
    "mt-2 w-full border-b border-white/20 bg-transparent py-3 text-[17px] text-bone outline-none transition-colors placeholder:text-stone/40 focus:border-gold";

  if (status === "sent") {
    return (
      <div className="fade-in" role="status">
        <p className="t-statement">
          Received<em className="gold-glow">.</em>
        </p>
        <p className="t-body mt-5 max-w-[420px] text-stone">
          Your note has gone to the people who handle {desk} enquiries.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-7">
      {/* Formspree: the email subject, and a honeypot that only bots fill in. */}
      <input type="hidden" name="_subject" value={`${label} — ${topic}`} />
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
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
        {/* Named after its label so the email the desk receives reads plainly. */}
        <input name={field} className={input} />
      </label>
      <label className="block text-[15px] text-stone">
        A few lines
        <textarea name="message" rows={3} className={`${input} resize-none`} placeholder="Your note" />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="t-title link-line mt-4 w-fit text-gold-soft transition-colors duration-500 hover:text-bone disabled:cursor-wait disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : `${cta} →`}
      </button>
      {error && (
        <p role="alert" className="-mt-3 text-[15px] text-[#ff9b8a]">
          {error}
        </p>
      )}
    </form>
  );
}
