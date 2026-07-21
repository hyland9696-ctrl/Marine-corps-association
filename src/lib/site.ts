export const site = {
  name: "St. Charles County Detachment 725",
  org: "Marine Corps League",
  shortName: "Detachment 725",
  tagline: "Once a Marine, Always a Marine.",
  location: "St. Charles County, Missouri",
  // Production URL — used for canonical links, sitemap, robots, and social
  // share images. Set NEXT_PUBLIC_SITE_URL in the deploy environment, or
  // update the fallback below to the detachment's real domain.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.stcharlesmarines.org").replace(/\/$/, ""),
  meeting: {
    schedule: "First Wednesday of every month, 7:00 PM (1900)",
    venue: "O'Fallon Elks Lodge",
    address: "1163 Tom Ginnever Ave, O'Fallon, MO 63366",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=1163+Tom+Ginnever+Ave+O%27Fallon+MO+63366",
  },
  mail: {
    line1: "P.O. Box 1362",
    line2: "St. Peters, MO 63376-0023",
  },
  phone: "(316) 670-0433",
  contacts: {
    paymaster: {
      role: "Paymaster",
      name: "Mark Hoernschemeyer",
      note: "Membership dues, and address / email / phone updates",
    },
    editor: {
      role: "Scuttlebutt Newsletter Editor",
      name: "Dave Nichols",
      email: "dbnichols.iaai@charter.net",
      phone: "314-599-3310",
      note: "Newsletter submissions and material contributions",
    },
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
