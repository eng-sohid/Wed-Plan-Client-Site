import Link from "next/link";
import { Heart, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 px-6 pt-16 text-gray-300 md:px-12 lg:px-20">
      <div className="mx-auto grid max-w-7xl gap-12 pb-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold text-white"
          >
            WedPlan
            <Heart size={22} className="text-rose-500" fill="currentColor" />
          </Link>

          <p className="mt-5 max-w-xs text-sm leading-7 text-gray-400">
            Making your dream wedding a beautiful reality. We bring your love
            story to life with unforgettable celebrations.
          </p>

          <div className="mt-6 flex gap-4">
            <Link
              href="https://facebook.com"
              aria-label="Facebook"
              className="transition hover:text-rose-400"
            >
              <span aria-hidden="true" className="text-lg font-bold">
                f
              </span>
            </Link>

            <Link
              href="https://instagram.com"
              aria-label="Instagram"
              className="transition hover:text-rose-400"
            >
              <span aria-hidden="true" className="text-lg font-bold">
                ◎
              </span>
            </Link>

            <Link
              href="https://twitter.com"
              aria-label="Twitter"
              className="transition hover:text-rose-400"
            >
              <span aria-hidden="true" className="text-lg font-bold">
                X
              </span>
            </Link>
          </div>
        </div>

        <div>
          <h3 className="mb-6 text-lg font-bold text-white">Quick Links</h3>

          <ul className="space-y-4 text-sm">
            <li>
              <Link href="/" className="transition hover:text-rose-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="/services" className="transition hover:text-rose-400">
                Services
              </Link>
            </li>
            <li>
              <Link href="/about" className="transition hover:text-rose-400">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition hover:text-rose-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-6 text-lg font-bold text-white">Our Services</h3>

          <ul className="space-y-4 text-sm">
            <li>Wedding Photography</li>
            <li>Wedding Venues</li>
            <li>Bridal Makeup</li>
            <li>Catering Services</li>
            <li>Wedding Decoration</li>
            <li>Wedding Planning</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-6 text-lg font-bold text-white">Contact Us</h3>

          <ul className="space-y-5 text-sm">
            <li className="flex items-center gap-3">
              <MapPin size={19} className="shrink-0 text-rose-400" />
              Dhaka, Bangladesh
            </li>

            <li className="flex items-center gap-3">
              <Phone size={19} className="shrink-0 text-rose-400" />
              <span>+880 1234-567890</span>
            </li>

            <li className="flex items-center gap-3">
              <Mail size={19} className="shrink-0 text-rose-400" />
              <span>hello@wedplan.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 py-7 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} WedPlan. All rights reserved. Made with{" "}
        <Heart
          size={14}
          className="mx-1 inline text-rose-500"
          fill="currentColor"
        />{" "}
        for your special moments.
      </div>
    </footer>
  );
}
