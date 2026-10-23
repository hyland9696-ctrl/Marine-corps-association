export type NavLink = { href: string; label: string };
export type NavEntry = NavLink | { label: string; children: NavLink[] };

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
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.stcharlesmarine.com").replace(/\/$/, ""),
  meeting: {
    schedule: "Third Thursday of every month, 7:00 PM (1900)",
    // Shown on the Home and Events pages so members used to the old night see it.
    changeNote: "Meeting night changed starting September 17, 2026.",
    venue: "O'Fallon Elks Lodge #2587",
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
  // Recruiting contact printed on the detachment's "I Want You" poster.
  recruiting: { role: "Jr Vice Commandant", name: "Stel Steller", phone: "(636) 373-1777" },
  // Color Guard / Honor Guard recruiting (Commander is the Commandant).
  colorGuard: { commander: "Matt White", email: "mawhite93@gmail.com" },
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
  // Membership dues. Annual dues are paid at a meeting or online through
  // PayPal; the online price includes PayPal's processing fee. Paste the
  // detachment's PayPal "Pay Dues" button link or set NEXT_PUBLIC_PAYPAL_DUES_URL.
  dues: {
    annual: "$35",
    annualOnline: "$37",
    annualOnlineNote: "$35 dues plus a $2 online processing fee",
    payUrl: process.env.NEXT_PUBLIC_PAYPAL_DUES_URL ?? "",
    rows: [
      ["0–35", "$1,000"],
      ["36–50", "$800"],
      ["51–64", "$600"],
      ["65–84", "$400"],
      ["85 & over", "$100"],
    ],
    note: "Bring your signed application, $35, and a copy of your DD-214 to your first meeting, or pay annual dues online.",
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
  // Online donations: the old site's PayPal "Scholarship Fund Donation / Open
  // Donation" button. Paste its permanent button link here or set
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
    // The old site linked an Instagram account; paste its URL here or set
    // NEXT_PUBLIC_INSTAGRAM_URL. Hidden while empty.
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
    youtube: "https://www.youtube.com/@stcharlescountymomarinesmc1466",
  },
  // Top navigation. Entries with `children` render as dropdown groups.
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/events", label: "Events" },
    {
      label: "Programs",
      children: [
        { href: "/honor-guard", label: "Honor Guard" },
        { href: "/golf", label: "Golf Tournament" },
        { href: "/scholarship", label: "Scholarship" },
        { href: "/young-marines", label: "Young Marines" },
        { href: "/bbq", label: "BBQ & Food Sales" },
        { href: "/focus-marines", label: "Focus Marines" },
      ],
    },
    {
      label: "Resources",
      children: [
        { href: "/faq", label: "FAQ" },
        { href: "/scuttlebutt", label: "Scuttlebutt Newsletter" },
        { href: "/welcome-packet", label: "Welcome Packet" },
        { href: "/uniforms", label: "Uniform Overview" },
      ],
    },
    { href: "/gallery", label: "Gallery" },
    { href: "/get-involved", label: "Join" },
    { href: "/support", label: "Support Us" },
    { href: "/contact", label: "Contact" },
  ] as NavEntry[],
};


// Every linkable page, in nav order (dropdown groups flattened). Used by the
// footer and the sitemap.
export const pages: NavLink[] = site.nav.flatMap((n) => ("children" in n ? n.children : [n]));

// Annual fundraising golf tournament. Update each year from the flyer.
export const golf = {
  date: "September 19, 2026",
  course: "Bear Creek Golf Club",
  address: "158 Bear Creek Dr, Wentzville, MO 63385",
  coursePhone: "(636) 332-5018",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=158+Bear+Creek+Dr+Wentzville+MO+63385",
  format: "Four-person scramble, shotgun start",
  registration: "Registration and lunch at 12:15 PM",
  teeOff: "Tee off at 1:30 PM",
  teamFee: "$480 per team",
  mulligans: "Mulligans available at registration (max 4 per team)",
  flights: "3 flights, 3 places per flight",
  prizes: [
    "Men's and women's closest to the pin, longest drive, and longest putt",
    "50/50 drawing",
    "Prize drawing: driver, putter, range finder, and more",
    "Silent auction",
  ],
  prizesNote: "Must be present to win.",
  food: "Lunch before and dinner after. Water, soft drinks, and adult beverages provided.",
  holeSponsor: "$250",
  // Sponsorship tiers from the old site's Sponsor Registration page. Mark a
  // tier soldOut when it's gone for the year; reset after the tournament.
  sponsorships: [
    { name: "Corporate Sponsor", price: "Contact us", perk: "Title sponsor of the tournament. World Wide Technology holds this for 2026.", soldOut: true },
    { name: "Dinner Sponsor", price: "$2,000", perk: "Banner atop the pavilion at the course entry.", soldOut: true },
    { name: "Lunch Sponsor", price: "$600", perk: "Signage on and near the lunch tent.", soldOut: true },
    { name: "Beverage Cart Sponsor", price: "$300", perk: "Banner on the beverage cart displaying your company information.", soldOut: true },
    { name: "Longest Drive Sponsor", price: "$300", perk: "Men's and women's longest drive sign displaying your company information.", soldOut: true },
    { name: "Closest to the Pin Sponsor", price: "$300", perk: "Men's and women's closest-to-the-pin sign displayed with your company's information.", soldOut: false },
    { name: "Hole Sponsor", price: "$250", perk: "Your sign displayed at a hole, sourced through our vendor to course guidelines.", soldOut: false },
  ],
  holeSponsorNote:
    "Hole sponsors have their sign displayed at a hole. The detachment sources the signs through our vendor to ensure quality and adherence to course guidelines. A Marine from the detachment will reach out to act as your liaison for sign ordering and anything else you need before the tournament.",
  titleSponsor: "World Wide Technology",
  benefits: "Scholarships, the Focus Marines Foundation, Toys for Tots, and the Young Marines",
  director: { name: "Kevin Zimmer", phone: "(314) 495-4766" },
  // 2026 golfer registration sold out; flip this when next year's registration opens.
  golfersSoldOut: true,
  // PayPal checkout links from the old site. Paste them here or set the env vars.
  registerUrl: process.env.NEXT_PUBLIC_GOLF_REGISTER_URL ?? "",
  sponsorUrl: process.env.NEXT_PUBLIC_GOLF_SPONSOR_URL ?? "",
  flyerImage: "/photos/golf-flyer-2026.jpg",
  // Drop the flyer PDF at public/downloads/golf-flyer.pdf to enable the download link.
  flyerFile: "downloads/golf-flyer.pdf",
};

