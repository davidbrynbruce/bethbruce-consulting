import { Link } from "react-router-dom";
import ContactForm from "@/components/ContactForm";
import { latestEdition } from "@/content/briefs";

const advisoryOfferings = [
  {
    title: "Strategy projects",
    description:
      "Focused engagements that answer a hard question: where to play, how to win, and what to build next.",
  },
  {
    title: "Market & positioning",
    description:
      "How the market sees you, how it should, and the narrative and packaging to close the gap.",
  },
  {
    title: "Executive advisory",
    description:
      "Ongoing counsel for leadership teams navigating commerce media's fastest-moving decisions.",
  },
  {
    title: "Speaking & keynotes",
    description:
      "Keynotes and conference sessions on where commerce media is heading and what it means for the industry.",
  },
  {
    title: "Executive workshops",
    description:
      "Working sessions that align leadership teams around strategy, story, and go-to-market.",
  },
];

const credentials = [
  "20+ years in marketing and corporate communications",
  "Most recently Senior Director of Corporate Communications at Walmart",
  "Led communications for Walmart's growth businesses, including its retail media network, Walmart Connect",
  "Builder of high-performing teams and executive-level narratives",
];

function Home() {
  const latest = latestEdition;
  return (
    <main>
      <section className="mx-auto max-w-content px-6 pb-20 pt-24 sm:pt-32">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
          Independent Commerce Media Analyst &amp; Advisor
        </p>
        <h1 className="max-w-3xl font-display text-4xl font-medium leading-tight sm:text-6xl">
          Clear thinking on commerce media — and clear-eyed advice for the
          companies building it.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          I spent two decades inside one of the world's largest retailers, most
          recently leading communications for Walmart's growth businesses,
          including its retail media network. Now I analyze the commerce media
          landscape independently — and advise the networks, brands, agencies,
          and technology companies shaping it.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            to="/brief"
            className="rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90"
          >
            Read The Commerce Media Brief
          </Link>
          <a
            href="#advisory"
            className="rounded-full border border-border px-6 py-3 font-medium hover:bg-muted"
          >
            Advisory services
          </a>
        </div>
      </section>

      <section id="brief" className="border-y border-border bg-muted/50">
        <div className="mx-auto max-w-content px-6 py-20">
          <h2 className="font-display text-3xl font-medium sm:text-4xl">
            The Commerce Media Brief
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            What actually matters in retail media this week. A weekly external
            review of the commerce media landscape, plus independent analysis
            and commentary on LinkedIn.
          </p>

          {latest && (
            <Link
              to={`/brief/${latest.slug}`}
              className="mt-10 block rounded-2xl border border-border bg-card p-8 transition-colors hover:border-accent"
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-accent">
                Latest edition · {latest.weekOf}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
                {latest.title}
              </h3>
              <p className="mt-3 max-w-3xl text-muted-foreground">
                {latest.dek}
              </p>
              <span className="mt-4 inline-block font-medium text-accent">
                Read this week's Brief →
              </span>
            </Link>
          )}

          {latest && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {latest.stories.map((story) => (
                <Link
                  key={story.slug}
                  to={`/brief/${latest.slug}#${story.slug}`}
                  className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                    {story.category}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold">
                    {story.headline}
                  </h3>
                  <span className="mt-3 inline-block text-sm font-medium text-accent">
                    Read →
                  </span>
                </Link>
              ))}
            </div>
          )}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/brief"
              className="inline-block rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90"
            >
              Browse all editions
            </Link>
            <a
              href="https://www.linkedin.com/in/bethmbruce"
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-full border border-border px-6 py-3 font-medium hover:bg-muted"
            >
              Follow along on LinkedIn
            </a>
          </div>
        </div>
      </section>

      <section id="advisory" className="mx-auto max-w-content px-6 py-20">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
          Commerce Growth Advisory
        </p>
        <h2 className="font-display text-3xl font-medium sm:text-4xl">
          Advisory
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Commercial engagements run through Commerce Growth Advisory — working
          with retail media networks, CPGs, agencies, and commerce technology
          companies.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {advisoryOfferings.map((offering) => (
            <div
              key={offering.title}
              className="rounded-2xl border border-border bg-card p-8"
            >
              <h3 className="font-display text-xl font-semibold">
                {offering.title}
              </h3>
              <p className="mt-3 text-muted-foreground">
                {offering.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="border-t border-border bg-muted/50">
        <div className="mx-auto max-w-content px-6 py-20">
          <div className="grid items-start gap-12 md:grid-cols-2">
            <div>
              <a
                href="https://www.linkedin.com/in/bethmbruce"
                target="_blank"
                rel="noreferrer"
                aria-label="Beth Bruce on LinkedIn"
                className="relative block h-28 w-28 overflow-hidden rounded-full border-2 border-accent bg-primary transition-opacity hover:opacity-90"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 flex items-center justify-center font-display text-3xl font-semibold text-accent"
                >
                  BB
                </span>
                <img
                  src="/beth-bruce.jpg"
                  alt="Beth Bruce"
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </a>
              <h2 className="mt-6 font-display text-3xl font-medium sm:text-4xl">
                About Beth
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Beth Bruce is an independent commerce media analyst and advisor
                who has spent her career at the intersection of retail, media,
                and growth. She writes The Commerce Media Brief and advises the
                companies building the commerce media ecosystem on strategy,
                positioning, and communications.
              </p>
              <a
                href="https://www.linkedin.com/in/bethmbruce"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-block rounded-full border border-border bg-card px-6 py-3 font-medium hover:bg-muted"
              >
                View LinkedIn profile →
              </a>
            </div>
            <ul className="space-y-4">
              {credentials.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="contact" className="border-t border-border bg-primary">
        <div className="mx-auto max-w-content px-6 py-20 text-primary-foreground">
          <div className="grid items-start gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl font-medium sm:text-4xl">
                Let's talk.
              </h2>
              <p className="mt-4 max-w-xl text-primary-foreground/80">
                Building or scaling in commerce media? Reach out for an
                introductory conversation about advisory, speaking, or
                workshops — or just say hello.
              </p>
              <a
                href="https://www.linkedin.com/in/bethmbruce"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-block rounded-full border border-primary-foreground/30 px-6 py-3 font-medium hover:bg-primary-foreground/10"
              >
                Connect on LinkedIn
              </a>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
