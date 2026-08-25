import { Link } from "react-router-dom";
import { editions } from "@/content/briefs";

function BriefIndex() {
  return (
    <main className="mx-auto max-w-content px-6 pb-20 pt-16 sm:pt-24">
      <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
        The Commerce Media Brief
      </p>
      <h1 className="max-w-3xl font-display text-4xl font-medium leading-tight sm:text-5xl">
        What actually matters in retail media, week by week.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        A weekly external review of the commerce media landscape — the moves,
        the money, and the read on what they mean. Every item links to the
        original reporting.
      </p>
      <a
        href="https://www.linkedin.com/in/bethmbruce"
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-block rounded-full border border-border px-6 py-3 font-medium hover:bg-muted"
      >
        Follow along on LinkedIn
      </a>

      <div className="mt-14 space-y-6">
        {editions.map((edition) => (
          <Link
            key={edition.slug}
            to={`/brief/${edition.slug}`}
            className="block rounded-2xl border border-border bg-card p-8 transition-colors hover:border-accent"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              {edition.weekOf}
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
              {edition.title}
            </h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              {edition.dek}
            </p>
            <span className="mt-4 inline-block font-medium text-accent">
              Read the edition →
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default BriefIndex;
