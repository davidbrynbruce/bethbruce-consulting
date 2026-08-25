import { useState } from "react";
import type { FormEvent } from "react";

const ENDPOINT = "https://formsubmit.co/ajax/bethmbruce@gmail.com";

const interests = [
  "Advisory project",
  "Executive advisory retainer",
  "Speaking / keynote",
  "Executive workshop",
  "Press / analyst inquiry",
  "Something else",
];

type Status = "idle" | "submitting" | "success" | "error";

function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("submitting");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...data,
          _subject: `New lead — ${String(data.name || "bethbruce.com")}`,
          _template: "table",
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-card p-8 text-card-foreground sm:p-10">
        <h3 className="font-display text-2xl font-semibold">
          Thanks — message received.
        </h3>
        <p className="mt-3 text-muted-foreground">
          Beth will get back to you shortly. In the meantime, the latest
          Commerce Media Brief is always worth a read.
        </p>
      </div>
    );
  }

  const inputClasses =
    "w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-card p-8 text-card-foreground sm:p-10"
    >
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium">Name *</span>
          <input
            required
            name="name"
            type="text"
            autoComplete="name"
            className={`mt-1 ${inputClasses}`}
            placeholder="Your name"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Email *</span>
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            className={`mt-1 ${inputClasses}`}
            placeholder="you@company.com"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Company</span>
          <input
            name="company"
            type="text"
            autoComplete="organization"
            className={`mt-1 ${inputClasses}`}
            placeholder="Company"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium">I'm interested in</span>
          <select name="interest" className={`mt-1 ${inputClasses}`}>
            {interests.map((interest) => (
              <option key={interest} value={interest}>
                {interest}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="mt-4 block">
        <span className="text-sm font-medium">Message *</span>
        <textarea
          required
          name="message"
          rows={4}
          className={`mt-1 ${inputClasses}`}
          placeholder="What are you working on?"
        />
      </label>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 rounded-full bg-accent px-6 py-3 font-medium text-accent-foreground hover:opacity-90 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
      {status === "error" && (
        <p className="mt-4 text-sm text-muted-foreground">
          Something went wrong sending your message. Please try again, or email{" "}
          <a href="mailto:bethmbruce@gmail.com" className="font-medium text-accent hover:underline">
            bethmbruce@gmail.com
          </a>{" "}
          directly.
        </p>
      )}
    </form>
  );
}

export default ContactForm;
