import Link from "next/link";
import { Button, Container } from "@/components/ui";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { pages } from "@/lib/site";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-chevrons bg-navy py-24 text-cream sm:py-32">
          <Container className="max-w-3xl">
            <p className="font-display text-sm font-semibold tracking-[0.3em] text-gold uppercase">
              Error 404
            </p>
            <h1 className="mt-4 font-display text-5xl font-bold uppercase tracking-wide sm:text-7xl">
              Lost in the fog of war.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-cream/80">
              That page moved or never existed. Every page on the site is one click below, or
              head back to base.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/" variant="gold">
                Back to home
              </Button>
              <Button href="/contact" variant="outline">
                Contact us
              </Button>
            </div>
          </Container>
        </section>
        <section className="bg-cream py-12">
          <Container className="max-w-3xl">
            <p className="font-display text-xs font-semibold tracking-[0.2em] text-scarlet uppercase">
              All pages
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-3">
              {pages.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="text-sm text-navy underline-offset-4 hover:text-scarlet hover:underline">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
