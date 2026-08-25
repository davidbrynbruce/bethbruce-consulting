import { Link, useParams } from "react-router-dom";
import NewsletterSignup from "@/components/NewsletterSignup";
import { editions } from "@/content/briefs";

function BriefEditionPage() {
  const { slug } = useParams<{ slug: string }>();
  const edition = editions.find((e) => e.slug === slug);

  if (!edition) {
    return (
      <main className="mx-auto max-w-content px-6 py-24">
        <h1 className="font-display text-3xl font-medium">
          Edition not found
        </h1>
        <p className="mt-4 text-muted-foreground">
          That edition of The Commerce Media Brief doesn't exist (yet).
        </p>
        <Link
          to="/brief"
          className="mt-8 inline-block rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90"
        >
          Browse all editions
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-content px-6 pb-20 pt-16 sm:pt-24">
      <Link
        to="/brief"
        className="text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        ← All editions
      </Link>
      <p className="mb-4 mt-8 text-sm font-semibold uppercase tracking-widest text-accent">
        The Commerce Media Brief · {edition.weekOf}
      </p>
      <h1 className="max-w-3xl font-display text-4xl font-medium leading-tight sm:text-5xl">
        {edition.title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        {edition.dek}
      </p>

      <nav className="mt-8 flex flex-wrap gap-2">
        {edition.stories.map((story) => (
          <a
            key={story.slug}
            href={`#${story.slug}`}
            className="rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            {story.category}
          </a>
        ))}
      </nav>

      <div className="mt-14 space-y-12">
        {edition.stories.map((story) => (
          <article
            key={story.slug}
            id={story.slug}
            className="scroll-mt-24 rounded-2xl border border-border bg-card p-8 sm:p-10"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              {story.category}
            </p>
            <h2 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
              {story.headline}
            </h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
              {story.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-6 border-t border-border pt-5">
              <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Coverage
              </p>
              <ul className="mt-3 space-y-2">
                {story.links.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-accent hover:underline"
                    >
                      {link.label}
                    </a>{" "}
                    <span className="text-sm text-muted-foreground">
                      — {link.source} ↗
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      {edition.quickHits.length > 0 && (
        <section className="mt-14 rounded-2xl border border-border bg-muted/50 p-8 sm:p-10">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            Quick hits
          </h2>
          <ul className="mt-6 space-y-4">
            {edition.quickHits.map((hit) => (
              <li key={hit.url + hit.text.slice(0, 20)} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent"
                />
                <span>
                  {hit.text}{" "}
                  <a
                    href={hit.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-accent hover:underline"
                  >
                    {hit.source} ↗
                  </a>
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-14 rounded-2xl border border-border bg-muted/50 p-8 sm:p-10">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">
          Get next week's Brief in your inbox
        </h2>
        <p className="mt-3 max-w-xl text-muted-foreground">
          One email a week, when the edition publishes. No noise in between.
        </p>
        <div className="mt-6">
          <NewsletterSignup />
        </div>
      </section>

      <p className="mt-14 max-w-2xl text-sm text-muted-foreground">
        The Commerce Media Brief is compiled weekly from public reporting;
        every link goes to the original source. Nothing here draws on
        non-public information.
      </p>
    </main>
  );
}

export default BriefEditionPage;
