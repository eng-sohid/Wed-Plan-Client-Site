import Link from "next/link";
import { Heart, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#171815] px-6 pt-20 text-[#faf9f6] md:px-12 lg:px-20">
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[#526b50]/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl gap-14 pb-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
        {/* Brand */}
        <div>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 font-serif text-3xl font-semibold tracking-wide"
          >
            WedPlan
            <Heart
              size={21}
              className="text-[#d8b68c] transition-transform duration-300 group-hover:scale-110"
              fill="currentColor"
            />
          </Link>

          <p className="mt-6 max-w-xs text-sm leading-8 text-white/50">
            Making your dream wedding a beautiful reality. We bring your love
            story to life with unforgettable celebrations.
          </p>

          <div className="mt-7 flex gap-3">
            <Link
              href="https://facebook.com"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center border border-white/10 text-sm font-semibold text-white/60 transition hover:border-[#d8b68c]/50 hover:bg-[#d8b68c] hover:text-[#171815]"
            >
              f
            </Link>

            <Link
              href="https://instagram.com"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center text-lg border border-white/10 text-white/60 transition hover:border-[#d8b68c]/50 hover:bg-[#d8b68c] hover:text-[#171815]"
            >
              ◎
            </Link>

            <Link
              href="https://twitter.com"
              aria-label="Twitter"
              className="flex h-10 w-10 items-center justify-center border border-white/10 text-sm font-semibold text-white/60 transition hover:border-[#d8b68c]/50 hover:bg-[#d8b68c] hover:text-[#171815]"
            >
              X
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-7 font-serif text-xl text-[#faf9f6]">
            Quick Links
          </h3>

          <ul className="space-y-4 text-sm text-white/50">
            {[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: "About Us", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="group inline-flex items-center gap-2 transition hover:text-[#d8b68c]"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight
                    size={13}
                    className="opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="mb-7 font-serif text-xl text-[#faf9f6]">
            Our Services
          </h3>

          <ul className="space-y-4 text-sm text-white/50">
            {[
              "Wedding Photography",
              "Wedding Venues",
              "Bridal Makeup",
              "Catering Services",
              "Wedding Decoration",
              "Wedding Planning",
            ].map((service) => (
              <li
                key={service}
                className="transition hover:translate-x-1 hover:text-[#d8b68c]"
              >
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-7 font-serif text-xl text-[#faf9f6]">Contact Us</h3>

          <ul className="space-y-6 text-sm text-white/50">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-[#d8b68c]" />
              <span>Dhaka, Bangladesh</span>
            </li>

            <li className="flex items-center gap-3">
              <Phone size={18} className="shrink-0 text-[#d8b68c]" />
              <span>+880 1234-567890</span>
            </li>

            <li className="flex items-center gap-3">
              <Mail size={18} className="shrink-0 text-[#d8b68c]" />
              <span>hello@wedplan.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10 py-7">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-xs tracking-wide text-white/35">
            © {new Date().getFullYear()} WedPlan. All rights reserved.
          </p>

          <p className="flex items-center text-xs tracking-wide text-white/35">
            Made with
            <Heart
              size={13}
              className="mx-1.5 text-[#d8b68c]"
              fill="currentColor"
            />
            for your special moments.
          </p>
        </div>
      </div>
    </footer>
  );
}
