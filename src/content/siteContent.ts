import { useEffect, useState } from "react";
import { SUPABASE_KEY, SUPABASE_URL } from "@/lib/supabaseConfig";

export interface Offering {
  title: string;
  description: string;
}

export interface SiteContent {
  hero: { kicker: string; headline: string; sub: string };
  brief: { intro: string };
  advisory: { intro: string; offerings: Offering[] };
  about: { bio: string; credentials: string[]; imageUrl: string };
  contact: { heading: string; blurb: string };
}

export const defaultContent: SiteContent = {
  hero: {
    kicker: "Independent Commerce Media Analyst & Advisor",
    headline:
      "Clear thinking on commerce media — and clear-eyed advice for the companies building it.",
    sub: "I spent two decades inside one of the world's largest retailers, most recently leading communications for Walmart's growth businesses, including its retail media network. Now I analyze the commerce media landscape independently — and advise the networks, brands, agencies, and technology companies shaping it.",
  },
  brief: {
    intro:
      "What actually matters in retail media this week. A weekly external review of the commerce media landscape — delivered to your inbox when each edition publishes.",
  },
  advisory: {
    intro:
      "Commercial engagements run through Commerce Growth Advisory — working with retail media networks, CPGs, agencies, and commerce technology companies.",
    offerings: [
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
    ],
  },
  about: {
    bio: "Beth Bruce is an independent commerce media analyst and advisor who has spent her career at the intersection of retail, media, and growth. She writes The Commerce Media Brief and advises the companies building the commerce media ecosystem on strategy, positioning, and communications.",
    credentials: [
      "20+ years in marketing and corporate communications",
      "Most recently Senior Director of Corporate Communications at Walmart",
      "Led communications for Walmart's growth businesses, including its retail media network, Walmart Connect",
      "Builder of high-performing teams and executive-level narratives",
    ],
    imageUrl: "",
  },
  contact: {
    heading: "Let's talk.",
    blurb:
      "Building or scaling in commerce media? Reach out for an introductory conversation about advisory, speaking, or workshops — or just say hello.",
  },
};

function mergeSection<T extends object>(base: T, saved: unknown): T {
  if (!saved || typeof saved !== "object") return base;
  const out = { ...base } as Record<string, unknown>;
  for (const [key, value] of Object.entries(saved as Record<string, unknown>)) {
    if (!(key in base)) continue;
    if (Array.isArray(value)) {
      if (value.length > 0) out[key] = value;
    } else if (typeof value === "string") {
      if (value.trim() !== "") out[key] = value;
    } else if (value && typeof value === "object") {
      out[key] = mergeSection(
        (base as Record<string, unknown>)[key] as object,
        value,
      );
    }
  }
  return out as T;
}

export function mergeContent(saved: unknown): SiteContent {
  if (!saved || typeof saved !== "object") return defaultContent;
  const record = saved as Record<string, unknown>;
  return {
    hero: mergeSection(defaultContent.hero, record.hero),
    brief: mergeSection(defaultContent.brief, record.brief),
    advisory: mergeSection(defaultContent.advisory, record.advisory),
    about: mergeSection(defaultContent.about, record.about),
    contact: mergeSection(defaultContent.contact, record.contact),
  };
}

let cached: Promise<SiteContent> | null = null;

export function fetchSiteContent(): Promise<SiteContent> {
  if (!cached) {
    cached = fetch(
      `${SUPABASE_URL}/rest/v1/site_content?id=eq.site&select=data`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      },
    )
      .then((res) => (res.ok ? res.json() : []))
      .then((rows) => mergeContent(rows?.[0]?.data))
      .catch(() => defaultContent);
  }
  return cached;
}

export function useSiteContent(): SiteContent {
  const [content, setContent] = useState(defaultContent);
  useEffect(() => {
    let alive = true;
    fetchSiteContent().then((c) => {
      if (alive) setContent(c);
    });
    return () => {
      alive = false;
    };
  }, []);
  return content;
}
