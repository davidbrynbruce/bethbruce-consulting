import type { BriefEdition } from "../types";

const modules = import.meta.glob<{ edition: BriefEdition }>("./edition-*.ts", {
  eager: true,
});

/** All editions, newest first. */
export const editions: BriefEdition[] = Object.values(modules)
  .map((m) => m.edition)
  .sort((a, b) => b.slug.localeCompare(a.slug));

export const latestEdition: BriefEdition | undefined = editions[0];
