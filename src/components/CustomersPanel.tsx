import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  status: string;
  source: string;
  notes: string;
  created_at: string;
}

interface Subscriber {
  email: string;
  created_at: string;
  unsubscribed_at: string | null;
}

const statuses = ["lead", "prospect", "client", "past"] as const;
const emptyForm = { name: "", email: "", company: "", status: "lead", notes: "" };

const inputClasses =
  "w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground focus:border-accent focus:outline-none";
const labelClasses = "block text-sm font-semibold";

function friendlyError(message: string): string {
  return message.includes("row-level security")
    ? "Not allowed: this email isn't on the editor list."
    : message;
}

function CustomersPanel() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [query, setQuery] = useState("");
  const [form, setForm] = useState({ ...emptyForm });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState("");

  async function load() {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      setStatus(friendlyError(error.message));
      return;
    }
    setCustomers(data ?? []);
    const subs = await supabase
      .from("brief_subscribers")
      .select("email, created_at, unsubscribed_at")
      .order("created_at", { ascending: false });
    if (!subs.error) setSubscribers(subs.data ?? []);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter((c) =>
      [c.name, c.email, c.company, c.notes, c.status]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [customers, query]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(editingId ? "Updating…" : "Adding…");
    const { error } = editingId
      ? await supabase.from("customers").update({ ...form }).eq("id", editingId)
      : await supabase.from("customers").insert({ ...form, source: "manual" });
    if (error) {
      setStatus(friendlyError(error.message));
      return;
    }
    setForm({ ...emptyForm });
    setEditingId(null);
    setStatus(editingId ? "Updated." : "Added.");
    load();
  }

  function startEdit(customer: Customer) {
    setEditingId(customer.id);
    setForm({
      name: customer.name,
      email: customer.email,
      company: customer.company,
      status: customer.status,
      notes: customer.notes,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function remove(customer: Customer) {
    if (!window.confirm(`Delete ${customer.name || customer.email}?`)) return;
    const { error } = await supabase
      .from("customers")
      .delete()
      .eq("id", customer.id);
    setStatus(error ? friendlyError(error.message) : "Deleted.");
    load();
  }

  return (
    <div className="space-y-10">
      <section className="rounded-2xl border border-border bg-card p-8">
        <h2 className="font-display text-xl font-semibold">
          {editingId ? "Edit contact" : "Add a contact"}
        </h2>
        <form onSubmit={submit} className="mt-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={labelClasses}>
              Name
              <input
                className={`mt-1 ${inputClasses}`}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>
            <label className={labelClasses}>
              Email
              <input
                type="email"
                className={`mt-1 ${inputClasses}`}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </label>
            <label className={labelClasses}>
              Company
              <input
                className={`mt-1 ${inputClasses}`}
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
            </label>
            <label className={labelClasses}>
              Status
              <select
                className={`mt-1 ${inputClasses}`}
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className={labelClasses}>
            Notes
            <textarea
              rows={3}
              className={`mt-1 ${inputClasses}`}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </label>
          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90"
            >
              {editingId ? "Save changes" : "Add contact"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm({ ...emptyForm });
                }}
                className="rounded-full border border-border px-6 py-3 font-medium hover:bg-muted"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
        {status && <p className="mt-3 font-medium text-accent">{status}</p>}
      </section>

      <section className="rounded-2xl border border-border bg-card p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-xl font-semibold">
            Contacts ({customers.length})
          </h2>
          <input
            placeholder="Search name, company, notes…"
            className={`${inputClasses} max-w-xs`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Company</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Source</th>
                <th className="py-2 pr-4">Added</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-border align-top">
                  <td className="py-3 pr-4 font-medium">
                    {c.name || "—"}
                    {c.notes && (
                      <div className="mt-1 max-w-xs whitespace-pre-line text-xs font-normal text-muted-foreground">
                        {c.notes}
                      </div>
                    )}
                  </td>
                  <td className="py-3 pr-4">{c.email || "—"}</td>
                  <td className="py-3 pr-4">{c.company || "—"}</td>
                  <td className="py-3 pr-4">
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">
                    {c.source === "contact-form" ? "Site form" : "Manual"}
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">
                    {new Date(c.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => startEdit(c)}
                      className="font-medium text-accent hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => remove(c)}
                      className="ml-4 font-medium text-muted-foreground hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-6 text-muted-foreground">
                    No contacts yet. Leads from the site's contact form land
                    here automatically.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-muted/50 p-8">
        <h2 className="font-display text-xl font-semibold">
          Newsletter subscribers (
          {subscribers.filter((s) => !s.unsubscribed_at).length} active)
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Subscribed</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s) => (
                <tr key={s.email} className="border-b border-border">
                  <td className="py-2 pr-4">{s.email}</td>
                  <td className="py-2 pr-4 text-muted-foreground">
                    {new Date(s.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-2">
                    {s.unsubscribed_at ? (
                      <span className="text-muted-foreground">Unsubscribed</span>
                    ) : (
                      <span className="font-medium">Active</span>
                    )}
                  </td>
                </tr>
              ))}
              {subscribers.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-4 text-muted-foreground">
                    No subscribers yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default CustomersPanel;
