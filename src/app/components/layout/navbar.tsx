"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
      className="flex items-center justify-center rounded-full bg-[#526b50] text-sm font-semibold text-white"
    >
      {(name || "U").charAt(0).toUpperCase()}
    </span>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const router = useRouter();

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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e8e6de] bg-[#faf9f6]/95 backdrop-blur-md">
      <nav className="container-width flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#526b50] text-white">
            <Heart size={20} strokeWidth={2} />
          </div>
          <span className="text-2xl font-semibold tracking-tight text-[#252820]">
            Wed<span className="text-[#526b50]">Plan.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-[#55574f] transition-colors hover:text-[#526b50]"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth */}
        <div className="hidden items-center gap-3 md:flex">
          {isPending ? (
            <div className="h-10 w-28 animate-pulse rounded-full bg-[#eeefe9]" />
          ) : session && user ? (
            <div className="relative">
              <button
                onClick={() => setDropdown(!dropdown)}
                className="flex items-center gap-2 rounded-full border border-[#e8e6de] bg-white py-1.5 pl-1.5 pr-3 transition hover:bg-[#eeefe9]"
                aria-expanded={dropdown}
                aria-label="User menu"
              >
                <UserAvatar src={user.image} name={user.name} />
                <span className="max-w-[110px] truncate text-sm font-medium text-[#252820]">
                  {user.name}
                </span>
                <ChevronDown size={16} className="text-[#55574f]" />
              </button>

              {dropdown && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setDropdown(false)}
                  />
                  <div className="absolute right-0 z-50 mt-2 w-60 rounded-2xl border border-[#e8e6de] bg-white p-2 shadow-lg">
                    <div className="flex items-center gap-3 border-b border-[#e8e6de] p-3">
                      <UserAvatar src={user.image} name={user.name} size={40} />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#252820]">
                          {user.name}
                        </p>
                        <p className="text-xs capitalize text-[#526b50]">
                          {role}
                        </p>
                      </div>
                    </div>

                    <Link
                      href={dashboardLink}
                      onClick={closeAll}
                      className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-[#252820] hover:bg-[#eeefe9]"
                    >
                      <LayoutDashboard size={16} />
                      Dashboard
                    </Link>

                    {profileLink && (
                      <Link
                        href={profileLink}
                        onClick={closeAll}
                        className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-[#252820] hover:bg-[#eeefe9]"
                      >
                        <UserRound size={16} />
                        Profile Settings
                      </Link>
                    )}

                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={16} />
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
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-[#526b50] transition hover:bg-[#eeefe9]"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="flex items-center gap-2 rounded-full bg-[#526b50] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#40563e]"
              >
                Sign Up
                <ArrowUpRight size={16} />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e8e6de] text-[#252820] md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-[#e8e6de] bg-[#faf9f6] px-6 py-5 md:hidden">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeAll}
                className="text-sm font-medium text-[#55574f] hover:text-[#526b50]"
              >
                {link.name}
              </Link>
            ))}

            <div className="flex flex-col gap-3 border-t border-[#e8e6de] pt-5">
              {isPending ? (
                <div className="h-10 animate-pulse rounded-full bg-[#eeefe9]" />
              ) : session && user ? (
                <>
                  <div className="flex items-center gap-3 pb-1">
                    <UserAvatar src={user.image} name={user.name} size={40} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#252820]">
                        {user.name}
                      </p>
                      <p className="text-xs capitalize text-[#526b50]">
                        {role}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={dashboardLink}
                    onClick={closeAll}
                    className="flex items-center gap-2 rounded-full bg-[#eeefe9] px-5 py-3 text-sm font-semibold text-[#526b50]"
                  >
                    <LayoutDashboard size={17} />
                    Dashboard
                  </Link>

                  {profileLink && (
                    <Link
                      href={profileLink}
                      onClick={closeAll}
                      className="flex items-center gap-2 rounded-full border border-[#526b50] px-5 py-3 text-sm font-semibold text-[#526b50]"
                    >
                      <UserRound size={17} />
                      Profile Settings
                    </Link>
                  )}

                  <button
                    onClick={handleSignOut}
                    className="flex items-center justify-center gap-2 rounded-full bg-[#526b50] px-5 py-3 text-sm font-semibold text-white"
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
                    className="rounded-full border border-[#526b50] py-3 text-center text-sm font-semibold text-[#526b50]"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={closeAll}
                    className="flex items-center justify-center gap-2 rounded-full bg-[#526b50] py-3 text-sm font-semibold text-white"
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
