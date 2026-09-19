export type HeroStatCard = {
  id: string;
  color: string;
  number?: string;
  label?: string;
  sub?: string;
  videoSrc?: string;
  videoLabel?: string;
};

const heroStats: readonly HeroStatCard[] = [
  {
    id: "views",
    number: "10M+",
    label: "Organic views",
    sub: "Growth through smart content",
    color: "bg-gh-blue",
  },
  {
    id: "brands-video",
    videoSrc:
      "https://res.cloudinary.com/dux2glgb3/video/upload/v1776274196/video1_kczmxz.mp4",
    videoLabel: "Autoplay brand showcase video",
    color: "bg-gh-orange text-white",
  },
  {
    id: "campaigns",
    number: "60+",
    label: "Campaigns per month",
    sub: "Always live. Always pushing forward.",
    color: "bg-gh-green",
  },
  {
    id: "creative-video",
    videoSrc:
      "https://res.cloudinary.com/dux2glgb3/video/upload/v1776274201/video2_xrun2e.mp4",
    videoLabel: "Autoplay creative energy video",
    color: "bg-[#1f2937] text-white",
  },
] as const;

export const heroData = {
  headlineLines: ["Get Hyped. Get", "Noticed. Get Results."],
  subheadline: "Tired of gambling on content that delivers nothing?",
  stats: heroStats,
} as const;

export const statementData = {
  title:
    "We create content that stands out. That sticks. That reaches your audience and gets your brand moving.",
  body: "We don't stop at pretty pictures and slick visuals. We make it measurable. So you know exactly what works and what doesn't. No more content without strategy. No more content without results.",
  image: {
    src: "/images/Homepage/Statement/Image1.jpg",
    alt: "Portrait visual for the statement section",
    sizes: "220px",
  },
  cta: {
    href: "#contact",
    label: "Get to know us",
  },
} as const;

export const expertiseData = [
  {
    num: "01",
    name: "Social strategy",
    title: "Smart strategy. Strong start.",
    desc: "We dive deep into your brand, audience, and goals—and turn data into a clear plan with formats that truly make an impact.",
    cta: "More about social strategy",
    ctaVariant: "ghSolid",
    href: "/expertises/social-strategy",
    videoSrc:
      "https://res.cloudinary.com/dux2glgb3/video/upload/v1776274471/video1_fews8d.mp4",
    videoLabel: "Autoplay social strategy video",
    bg: "bg-white",
  },
  {
    num: "02",
    name: "Content creation",
    title: "Content that stands out and connects.",
    desc: "We create content that stands out, sticks, and reaches your audience—creative, fast, and full of energy.",
    cta: "More about content creation",
    ctaVariant: "ghOutline",
    href: "/expertises/content-creation",
    videoSrc:
      "https://res.cloudinary.com/dux2glgb3/video/upload/v1776274455/video2_lr1hih.mp4",
    videoLabel: "Autoplay content creation video",
    bg: "bg-[#ffc3ff]",
  },
  {
    num: "03",
    name: "Activation",
    title: "Visible where and when it matters.",
    desc: "Great content deserves to be seen. We distribute it where your audience already is.",
    cta: "More about activation",
    ctaVariant: "ghOutline",
    href: "/expertises/activation",
    videoSrc:
      "https://res.cloudinary.com/dux2glgb3/video/upload/v1776274434/video3_yasusx.mp4",
    videoLabel: "Autoplay activation video",
    bg: "bg-gh-green",
  },
  {
    num: "04",
    name: "Data",
    title: "Insights that drive impact.",
    desc: "We dig into the numbers to see what really works and sharpen your content strategy.",
    cta: "More about data",
    ctaVariant: "ghOutline",
    href: "/expertises/data",
    videoSrc:
      "https://res.cloudinary.com/dux2glgb3/video/upload/v1776274427/video4_uzvaeq.mp4",
    videoLabel: "Autoplay data insights video",
    bg: "bg-gh-blue",
  },
] as const;

export const workData = {
  heading: "Content that performs.",
  body: "We tell your story in a way that truly fits your audience—with creative content that works and makes the difference.",
  cta: {
    href: "/work",
    label: "View all our work",
  },
  items: [
    {
      title: "From zero to full in three weeks",
      client: "Bullit",
      href: "/work/bullit",
      videoSrc:
        "https://res.cloudinary.com/dux2glgb3/video/upload/v1776274281/video1_drmvzi.mp4",
      videoLabel: "Autoplay Bullit project preview",
      border: "border-gh-orange",
      panel: "bg-gh-orange text-white",
      media: "from-[#1f0b08] via-[#27100b] to-[#130908]",
    },
    {
      title: "Soft on taste, strong on screen",
      client: "Roasta",
      href: "/work/roasta",
      videoSrc:
        "https://res.cloudinary.com/dux2glgb3/video/upload/v1776274268/video2_qs70e0.mp4",
      videoLabel: "Autoplay Roasta project preview",
      border: "border-gh-blue",
      panel: "bg-gh-blue text-white",
      media: "from-[#102026] via-[#15323a] to-[#0d161a]",
    },
    {
      title: "Content that truly tastes great (and connects)",
      client: "Loco",
      href: "/work/loco",
      videoSrc:
        "https://res.cloudinary.com/dux2glgb3/video/upload/v1776274262/video3_dmyduj.mp4",
      videoLabel: "Autoplay Loco project preview",
      border: "border-gh-green",
      panel: "bg-gh-green text-white",
      media: "from-[#163026] via-[#1e4a3d] to-[#11261f]",
    },
  ],
} as const;

export const brandMarqueeData = {
  heading: "These brands got hyped.",
  brands: [
    "Tho",
    "De Talententuin",
    "Zwarte Cross",
    "Bullit",
    "Morssinkhof",
    "KNLTB",
    "SRHK",
  ],
} as const;

export const ctaData = {
  heading: "Let's Get Hyped!",
  primaryAction: {
    href: "mailto:hello@example.com",
    label: "Email us directly",
  },
  secondaryAction: {
    href: "#contact",
    label: "Get Results",
  },
} as const;
