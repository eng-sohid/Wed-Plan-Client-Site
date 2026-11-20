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
      className="flex items-center justify-center rounded-full bg-[#d8b68c] text-sm font-semibold text-[#171815]"
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

  const { data: session, isPending } = useSession();

  const user = session?.user as
    | { name: string; image?: string | null; role?: string }
    | undefined;

  const role = user?.role || "customer";

  const dashboardLink = `/dashboard/${role}`;

  const profileLink = role === "admin" ? null : `/dashboard/${role}/profile`;

  // Customer and logged-out users see all public links.
  // Vendor and admin users only see Home and Browse Services.
  const visibleNavLinks =
    session && (role === "vendor" || role === "admin")
      ? navLinks.filter(
          (link) => link.href !== "/about" && link.href !== "/contact",
        )
      : navLinks;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const transparent = isHome && !scrolled;

  const textColor = "text-[#faf9f6]";
  const mutedColor = "text-white/65";
  const hoverItem = "hover:bg-white/10";
  const skeleton = "bg-white/10";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`${
        isHome ? "fixed" : "sticky"
      } inset-x-0 top-0 z-50 w-full border-b transition-all duration-300 ${
        transparent
          ? "border-transparent bg-transparent"
          : "border-white/10 bg-[#171815]/95 shadow-lg shadow-black/10 backdrop-blur-xl"
      }`}
    >
      <nav className="mx-auto flex h-[76px] max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-14">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeAll}
          className="group flex items-center gap-2"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d8b68c]/60 text-[#d8b68c] transition group-hover:bg-[#d8b68c] group-hover:text-[#171815]">
            <Heart size={17} strokeWidth={1.8} />
          </span>

          <span className="font-serif text-xl font-bold tracking-tight text-[#faf9f6] sm:text-2xl">
            WedPlan<span className="text-[#d8b68c]">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {visibleNavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative py-2 text-[12px] font-medium tracking-wide transition-colors ${
                isActive(link.href)
                  ? "text-[#d8b68c]"
                  : `${mutedColor} hover:text-[#d8b68c]`
              }`}
            >
              {link.name}

              {isActive(link.href) && (
                <span className="absolute bottom-0 left-0 h-px w-full bg-[#d8b68c]" />
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
                className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-2 py-1.5 transition hover:bg-white/10"
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

                  <div className="absolute right-0 z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#20211e] p-2 text-[#faf9f6] shadow-2xl">
                    <div className="flex items-center gap-3 border-b border-white/10 p-3">
                      <UserAvatar src={user.image} name={user.name} size={42} />

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {user.name}
                        </p>

                        <p className="mt-1 text-xs capitalize text-[#d8b68c]">
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
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
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
                className="px-4 py-2 text-xs font-medium tracking-wide text-[#faf9f6] transition hover:text-[#d8b68c]"
              >
                SIGN IN
              </Link>

              <Link
                href="/sign-up"
                className="group flex items-center gap-2 rounded-full bg-[#d8b68c] px-5 py-3 text-xs font-semibold tracking-wide text-[#171815] transition hover:bg-[#c9a77c]"
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
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-[#faf9f6] transition hover:bg-white/10 md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute left-0 top-full w-full border-t border-white/10 bg-[#171815] px-6 py-7 text-[#faf9f6] shadow-2xl md:hidden">
          <div className="flex flex-col gap-5">
            {visibleNavLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeAll}
                className={`text-sm font-medium transition hover:text-[#d8b68c] ${
                  isActive(link.href) ? "text-[#d8b68c]" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="flex flex-col gap-3 border-t border-white/10 pt-5">
              {isPending ? (
                <div className="h-10 animate-pulse rounded-full bg-white/10" />
              ) : session && user ? (
                <>
                  <div className="flex items-center gap-3 pb-2">
                    <UserAvatar src={user.image} name={user.name} size={42} />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {user.name}
                      </p>

                      <p className="text-xs capitalize text-[#d8b68c]">
                        {role}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={dashboardLink}
                    onClick={closeAll}
                    className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm"
                  >
                    <LayoutDashboard size={17} />
                    Dashboard
                  </Link>

                  {profileLink && (
                    <Link
                      href={profileLink}
                      onClick={closeAll}
                      className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm"
                    >
                      <UserRound size={17} />
                      Profile Settings
                    </Link>
                  )}

                  <button
                    onClick={handleSignOut}
                    className="flex items-center justify-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400"
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
                    className="rounded-full border border-white/20 py-3 text-center text-sm font-medium"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/sign-up"
                    onClick={closeAll}
                    className="flex items-center justify-center gap-2 rounded-full bg-[#d8b68c] py-3 text-sm font-semibold text-[#171815]"
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
