export const site = {
  name: "St. Charles County Detachment 725",
  org: "Marine Corps League",
  shortName: "Detachment 725",
  tagline: "Once a Marine, Always a Marine.",
  location: "St. Charles County, Missouri",
  nickname: "Devil Dog Pound 8",
  // Production URL — used for canonical links, sitemap, robots, and social
  // share images. Defaults to the live domain; NEXT_PUBLIC_SITE_URL can
  // override it (e.g. for preview/staging deployments).
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.stcharlesmarines.org").replace(/\/$/, ""),
  meeting: {
    schedule: "Third Thursday of every month, 7:00 PM (1900)",
    venue: "O'Fallon Elks Lodge",
    address: "1163 Tom Ginnever Ave, O'Fallon, MO 63366",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=1163+Tom+Ginnever+Ave+O%27Fallon+MO+63366",
  },
  staffMeeting: {
    schedule: "Second Monday of every month, 7:00 PM (1900)",
    venue: "AmVets Hall",
    address: "360 Brown Rd, St. Peters, MO",
  },
  mail: {
    line1: "P.O. Box 1362",
    line2: "St. Peters, MO 63376-0023",
  },
  // General public contact email (Commandant). Phone is intentionally omitted —
  // the detachment uses email + the contact form for public inquiries.
  email: "mawhite93@gmail.com",
  contacts: {
    paymaster: {
      role: "Paymaster",
      name: "Mark Hoernschemeyer",
      email: "markscmcl@yahoo.com",
      note: "Membership dues, and address / email / phone updates",
    },
    editor: {
      role: "Scuttlebutt Newsletter Editor",
      name: "Ray Hinman",
      email: "hinman.ray@gmail.com",
      note: "Newsletter submissions and material contributions",
    },
  },
  // Detachment leadership. The public roster lists role + name; personal phone
  // numbers are kept to the members' newsletter rather than the public site.
  officers: [
    { role: "Commandant", name: "Matt White" },
    { role: "Sr Vice Commandant", name: "Kirgan Taylor" },
    { role: "Jr Vice Commandant", name: "Stel Steller" },
    { role: "Adjutant", name: "Andy Riggle" },
    { role: "Paymaster", name: "Mark Hoernschemeyer" },
    { role: "Chaplain", name: "Gene Vaucher" },
    { role: "Judge Advocate", name: "Janice Hartley" },
    { role: "Sergeant at Arms", name: "Dave Thomas" },
    { role: "Auditor / Newsletter Editor", name: "Ray Hinman" },
    { role: "Auditor", name: "Marilyn Kitchen-New" },
  ],
  // Life membership (one-time fee) by age bracket.
  dues: {
    rows: [
      ["0–35", "$1,000"],
      ["36–50", "$800"],
      ["51–64", "$600"],
      ["65–84", "$400"],
      ["85 & over", "$100"],
    ],
    note: "Annual dues can be paid by PayPal at stcharlesmarine.org or at a meeting (cash, check, or credit card).",
  },
  // Affiliated Marine Corps League sites.
  orgLinks: [
    { label: "Marine Corps League (National)", url: "https://www.mclnational.org" },
    { label: "Department of Missouri", url: "https://www.momcl.org" },
  ],
  // Contact form delivery. The site is statically hosted (no server), so form
  // submissions are handled by Formspree (https://formspree.io) — free for low
  // volume. Create a form there, then paste its endpoint below or set
  // NEXT_PUBLIC_FORMSPREE_ENDPOINT. While this is empty the form still shows,
  // but submitting points people to email/phone instead of failing silently.
  formEndpoint: process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "",
  // Online donations. Paste the detachment's giving link here (Zeffy is free
  // for nonprofits; PayPal, Venmo, or Givebutter also work) or set
  // NEXT_PUBLIC_DONATE_URL. While empty, the Donate buttons invite people to
  // give by mail/phone instead of linking nowhere.
  donateUrl: process.env.NEXT_PUBLIC_DONATE_URL ?? "",
  // Newsletter signup. Points at the detachment's Google Apps Script web-app
  // URL (the free "send engine" — see /newsletter/README). The public signup
  // form POSTs new subscribers here; while empty, the form invites people to
  // email instead. Set NEXT_PUBLIC_NEWSLETTER_ENDPOINT or paste it below.
  newsletterEndpoint: process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT ?? "",
  // Private "Marketing HQ" page. Unlisted (not in nav, excluded from the
  // sitemap, and set to noindex) and ideally password-protected via GoDaddy
  // cPanel Directory Privacy. Change this slug to rotate the secret URL.
  hqPath: "hq-725-x9k4m",
  // Optional launchpad links used only on the private HQ page. Paste the
  // detachment's dashboards here (or leave blank and set them later).
  tools: {
    // Your email platform's campaign dashboard (MailerLite/Brevo/Mailchimp).
    emailDashboardUrl: process.env.NEXT_PUBLIC_EMAIL_DASHBOARD_URL ?? "",
    // Website analytics dashboard (Plausible, Google Analytics, etc.).
    analyticsUrl: process.env.NEXT_PUBLIC_ANALYTICS_URL ?? "",
  },
  social: {
    facebook: "https://www.facebook.com/StCharlesMarines/",
    youtube: "https://www.youtube.com/@stcharlescountymomarinesmc1466",
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/young-marines", label: "Young Marines" },
    { href: "/events", label: "Events" },
    { href: "/gallery", label: "Gallery" },
    { href: "/get-involved", label: "Get Involved" },
    { href: "/support", label: "Support Us" },
    { href: "/contact", label: "Contact" },
  ],
};

export const programs = [
  {
    title: "Toys for Tots",
    description:
      "We support the Marine Corps' signature Toys for Tots campaign each holiday season, collecting and distributing toys to children in St. Charles County who might otherwise go without.",
  },
  {
    title: "Military Funeral Honors",
    description:
      "Our Marines provide colors and funeral honors for departed veterans in our community, standing the last watch for fellow service members and their families.",
  },
  {
    title: "Scholarship Golf Tournament",
    description:
      "Our annual golf tournament raises funds for scholarships supporting Marine-connected students pursuing their education.",
  },
  {
    title: "St. Charles County Young Marines",
    description:
      "Founded by members of Detachment 725, the Young Marines is a youth leadership program that has grown into the largest unit in Missouri and one of the top-ranked units in the Midwest Regiment.",
  },
  {
    title: "Marine Corps Birthday Ball",
    description:
      "Each November we host our Marine Corps Birthday Ball, honoring the Corps' founding and the Marines who have served since 1775.",
  },
  {
    title: "Focus Marine Foundation",
    description:
      "We support the Focus Marine Foundation's work helping combat veterans recover through fly-fishing and outdoor programs.",
  },
];

// Photo gallery. Drop image files into `public/photos/` and list them here to
// have them appear on the Gallery page. Example:
//   { src: "/photos/toys-for-tots-2025.jpg", caption: "Toys for Tots, 2025" }
// While this array is empty the Gallery page shows a friendly "coming soon"
// state that points visitors to Facebook.
export type Photo = { src: string; caption: string };
export const photos: Photo[] = [];
