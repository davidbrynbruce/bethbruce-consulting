import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import CustomersPanel from "@/components/CustomersPanel";
import { supabase } from "@/lib/supabaseClient";
import { defaultContent, mergeContent } from "@/content/siteContent";
import type { SiteContent } from "@/content/siteContent";

const inputClasses =
  "w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground focus:border-accent focus:outline-none";
const labelClasses = "block text-sm font-semibold";

function AuthForm() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    setBusy(true);
    setMessage("");
    const { error } =
      mode === "signin"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });
    setBusy(false);
    if (error) {
      setMessage(error.message);
    } else if (mode === "signup") {
      setMessage(
        "Account created. Check your email for a confirmation link, then sign in.",
      );
      setMode("signin");
    }
  }

  return (
    <main className="mx-auto max-w-md px-6 py-24">
      <h1 className="font-display text-3xl font-medium">Site editor</h1>
      <p className="mt-3 text-muted-foreground">
        {mode === "signin"
          ? "Sign in to edit the site's text and images."
          : "First time here? Create your account (one-time email confirmation)."}
      </p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label className={labelClasses}>
          Email
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            className={`mt-1 ${inputClasses}`}
          />
        </label>
        <label className={labelClasses}>
          Password
          <input
            required
            name="password"
            type="password"
            autoComplete={
              mode === "signin" ? "current-password" : "new-password"
            }
            minLength={8}
            className={`mt-1 ${inputClasses}`}
          />
        </label>
        <button
          type="submit"
          disabled={busy}
          className="rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60"
        >
          {mode === "signin" ? "Sign in" : "Create account"}
        </button>
      </form>
      <button
        type="button"
        onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
        className="mt-4 text-sm font-medium text-accent hover:underline"
      >
        {mode === "signin"
          ? "First time? Create an account"
          : "Already have an account? Sign in"}
      </button>
      {message && <p className="mt-4 text-sm text-muted-foreground">{message}</p>}
      <p className="mt-8 text-xs text-muted-foreground">
        Only approved editor emails can save changes, whoever signs in.
      </p>
    </main>
  );
}

