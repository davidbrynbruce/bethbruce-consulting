export interface BriefLink {
  label: string;
  source: string;
  url: string;
}

export interface BriefStory {
  /** Section anchor on the edition page (/brief/<edition-slug>#<slug>) — short, kebab-case, usually the subject, e.g. "walmart", "criteo" */
  slug: string;
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
