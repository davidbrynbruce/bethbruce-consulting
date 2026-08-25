export interface BriefLink {
  label: string;
  source: string;
  url: string;
}

export interface BriefStory {
  category: string;
  headline: string;
  body: string[];
  links: BriefLink[];
}

export interface QuickHit {
  text: string;
  source: string;
  url: string;
}

export interface BriefEdition {
  /** Publish date, YYYY-MM-DD — also the URL slug (/brief/<slug>) */
  slug: string;
  weekOf: string;
  title: string;
  dek: string;
  stories: BriefStory[];
  quickHits: QuickHit[];
}
