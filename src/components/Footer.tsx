import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-gold/30 bg-navy text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <p className="font-display text-lg font-semibold tracking-wide uppercase text-gold">
            {site.name}
          </p>
          <p className="mt-2 text-sm text-cream/70">{site.org}</p>
          <p className="mt-4 text-sm italic text-cream/70">&ldquo;{site.tagline}&rdquo;</p>
        </div>

        <div>
          <p className="font-display text-sm font-semibold tracking-wide uppercase text-gold">
            Meetings
          </p>
          <p className="mt-3 text-sm text-cream/80">{site.meeting.schedule}</p>
          <p className="mt-1 text-sm text-cream/80">{site.meeting.venue}</p>
          <p className="text-sm text-cream/80">{site.meeting.address}</p>
        </div>

        <div>
          <p className="font-display text-sm font-semibold tracking-wide uppercase text-gold">
            Contact
          </p>
          <p className="mt-3 text-sm text-cream/80">{site.mail.line1}</p>
          <p className="text-sm text-cream/80">{site.mail.line2}</p>
          <p className="mt-2 text-sm text-cream/80">{site.phone}</p>
          <div className="mt-3 flex gap-4">
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gold-light hover:text-gold"
            >
              Facebook
            </a>
            <a
              href={site.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gold-light hover:text-gold"
            >
              YouTube
            </a>
          </div>
        </div>

        <div>
          <p className="font-display text-sm font-semibold tracking-wide uppercase text-gold">
            Quick Links
          </p>
          <ul className="mt-3 space-y-2">
            {site.nav.slice(1).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-cream/80 hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gold/20 px-4 py-5 text-center text-xs text-cream/60 sm:px-6">
        &copy; {new Date().getFullYear()} {site.name}, {site.org}. Semper Fidelis.
      </div>
    </footer>
  );
}