export const scholarship = {
  amount: "$1,200",
  purpose:
    "To grant $1,200 scholarships to qualified applicants who are pursuing full-time undergraduate or technical training at an accredited, recognized institution.",
  // Drop the current application at public/downloads/scholarship-application.docx
  applicationFile: "downloads/scholarship-application.docx",
  applicationLabel: "Scholarship Application 2027",
};

// Files visitors can download. Each appears only once the file exists in
// public/. See public/downloads/README.md.
export const downloads = {
  membershipApplication: "downloads/membership-application.pdf",
  welcomePacket: "downloads/welcome-packet.pdf",
  uniformOverview: "downloads/uniform-overview.pdf",
};

export const programs = [
  {
    title: "Toys for Tots",
    href: "/support",
    description:
      "We support the Marine Corps' signature Toys for Tots campaign each holiday season, collecting and distributing toys to children in St. Charles County who might otherwise go without.",
  },
  {
    title: "Military Colors & Funeral Honors",
    href: "/honor-guard",
    description:
      "Our Color Guard presents the colors at public events and ceremonies, and our Honor Guard provides military honors for fallen Marines and veterans.",
  },
  {
    title: "Scholarship Golf Tournament",
    href: "/golf",
    description:
      "Our annual fundraising golf tournament funds $1,200 scholarships for students pursuing full-time undergraduate or technical training.",
  },
  {
    title: "St. Charles County Young Marines",
    href: "/young-marines",
    description:
      "Founded by members of Detachment 725, the Young Marines is a youth leadership program that has grown into the largest unit in Missouri and one of the top-ranked units in the Midwest Regiment.",
  },
  {
    title: "Marine Corps Birthday Ball",
    href: "/events",
    description:
      "Each November we host our Marine Corps Birthday Ball, honoring the Corps' founding and the Marines who have served since 1775.",
  },
  {
    title: "Focus Marines Foundation",
    href: "/focus-marines",
    description:
      "We support the Focus Marines Foundation, a St. Louis-area nonprofit that runs a free, week-long program helping veterans transition to civilian life.",
  },
  {
    title: "O'Fallon Celebration of Lights",
    href: "/gallery",
    description:
      "Each holiday season the detachment builds and staffs a display at the O'Fallon Celebration of Lights, one of our favorite ways to be part of the community.",
  },
  {
    title: "BBQ & Food Sales",
    href: "/bbq",
    description:
      "Barbecue sales, hamburger and hot dog stands, and a family BBQ for members. The cookouts pay for much of the work on this page.",
  },
  {
    title: "Scholarship Program",
    href: "/scholarship",
    description:
      "$1,200 scholarships for qualified applicants in full-time undergraduate or technical training at an accredited institution.",
  },
];

// BBQ & food sales. Add upcoming cookouts to `bbqUpcoming` (newest first is
// fine; the page sorts nothing, so list them in the order you want shown) and
// move finished ones into `bbqRecent`. While `bbqUpcoming` is empty the page
// tells visitors where dates get posted instead of showing a blank list.
export type Cookout = { date: string; place: string; what: string };
export const bbqUpcoming: Cookout[] = [];
export const bbqRecent: Cookout[] = [
  { date: "Sep 26, 2026", place: "Valente's", what: "Barbecue sale" },
  { date: "Oct 10, 2026", place: "Twilight market, Old Town St. Peters", what: "Hamburgers & hot dog sale" },
  { date: "Oct 17, 2026", place: "O'Fallon Elks Lodge", what: "Family night: hot dogs & s'mores over the fire" },
];

// Photo gallery. Drop image files into `public/photos/` and list them here to
// have them appear on the Gallery page. Example:
//   { src: "/photos/toys-for-tots-2025.jpg", caption: "Toys for Tots, 2025" }
// While this array is empty the Gallery page shows a friendly "coming soon"
// state that points visitors to Facebook.
export type Photo = { src: string; caption: string };
export const photos: Photo[] = [
  { src: "/photos/toys-for-tots.jpg", caption: "Toys for Tots: detachment leadership in action" },
  { src: "/photos/honor-guard.jpg", caption: "Our certified Honor Guard presenting the colors" },
  { src: "/photos/celebration-of-lights.jpg", caption: "Detachment 725 display at the O'Fallon Celebration of Lights" },
  { src: "/photos/camaraderie.jpg", caption: "Camaraderie at a BBQ fundraiser" },
  { src: "/photos/family-picnic.jpg", caption: "Members and families at the pavilion" },
];
