import { useState } from "react";
import type { FormEvent } from "react";

const SUPABASE_URL = "https://yoabjhmutrwuipmouitu.supabase.co";
// Publishable key — safe to ship in the client; row-level security only
// allows inserts, so the subscriber list is never readable from the site.
const SUPABASE_KEY = "sb_publishable_DswuTjkKmV4DMqPCwjXfyw_e8I7Gpjw";

type Status = "idle" | "submitting" | "success" | "exists" | "error";

function NewsletterSignup() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") || "").trim();
    if (!email) return;
    setStatus("submitting");
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/brief_subscribers`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ email }),
      });
      if (res.status === 409) {
        form.reset();
        setStatus("exists");
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success" || status === "exists") {
    return (
      <p className="max-w-md rounded-2xl border border-border bg-card px-5 py-4 font-medium">
        {status === "exists"
          ? "You're already on the list — the next Brief is on its way."
          : "You're in. Each new Brief lands in your inbox when it publishes."}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md flex-wrap gap-3">
      <input
        required
        type="email"
        name="email"
        autoComplete="email"
        placeholder="you@company.com"
        className="min-w-0 flex-1 rounded-full border border-border bg-card px-5 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60"
      >
        {status === "submitting" ? "Signing up…" : "Get the Brief"}
      </button>
      {status === "error" && (
        <p className="w-full text-sm text-muted-foreground">
          Something went wrong — please try again in a moment.
        </p>
      )}
    </form>
  );
}

export default NewsletterSignup;