function Editor({ session }: { session: Session }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase
      .from("site_content")
      .select("data")
      .eq("id", "site")
      .maybeSingle()
      .then(({ data }) => setContent(mergeContent(data?.data)));
  }, []);

  function patch(updater: (draft: SiteContent) => SiteContent) {
    setContent((current) => updater(structuredClone(current)));
  }

  async function save() {
    setBusy(true);
    setStatus("Saving…");
    const { error } = await supabase
      .from("site_content")
      .upsert({ id: "site", data: content });
    setBusy(false);
    setStatus(
      error
        ? error.message.includes("row-level security")
          ? "Not saved: this email isn't on the editor list."
          : `Not saved: ${error.message}`
        : "Saved — the live site shows this on next page load.",
    );
  }

  async function uploadHeadshot(file: File) {
    setBusy(true);
    setStatus("Uploading image…");
    const ext = file.name.split(".").pop() || "jpg";
    const path = `headshot-${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from("site-assets")
      .upload(path, file);
    if (error) {
      setBusy(false);
      setStatus(`Upload failed: ${error.message}`);
      return;
    }
    const { data } = supabase.storage.from("site-assets").getPublicUrl(path);
    patch((draft) => {
      draft.about.imageUrl = data.publicUrl;
      return draft;
    });
    setBusy(false);
    setStatus("Image uploaded — click Save to publish it.");
  }

  async function changePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const password = String(
      new FormData(event.currentTarget).get("newPassword") || "",
    );
    const { error } = await supabase.auth.updateUser({ password });
    setStatus(error ? `Password not changed: ${error.message}` : "Password changed.");
  }

  return (
    <main className="mx-auto max-w-content px-6 pb-24 pt-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-medium">Site editor</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Signed in as {session.user.email}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={save}
            disabled={busy}
            className="rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60"
          >
            Save changes
          </button>
          <button
            onClick={() => supabase.auth.signOut()}
            className="rounded-full border border-border px-6 py-3 font-medium hover:bg-muted"
          >
            Sign out
          </button>
        </div>
      </div>
      {status && <p className="mt-4 font-medium text-accent">{status}</p>}

      <div className="mt-10 space-y-10">
        <section className="rounded-2xl border border-border bg-card p-8">
          <h2 className="font-display text-xl font-semibold">Hero</h2>
          <div className="mt-4 space-y-4">
            <label className={labelClasses}>
              Kicker (small line above the headline)
              <input
                className={`mt-1 ${inputClasses}`}
                value={content.hero.kicker}
                onChange={(e) =>
                  patch((d) => ((d.hero.kicker = e.target.value), d))
                }
              />
            </label>
            <label className={labelClasses}>
              Headline
              <textarea
                rows={2}
                className={`mt-1 ${inputClasses}`}
                value={content.hero.headline}
                onChange={(e) =>
                  patch((d) => ((d.hero.headline = e.target.value), d))
                }
              />
            </label>
            <label className={labelClasses}>
              Intro paragraph
              <textarea
                rows={4}
                className={`mt-1 ${inputClasses}`}
                value={content.hero.sub}
                onChange={(e) => patch((d) => ((d.hero.sub = e.target.value), d))}
              />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-8">
          <h2 className="font-display text-xl font-semibold">
            The Commerce Media Brief — intro
          </h2>
          <textarea
            rows={3}
            className={`mt-4 ${inputClasses}`}
            value={content.brief.intro}
            onChange={(e) => patch((d) => ((d.brief.intro = e.target.value), d))}
          />
          <p className="mt-2 text-xs text-muted-foreground">
            The weekly editions themselves are published automatically and
            aren't edited here.
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-card p-8">
          <h2 className="font-display text-xl font-semibold">Advisory</h2>
          <label className={`mt-4 ${labelClasses}`}>
            Intro paragraph
            <textarea
              rows={3}
              className={`mt-1 ${inputClasses}`}
              value={content.advisory.intro}
              onChange={(e) =>
                patch((d) => ((d.advisory.intro = e.target.value), d))
              }
            />
          </label>
          <div className="mt-6 space-y-5">
            {content.advisory.offerings.map((offering, i) => (
              <div key={i} className="rounded-xl border border-border p-4">
                <label className={labelClasses}>
                  Offering {i + 1} — title
                  <input
                    className={`mt-1 ${inputClasses}`}
                    value={offering.title}
                    onChange={(e) =>
                      patch(
                        (d) => (
                          (d.advisory.offerings[i].title = e.target.value), d
                        ),
                      )
                    }
                  />
                </label>
                <label className={`mt-3 ${labelClasses}`}>
                  Description
                  <textarea
                    rows={2}
                    className={`mt-1 ${inputClasses}`}
                    value={offering.description}
                    onChange={(e) =>
                      patch(
                        (d) => (
                          (d.advisory.offerings[i].description =
                            e.target.value),
                          d
                        ),
                      )
                    }
                  />
                </label>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-8">
          <h2 className="font-display text-xl font-semibold">About Beth</h2>
          <label className={`mt-4 ${labelClasses}`}>
            Bio
            <textarea
              rows={4}
              className={`mt-1 ${inputClasses}`}
              value={content.about.bio}
              onChange={(e) => patch((d) => ((d.about.bio = e.target.value), d))}
            />
          </label>
          <label className={`mt-4 ${labelClasses}`}>
            Credential bullets (one per line)
            <textarea
              rows={5}
              className={`mt-1 ${inputClasses}`}
              value={content.about.credentials.join("\n")}
              onChange={(e) =>
                patch(
                  (d) => (
                    (d.about.credentials = e.target.value
                      .split("\n")
                      .filter((line) => line.trim() !== "")),
                    d
                  ),
                )
              }
            />
          </label>
          <div className="mt-6 flex items-center gap-6">
            <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-accent bg-primary">
              {content.about.imageUrl && (
                <img
                  src={content.about.imageUrl}
                  alt="Headshot preview"
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <label className={labelClasses}>
              Headshot photo
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="mt-1 block text-sm"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadHeadshot(file);
                }}
              />
              <span className="mt-1 block text-xs font-normal text-muted-foreground">
                JPG/PNG/WebP. Uploads immediately; click Save to put it live.
              </span>
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-8">
          <h2 className="font-display text-xl font-semibold">Contact</h2>
          <label className={`mt-4 ${labelClasses}`}>
            Heading
            <input
              className={`mt-1 ${inputClasses}`}
              value={content.contact.heading}
              onChange={(e) =>
                patch((d) => ((d.contact.heading = e.target.value), d))
              }
            />
          </label>
          <label className={`mt-4 ${labelClasses}`}>
            Blurb
            <textarea
              rows={3}
              className={`mt-1 ${inputClasses}`}
              value={content.contact.blurb}
              onChange={(e) =>
                patch((d) => ((d.contact.blurb = e.target.value), d))
              }
            />
          </label>
        </section>

        <section className="rounded-2xl border border-border bg-card p-8">
          <h2 className="font-display text-xl font-semibold">
            Resume page (/resume)
          </h2>
          <div className="mt-4 space-y-4">
            <label className={labelClasses}>
              Headline
              <input
                className={`mt-1 ${inputClasses}`}
                value={content.resume.headline}
                onChange={(e) =>
                  patch((d) => ((d.resume.headline = e.target.value), d))
                }
              />
            </label>
            <label className={labelClasses}>
              Location
              <input
                className={`mt-1 ${inputClasses}`}
                value={content.resume.location}
                onChange={(e) =>
                  patch((d) => ((d.resume.location = e.target.value), d))
                }
              />
            </label>
            <label className={labelClasses}>
              Summary
              <textarea
                rows={4}
                className={`mt-1 ${inputClasses}`}
                value={content.resume.summary}
                onChange={(e) =>
                  patch((d) => ((d.resume.summary = e.target.value), d))
                }
              />
            </label>
            <div className="space-y-5">
              {content.resume.roles.map((role, i) => (
                <div key={i} className="rounded-xl border border-border p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">Role {i + 1}</span>
                    <button
                      type="button"
                      onClick={() =>
                        patch(
                          (d) => (d.resume.roles.splice(i, 1), d),
                        )
                      }
                      className="text-sm font-medium text-muted-foreground hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    <label className={labelClasses}>
                      Title
                      <input
                        className={`mt-1 ${inputClasses}`}
                        value={role.title}
                        onChange={(e) =>
                          patch(
                            (d) => (
                              (d.resume.roles[i].title = e.target.value), d
                            ),
                          )
                        }
                      />
                    </label>
                    <label className={labelClasses}>
                      Organization
                      <input
                        className={`mt-1 ${inputClasses}`}
                        value={role.org}
                        onChange={(e) =>
                          patch(
                            (d) => ((d.resume.roles[i].org = e.target.value), d),
                          )
                        }
                      />
                    </label>
                    <label className={labelClasses}>
                      Period
                      <input
                        className={`mt-1 ${inputClasses}`}
                        value={role.period}
                        onChange={(e) =>
                          patch(
                            (d) => (
                              (d.resume.roles[i].period = e.target.value), d
                            ),
                          )
                        }
                      />
                    </label>
                  </div>
                  <label className={`mt-3 ${labelClasses}`}>
                    Bullets (one per line)
                    <textarea
                      rows={3}
                      className={`mt-1 ${inputClasses}`}
                      value={role.bullets.join("\n")}
                      onChange={(e) =>
                        patch(
                          (d) => (
                            (d.resume.roles[i].bullets = e.target.value
                              .split("\n")
                              .filter((line) => line.trim() !== "")),
                            d
                          ),
                        )
                      }
                    />
                  </label>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  patch(
                    (d) => (
                      d.resume.roles.push({
                        title: "",
                        org: "",
                        period: "",
                        bullets: [],
                      }),
                      d
                    ),
                  )
                }
                className="rounded-full border border-border px-5 py-2 text-sm font-medium hover:bg-muted"
              >
                + Add role
              </button>
            </div>
            <label className={labelClasses}>
              Expertise (one per line)
              <textarea
                rows={5}
                className={`mt-1 ${inputClasses}`}
                value={content.resume.expertise.join("\n")}
                onChange={(e) =>
                  patch(
                    (d) => (
                      (d.resume.expertise = e.target.value
                        .split("\n")
                        .filter((line) => line.trim() !== "")),
                      d
                    ),
                  )
                }
              />
            </label>
            <label className={labelClasses}>
              Education
              <input
                className={`mt-1 ${inputClasses}`}
                value={content.resume.education}
                onChange={(e) =>
                  patch((d) => ((d.resume.education = e.target.value), d))
                }
              />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-muted/50 p-8">
          <h2 className="font-display text-xl font-semibold">
            Change password
          </h2>
          <form onSubmit={changePassword} className="mt-4 flex flex-wrap gap-3">
            <input
              required
              name="newPassword"
              type="password"
              minLength={8}
              placeholder="New password"
              autoComplete="new-password"
              className={`${inputClasses} max-w-xs`}
            />
            <button
              type="submit"
              className="rounded-full border border-border bg-card px-6 py-3 font-medium hover:bg-muted"
            >
              Update
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<"content" | "customers">("content");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) =>
      setSession(s),
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!ready) {
    return (
      <main className="mx-auto max-w-md px-6 py-24 text-muted-foreground">
        Loading…
      </main>
    );
  }
  if (!session) return <AuthForm />;
  return (
    <div>
      <div className="mx-auto max-w-content px-6 pt-10">
        <div className="flex gap-2 border-b border-border">
          <button
            onClick={() => setTab("content")}
            className={`rounded-t-lg px-5 py-3 text-sm font-semibold ${
              tab === "content"
                ? "border border-b-0 border-border bg-card text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Site content
          </button>
          <button
            onClick={() => setTab("customers")}
            className={`rounded-t-lg px-5 py-3 text-sm font-semibold ${
              tab === "customers"
                ? "border border-b-0 border-border bg-card text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Customers
          </button>
        </div>
      </div>
      {tab === "content" ? (
        <Editor session={session} />
      ) : (
        <main className="mx-auto max-w-content px-6 pb-24 pt-10">
          <CustomersPanel />
        </main>
      )}
    </div>
  );
}

export default AdminPage;
