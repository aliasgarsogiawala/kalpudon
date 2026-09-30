"use client";

import { useActionState } from "react";
import { login, type Result } from "../actions";
import { buttonClass, inputClass } from "../_fields";

export default function LoginForm() {
  const [state, action, pending] = useActionState<Result, FormData>(login, null);
  return (
    <form action={action} className="mt-8 space-y-5">
      <label className="block">
        <span className="t-note text-bone/70">Team password</span>
        <input name="password" type="password" autoComplete="current-password" required autoFocus className={inputClass} />
      </label>
      {state && !state.ok && (
        <p role="alert" className="text-[14px] text-[#ff9b8a]">
          {state.message}
        </p>
      )}
      <button disabled={pending} className={buttonClass}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
