"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Heart,
  Menu,
  X,
  ArrowUpRight,
  LayoutDashboard,
  UserRound,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { useSession, signOut } from "@/lib/auth-client";
import { clearTokenCache } from "@/lib/api";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

function UserAvatar({
  src,
  name,
  size = 36,
}: {
  src?: string | null;
  name?: string | null;
  size?: number;
}) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={name || "User"}
        style={{ width: size, height: size }}
        className="rounded-full object-cover"
      />
    );
  }

  return (
    <span
      style={{ width: size, height: size }}
      className="flex items-center justify-center rounded-full bg-[#c9a77c] text-sm font-semibold text-black"
    >
      {(name || "U").charAt(0).toUpperCase()}
    </span>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Home e hero er upor transparent, scroll korle solid hoye jay
  const dark = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { data: session, isPending } = useSession();

  const user = session?.user as
    | { name: string; image?: string | null; role?: string }
    | undefined;

  const role = user?.role || "customer";
  const dashboardLink = `/dashboard/${role}`;
  // Admin er alada profile page nei
  const profileLink = role === "admin" ? null : `/dashboard/${role}/profile`;

  const closeAll = () => {
    setIsOpen(false);
    setDropdown(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      clearTokenCache();
      closeAll();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Theme-aware classes
  const textColor = dark ? "text-white" : "text-[#28251f]";
  const mutedColor = dark ? "text-white/70" : "text-[#77736b]";
  const hoverItem = dark ? "hover:bg-white/10" : "hover:bg-[#f0ede6]";
  const divider = dark ? "border-white/10" : "border-[#eeeae3]";
  const skeleton = dark ? "bg-white/10" : "bg-[#eeefe9]";

  return (
    <header
      className={`${
        isHome ? "fixed inset-x-0 top-0" : "sticky top-0"
      } z-50 w-full transition-colors duration-300 ${
        dark
          ? "bg-transparent"
          : "border-b border-[#e8e2d9] bg-[#faf9f6]/95 backdrop-blur-xl"
      }`}
    >
      <nav className="mx-auto flex h-[76px] max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-14">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeAll}
          className="group flex items-center gap-2"
        >
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
              dark
                ? "border border-white/40 text-white group-hover:bg-white group-hover:text-black"
                : "bg-[#526b50] text-white"
            }`}
          >
            <Heart size={17} strokeWidth={1.8} />
          </span>

          <span
            className={`font-serif text-xl font-bold tracking-tight sm:text-2xl ${textColor}`}
          >
            WedPlan<span className="text-[#c9a77c]">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative py-2 text-[12px] font-medium tracking-wide transition-colors ${
                isActive(link.href)
                  ? dark
                    ? "text-[#d8b68c]"
                    : "text-[#526b50]"
                  : `${mutedColor} hover:text-[#c9a77c]`
              }`}
            >
              {link.name}
              {isActive(link.href) && (
                <span className="absolute bottom-0 left-0 h-px w-full bg-[#c9a77c]" />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Authentication */}
        <div className="hidden items-center gap-4 md:flex">
          {isPending ? (
            <div
              className={`h-10 w-28 animate-pulse rounded-full ${skeleton}`}
            />
          ) : session && user ? (
            <div className="relative">
              <button
                onClick={() => setDropdown(!dropdown)}
                className={`flex items-center gap-2 rounded-full border px-2 py-1.5 transition ${
                  dark
                    ? "border-white/30 bg-black/20 hover:bg-white/10"
                    : "border-[#e8e2d9] bg-white hover:bg-[#f0ede6]"
                }`}
                aria-expanded={dropdown}
                aria-label="User menu"
              >
                <UserAvatar src={user.image} name={user.name} />
                <span
                  className={`max-w-[100px] truncate text-xs font-medium ${textColor}`}
                >
                  {user.name}
                </span>
                <ChevronDown size={15} className={mutedColor} />
              </button>

              {dropdown && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setDropdown(false)}
                  />

                  <div
                    className={`absolute right-0 z-50 mt-3 w-64 overflow-hidden rounded-2xl border p-2 shadow-2xl ${
                      dark
                        ? "border-white/10 bg-[#171816] text-white"
                        : "border-[#e8e2d9] bg-white text-[#28251f]"
                    }`}
                  >
                    <div
                      className={`flex items-center gap-3 border-b p-3 ${divider}`}
                    >
                      <UserAvatar src={user.image} name={user.name} size={42} />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {user.name}
                        </p>
                        <p className="mt-1 text-xs capitalize text-[#c9a77c]">
                          {role}
                        </p>
                      </div>
                    </div>

                    <Link
                      href={dashboardLink}
                      onClick={closeAll}
                      className={`mt-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${hoverItem}`}
                    >
                      <LayoutDashboard size={17} />
                      Dashboard
                    </Link>

                    {profileLink && (
                      <Link
                        href={profileLink}
                        onClick={closeAll}
                        className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${hoverItem}`}
                      >
                        <UserRound size={17} />
                        Profile Settings
                      </Link>
                    )}

                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-500 transition hover:bg-red-500/10"
                    >
                      <LogOut size={17} />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/sign-in"
                className={`px-4 py-2 text-xs font-medium tracking-wide transition hover:text-[#c9a77c] ${textColor}`}
              >
                SIGN IN
              </Link>

              <Link
                href="/sign-up"
                className="group flex items-center gap-2 rounded-full bg-[#c9a77c] px-5 py-3 text-xs font-semibold tracking-wide text-[#171816] transition hover:bg-[#b8966b]"
              >
                SIGN UP
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex h-10 w-10 items-center justify-center rounded-full border transition md:hidden ${
            dark
              ? "border-white/40 text-white"
              : "border-[#e8e2d9] text-[#28251f]"
          }`}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div
          className={`absolute left-0 top-full w-full border-t px-6 py-7 shadow-2xl md:hidden ${
            dark
              ? "border-white/10 bg-[#111310] text-white"
              : "border-[#e8e2d9] bg-[#faf9f6] text-[#28251f]"
          }`}
        >
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeAll}
                className={`text-sm font-medium transition hover:text-[#c9a77c] ${
                  isActive(link.href) ? "text-[#c9a77c]" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className={`flex flex-col gap-3 border-t pt-5 ${divider}`}>
              {isPending ? (
                <div
                  className={`h-10 animate-pulse rounded-full ${skeleton}`}
                />
              ) : session && user ? (
                <>
                  <div className="flex items-center gap-3 pb-2">
                    <UserAvatar src={user.image} name={user.name} size={42} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {user.name}
                      </p>
                      <p className="text-xs capitalize text-[#c9a77c]">
                        {role}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={dashboardLink}
                    onClick={closeAll}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm ${divider}`}
                  >
                    <LayoutDashboard size={17} />
                    Dashboard
                  </Link>

                  {profileLink && (
                    <Link
                      href={profileLink}
                      onClick={closeAll}
                      className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm ${divider}`}
                    >
                      <UserRound size={17} />
                      Profile Settings
                    </Link>
                  )}

                  <button
                    onClick={handleSignOut}
                    className="flex items-center justify-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-500"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    onClick={closeAll}
                    className="rounded-full border border-current py-3 text-center text-sm font-medium"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/sign-up"
                    onClick={closeAll}
                    className="flex items-center justify-center gap-2 rounded-full bg-[#c9a77c] py-3 text-sm font-semibold text-black"
                  >
                    Sign Up
                    <ArrowUpRight size={16} />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
