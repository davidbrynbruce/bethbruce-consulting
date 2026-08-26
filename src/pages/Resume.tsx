import { Link } from "react-router-dom";
import { useSiteContent } from "@/content/siteContent";

function ResumePage() {
  const content = useSiteContent();
  const resume = content.resume;

  return (
    <main className="mx-auto max-w-3xl px-6 pb-24 pt-16 sm:pt-20">
      <header className="border-b border-border pb-8">
        <h1 className="font-display text-5xl font-medium">Beth Bruce</h1>
        <p className="mt-3 text-lg font-medium text-accent">
          {resume.headline}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span>{resume.location}</span>
          <a
            href="https://www.linkedin.com/in/bethmbruce"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-accent hover:underline"
          >
            LinkedIn
          </a>
          <Link
            to="/#contact"
            className="font-medium text-accent hover:underline"
          >
            Contact
          </Link>
        </div>
        <p className="mt-6 text-muted-foreground">{resume.summary}</p>
      </header>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">
          Experience
        </h2>
        <div className="mt-6 space-y-8">
          {resume.roles.map((role) => (
            <article key={role.title + role.org}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-display text-xl font-semibold">
                  {role.title}
                </h3>
                <span className="text-sm text-muted-foreground">
                  {role.period}
                </span>
              </div>
              <p className="mt-1 font-medium text-muted-foreground">
                {role.org}
              </p>
              <ul className="mt-3 space-y-2">
                {role.bullets.map((bullet) => (
                  <li key={bullet.slice(0, 40)} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <span className="text-foreground/90">{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 border-t border-border pt-8">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">
          Expertise
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {resume.expertise.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      {resume.education.trim() !== "" && (
        <section className="mt-10 border-t border-border pt-8">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">
            Education
          </h2>
          <p className="mt-4 text-foreground/90">{resume.education}</p>
        </section>
      )}

      <p className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground">
        Beth writes{" "}
        <Link to="/brief" className="font-medium text-accent hover:underline">
          The Commerce Media Brief
        </Link>{" "}
        and advises through{" "}
        <Link to="/#advisory" className="font-medium text-accent hover:underline">
          Commerce Growth Advisory
        </Link>
        .
      </p>
    </main>
  );
}

export default ResumePage;
