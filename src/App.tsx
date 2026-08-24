const briefQuestions = [
  "Which retail media networks are actually gaining momentum?",
  "What are advertisers demanding?",
  "Which RMNs have the strongest positioning?",
  "Where is retail media heading — and what are retailers getting wrong?",
  "What does it all mean for CPGs?",
  "Which commerce technologies are worth watching?",
];

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

function App() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
        <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
          <a href="#top" className="font-display text-lg font-semibold">
            Beth Bruce
          </a>
          <div className="hidden items-center gap-8 text-sm font-medium text-muted-foreground sm:flex">
            <a href="#brief" className="hover:text-foreground">
              The Brief
            </a>
            <a href="#advisory" className="hover:text-foreground">
              Advisory
            </a>
            <a href="#about" className="hover:text-foreground">
              About
            </a>
            <a
              href="#contact"
              className="rounded-full bg-primary px-4 py-2 text-primary-foreground hover:opacity-90"
            >
              Get in touch
            </a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="mx-auto max-w-content px-6 pb-20 pt-24 sm:pt-32">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-accent">
            Independent Commerce Media Analyst &amp; Advisor
          </p>
          <h1 className="max-w-3xl font-display text-4xl font-medium leading-tight sm:text-6xl">
            Clear thinking on commerce media — and clear-eyed advice for the
            companies building it.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            I spent two decades inside one of the world's largest retailers,
            most recently leading communications for Walmart's growth
            businesses, including its retail media network. Now I analyze the
            commerce media landscape independently — and advise the networks,
            brands, agencies, and technology companies shaping it.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#brief"
              className="rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90"
            >
              Read The Commerce Media Brief
            </a>
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
              What actually matters in retail media this week. Independent
              analysis and commentary, published on LinkedIn.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {briefQuestions.map((question) => (
                <div
                  key={question}
                  className="rounded-2xl border border-border bg-card p-6 font-display text-lg"
                >
                  {question}
                </div>
              ))}
            </div>
            <a
              href="https://www.linkedin.com/in/bethmbruce"
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-block rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90"
            >
              Follow along on LinkedIn
            </a>
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
            Commercial engagements run through Commerce Growth Advisory —
            working with retail media networks, CPGs, agencies, and commerce
            technology companies.
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
                <h2 className="font-display text-3xl font-medium sm:text-4xl">
                  About Beth
                </h2>
                <p className="mt-6 text-lg text-muted-foreground">
                  Beth Bruce is an independent commerce media analyst and
                  advisor who has spent her career at the intersection of
                  retail, media, and growth. She writes The Commerce Media
                  Brief and advises the companies building the commerce media
                  ecosystem on strategy, positioning, and communications.
                </p>
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
            <h2 className="font-display text-3xl font-medium sm:text-4xl">
              Let's talk.
            </h2>
            <p className="mt-4 max-w-xl text-primary-foreground/80">
              Building or scaling in commerce media? Reach out for an
              introductory conversation about advisory, speaking, or
              workshops.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="mailto:hello@example.com"
                className="inline-block rounded-full bg-accent px-6 py-3 font-medium text-accent-foreground hover:opacity-90"
              >
                hello@example.com
              </a>
              <a
                href="https://www.linkedin.com/in/bethmbruce"
                target="_blank"
                rel="noreferrer"
                className="inline-block rounded-full border border-primary-foreground/30 px-6 py-3 font-medium hover:bg-primary-foreground/10"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-muted-foreground">
        <span>
          © {new Date().getFullYear()} Beth Bruce · Commerce Growth Advisory
        </span>
        <a
          href="https://www.linkedin.com/in/bethmbruce"
          target="_blank"
          rel="noreferrer"
          className="hover:text-foreground"
        >
          LinkedIn
        </a>
      </footer>
    </div>
  );
}

export default App;
