import Link from "next/link";
import { Heart, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Browse Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const services = [
  "Wedding Photography",
  "Wedding Venues",
  "Bridal Makeup",
  "Catering Services",
  "Wedding Decoration",
  "Wedding Planning",
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-[#171815] px-6 pt-16 text-[#faf9f6] md:px-12 md:pt-20 lg:px-20">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[#526b50]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[#d8b68c]/[0.04] blur-[100px]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 pb-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-14">
        {/* Brand */}
        <div>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 font-serif text-3xl font-semibold tracking-wide"
          >
            WedPlan
            <Heart
              size={21}
              className="text-[#d8b68c] transition-transform duration-300 group-hover:scale-125"
              fill="currentColor"
            />
          </Link>

          <p className="mt-6 max-w-xs text-sm leading-8 text-white/45">
            Making your dream wedding a beautiful reality. We bring your love
            story to life with unforgettable celebrations.
          </p>

          {/* Social Links */}
          <div className="mt-7 flex gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-sm font-semibold text-white/60 transition-all duration-300 hover:border-[#d8b68c] hover:bg-[#d8b68c] hover:text-[#171815]"
            >
              f
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-lg text-white/60 transition-all duration-300 hover:border-[#d8b68c] hover:bg-[#d8b68c] hover:text-[#171815]"
            >
              ◎
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-sm font-semibold text-white/60 transition-all duration-300 hover:border-[#d8b68c] hover:bg-[#d8b68c] hover:text-[#171815]"
            >
              X
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-7 font-serif text-xl text-[#faf9f6]">
            Quick Links
          </h3>

          <ul className="space-y-4 text-sm text-white/45">
            {quickLinks.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="group inline-flex items-center gap-2 transition-colors duration-300 hover:text-[#d8b68c]"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight
                    size={13}
                    className="opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
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

          <ul className="space-y-4 text-sm text-white/45">
            {services.map((service) => (
              <li key={service}>
                <Link
                  href="/services"
                  className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-[#d8b68c]"
                >
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-7 font-serif text-xl text-[#faf9f6]">Contact Us</h3>

          <ul className="space-y-6 text-sm text-white/45">
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
      <div className="relative border-t border-white/[0.08] py-7">
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
