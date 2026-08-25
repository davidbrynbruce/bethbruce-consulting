import type { BriefEdition } from "../types";

export const edition: BriefEdition = {
  slug: "2026-08-24",
  weekOf: "Week of August 18–24, 2026",
  title: "Walmart flexes, Criteo rewires, and the agents arrive",
  dek: "The week retail media's center of gravity showed itself: Walmart made advertising the star of its earnings, Criteo reorganized for a harder market, the measurement referees made their move, and AI agents officially became ad inventory.",
  stories: [
    {
      slug: "walmart",
      category: "RMN Momentum",
      headline: "Walmart makes advertising the star of its earnings week",
      body: [
        "Walmart's Q2 FY27 results, reported August 20, put the ads business front and center: global advertising grew 38%, Walmart Connect grew 43% in the US excluding Vizio, and management raised full-year sales and operating income guidance with the ads flywheel doing much of the narrative work. The trade press spent the week treating Walmart's advertising strength as the story, not the sidebar.",
        "It caps a summer of aggressive expansion — the Vibe.co acquisition closed August 4 to bring self-serve CTV inside Walmart Connect, ads are coming to the Sparky shopping agent, and a \"Marty\" advertising assistant is in beta for Sponsored Search. The read: Walmart is assembling a genuine full-funnel stack and pointing it directly at Amazon — and it now has the growth numbers to make Wall Street care.",
      ],
      links: [
        {
          label: "Walmart releases Q2 FY27 earnings",
          source: "Walmart corporate",
          url: "https://corporate.walmart.com/news/2026/08/20/walmart-releases-q2-fy27-earnings",
        },
        {
          label: "Walmart touts advertising strength as it boosts guidance",
          source: "AdExchanger",
          url: "https://www.adexchanger.com/daily-news-roundup/friday-21082026/",
        },
        {
          label:
            "Inside Walmart Connect's push to make agentic AI the next battleground",
          source: "Digiday",
          url: "https://digiday.com/marketing/inside-walmart-connects-push-to-make-agentic-ai-the-next-battleground-in-retail-media/",
        },
        {
          label: "Walmart Connect's full-funnel ambitions come into focus",
          source: "Digiday",
          url: "https://digiday.com/marketing/walmart-connects-full-funnel-ambitions-come-into-focus-with-amazon-in-its-sights/",
        },
      ],
    },
    {
      slug: "criteo",
      category: "Ad Tech",
      headline: "Criteo rewires its leadership bench amid client churn",
      body: [
        "Criteo named Amazon Ads veteran Edouard Dinichert as Chief Customer Officer and Connor McGogney as CFO — a reshuffle that lands while the company digests the loss of two anchor clients: Target's Roundel, which brought ad sales in-house sooner than expected, and Uber Eats' US business, which moved to Instacart.",
        "The read: the independent retail media technology layer is being squeezed from both ends — retailers insourcing at the top, profitability pressure underneath. Criteo's new bench signals a pivot toward customer depth and commerce audiences; whether it can out-execute the insourcing trend is the defining question of its next four quarters.",
      ],
      links: [
        {
          label: "Criteo announces strategic leadership appointments",
          source: "PR Newswire",
          url: "https://www.prnewswire.com/news-releases/criteo-announces-strategic-leadership-appointments-to-accelerate-growth-and-innovation-302516860.html",
        },
        {
          label: "Criteo's client losses still weigh on results",
          source: "Adweek",
          url: "https://x.com/Adweek/status/2052125540128109016",
        },
      ],
    },
    {
      slug: "measurement",
      category: "Measurement & Standards",
      headline: "The measurement referees finally move",
      body: [
        "The ANA advanced its guidelines for standardizing retail media measurement on behalf of buy-side marketers, with early feedback described as overwhelmingly positive. Days earlier, the IAB Tech Lab's Connected Commerce Summit aired \"hard truths\" about retail media's transparency and comparability gaps.",
        "The read: with US retail media now a seventy-billion-dollar-plus line item, buyers are done letting every network grade its own homework. Networks that lean into standardization early can turn measurement from a defensive briefing topic into a sales asset — laggards will end up negotiating against a benchmark they didn't help write.",
      ],
      links: [
        {
          label: "ANA updates efforts to standardize retail media measurement",
          source: "Digiday",
          url: "https://digiday.com/marketing/ana-updates-efforts-to-standardize-retail-media-network-measurement/",
        },
        {
          label:
            "Hard truths for retail media at the IAB Tech Lab Connected Commerce Summit",
          source: "AdExchanger",
          url: "https://www.adexchanger.com/marketers/hard-truths-for-retail-media-at-the-iab-tech-lab-connected-commerce-summit/",
        },
      ],
    },
    {
      slug: "agentic-commerce",
      category: "Agentic Commerce",
      headline: "The agents officially become ad inventory",
      body: [
        "OpenAI switched on ChatGPT ads across 31 European markets on August 24 — six months after its US pilot — with ads limited to free tiers, visually separated from answers, and unpersonalized to satisfy GDPR. Meanwhile, new consumer research shows shoppers warming to agent-led purchases, with a majority crediting AI platforms for introducing them to brands they didn't know.",
        "The read: conversational surfaces are becoming ad inventory faster than most RMN roadmaps assumed. For retail media, the question is no longer whether agents will mediate shopping journeys — it's whose product data, whose retail signal, and whose ad units ride along when they do.",
      ],
      links: [
        {
          label: "OpenAI's ads business hits Europe at the six-month mark",
          source: "Digiday",
          url: "https://digiday.com/marketing/openais-ads-business-hits-europe-at-the-six-month-mark/",
        },
        {
          label: "ChatGPT to start showing ads across Europe",
          source: "Euronews",
          url: "https://www.euronews.com/next/2026/08/21/chatgpt-to-start-showing-ads-across-europe-next-week",
        },
        {
          label: "Consumers warm up to agentic AI purchases",
          source: "Retail Dive",
          url: "https://www.retaildive.com/news/retail-shoppers-warm-up-agentic-ai-purchases/827563/",
        },
      ],
    },
    {
      slug: "amazon",
      category: "Amazon",
      headline: "Amazon quietly ships the plumbing for agentic buying",
      body: [
        "While rivals announced agents, Amazon shipped infrastructure: the Amazon Ads MCP Server entered open beta — letting AI agents operate advertising workflows directly — and the Podcast Audience Network was folded into Amazon DSP for planning, execution, and measurement.",
        "The read: an MCP server is a bet that the next buyer of ads is software. When the company commanding roughly $57 billion in US retail media spend makes its stack agent-operable, that choice becomes a de facto standard — every RMN's 2027 roadmap just inherited a requirement.",
      ],
      links: [
        {
          label: "Amazon Ads newsroom: product and event announcements",
          source: "Amazon Ads",
          url: "https://advertising.amazon.com/library/newsroom",
        },
        {
          label:
            "FAQ on Amazon advertising: retail media dominance, Prime Video scale, and agentic ad tools",
          source: "eMarketer",
          url: "https://www.emarketer.com/content/faq-on-amazon-advertising--retail-media-dominance--prime-video-scale--agentic-ad-tools",
        },
      ],
    },
    {
      slug: "ad-tech-profit",
      category: "Money",
      headline: "Ad tech's profitability problem comes due",
      body: [
        "AdExchanger's Monday roundup — bluntly titled \"Ad Tech Without Profit\" — captured the sector's mounting profitability squeeze. Growth stories are no longer enough for public ad tech companies, and the pressure is bleeding into retail media's vendor layer.",
        "The read: retail media hasn't repealed gravity. As growth rates normalize, networks and their technology partners will be judged on operating discipline, not just top-line momentum — expect consolidation conversations to accelerate into Q4.",
      ],
      links: [
        {
          label: "Ad Tech Without Profit — Daily News Roundup",
          source: "AdExchanger",
          url: "https://www.adexchanger.com/daily-news-roundup/monday-24082026/",
        },
      ],
    },
  ],
  quickHits: [
    {
      text: "\"RMN-Mania\": the trade press declared retail media networks officially back in the spotlight.",
      source: "AdExchanger",
      url: "https://www.adexchanger.com/daily-news-roundup/friday-21082026/",
    },
    {
      text: "Walmart added long-requested search-keyword exclusions to its retail media offering.",
      source: "AdExchanger",
      url: "https://www.adexchanger.com/daily-news-roundup/thursday-13082026/",
    },
    {
      text: "Since splitting from Criteo, Target's Roundel has added a third sponsored slot to search and category pages, with advertisers reporting stronger ROAS.",
      source: "Adweek",
      url: "https://x.com/Adweek/status/2052125540128109016",
    },
    {
      text: "Home Depot's network keeps strengthening its non-endemic advertising play.",
      source: "MarTech",
      url: "https://martech.org/topic/retail-media-networks/",
    },
    {
      text: "PYMNTS frames the fortnight: Walmart's retail media scores wins while Amazon's AI goes ambient.",
      source: "PYMNTS",
      url: "https://www.pymnts.com/news/retail/2026/walmarts-retail-media-scores-wins-while-amazons-ai-goes-ambient",
    },
  ],
};
