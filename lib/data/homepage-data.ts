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
    label: "Organische views",
    sub: "Groei door slimme content",
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
    label: "Campagnes per maand",
    sub: "Altijd live. Altijd doorpakken.",
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
  subheadline: "Klaar met gokken op content die niets oplevert?",
  stats: heroStats,
} as const;

export const statementData = {
  title:
    "Wij maken content die opvalt. Die blijft hangen. Die jouw doelgroep raakt en jouw merk in beweging brengt.",
  body: "We stoppen niet bij mooie plaatjes en vette beelden. We maken het meetbaar. Zo weet je precies wat werkt en wat niet. Nooit meer content zonder strategie. Nooit meer content zonder resultaat.",
  image: {
    src: "/images/Homepage/Statement/Image1.jpg",
    alt: "Portrait visual for the statement section",
    sizes: "220px",
  },
  cta: {
    href: "#contact",
    label: "Leer ons kennen",
  },
} as const;

export const expertiseData = [
  {
    num: "01",
    name: "Social strategy",
    title: "Slimme strategie. Sterke start.",
    desc: "We duiken diep in jouw merk, doelgroep en doelen. En vertalen data naar een duidelijk plan met formats die echt impact maken.",
    cta: "Meer over social strategie",
    ctaVariant: "ghSolid",
    href: "#",
    videoSrc:
      "https://res.cloudinary.com/dux2glgb3/video/upload/v1776274471/video1_fews8d.mp4",
    videoLabel: "Autoplay social strategy video",
    bg: "bg-white",
  },
  {
    num: "02",
    name: "Content creation",
    title: "Content die opvalt en raakt.",
    desc: "We maken content die opvalt. Blijft hangen. En jouw doelgroep raakt. Creatief, snel en energiek.",
    cta: "Meer over content creatie",
    ctaVariant: "ghOutline",
    href: "#",
    videoSrc:
      "https://res.cloudinary.com/dux2glgb3/video/upload/v1776274455/video2_lr1hih.mp4",
    videoLabel: "Autoplay content creation video",
    bg: "bg-[#ffc3ff]",
  },
  {
    num: "03",
    name: "Activation",
    title: "Zichtbaar waar en wanneer het telt.",
    desc: "De juiste content verdient het om gezien te worden. We verspreiden de content waar jouw doelgroep is.",
    cta: "Meer over activatie",
    ctaVariant: "ghOutline",
    href: "#",
    videoSrc:
      "https://res.cloudinary.com/dux2glgb3/video/upload/v1776274434/video3_yasusx.mp4",
    videoLabel: "Autoplay activation video",
    bg: "bg-gh-green",
  },
  {
    num: "04",
    name: "Data",
    title: "Inzichten die impact maken.",
    desc: "We duiken in de cijfers om te snappen wat echt werkt en sturen jouw content scherp bij.",
    cta: "Meer over data",
    ctaVariant: "ghOutline",
    href: "#",
    videoSrc:
      "https://res.cloudinary.com/dux2glgb3/video/upload/v1776274427/video4_uzvaeq.mp4",
    videoLabel: "Autoplay data insights video",
    bg: "bg-gh-blue",
  },
] as const;

export const workData = {
  heading: "Content dat scoort.",
  body: "Wij vertellen jouw verhaal. Op een manier die echt past bij jouw doelgroep. Met creatieve content die werkt en het verschil maakt.",
  cta: {
    href: "#",
    label: "Bekijk al ons werk",
  },
  items: [
    {
      title: "Van nul naar vol, binnen 3 weken",
      client: "Bullit",
      href: "#",
      videoSrc:
        "https://res.cloudinary.com/dux2glgb3/video/upload/v1776274281/video1_drmvzi.mp4",
      videoLabel: "Autoplay Bullit project preview",
      border: "border-gh-orange",
      panel: "bg-gh-orange text-white",
      media: "from-[#1f0b08] via-[#27100b] to-[#130908]",
      offset: "xl:translate-y-14",
    },
    {
      title: "Zacht in smaak, sterk in beeld",
      client: "Roasta",
      href: "#",
      videoSrc:
        "https://res.cloudinary.com/dux2glgb3/video/upload/v1776274268/video2_qs70e0.mp4",
      videoLabel: "Autoplay Roasta project preview",
      border: "border-gh-blue",
      panel: "bg-gh-blue text-white",
      media: "from-[#102026] via-[#15323a] to-[#0d161a]",
      offset: "xl:translate-y-0",
    },
    {
      title: "Content die echt smaakt (en raakt)",
      client: "Loco",
      href: "#",
      videoSrc:
        "https://res.cloudinary.com/dux2glgb3/video/upload/v1776274262/video3_dmyduj.mp4",
      videoLabel: "Autoplay Loco project preview",
      border: "border-gh-green",
      panel: "bg-gh-green text-white",
      media: "from-[#163026] via-[#1e4a3d] to-[#11261f]",
      offset: "xl:-translate-y-10",
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
    href: "mailto:info@gethyped.nl",
    label: "Mail ons direct",
  },
  secondaryAction: {
    href: "#contact",
    label: "Get Results",
  },
} as const;
