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
} from "lucide-react";

import { useSession, signOut } from "@/lib/auth-client";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  // Get logged-in user session
  const { data: session, isPending } = useSession();

  // Get user role
  const role = (session?.user as { role?: string } | undefined)?.role;

  // Role-based dashboard routes
  const dashboardRoutes: Record<string, string> = {
    customer: "/dashboard/customer",
    vendor: "/dashboard/vendor",
    admin: "/dashboard/admin",
  };

  // Role-based profile routes
  const profileRoutes: Record<string, string> = {
    customer: "/dashboard/customer/profile",
    vendor: "/dashboard/vendor/profile",
  };

  const dashboardLink = role ? dashboardRoutes[role] : undefined;

  const profileLink = role ? profileRoutes[role] : undefined;

  // Logout
  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
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

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {isPending ? (
            <div className="h-10 w-28 animate-pulse rounded-full bg-[#eeefe9]" />
          ) : session && dashboardLink ? (
            <>
              {/* Dashboard */}
              <Link
                href={dashboardLink}
                className="flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-[#526b50] transition hover:bg-[#eeefe9]"
              >
                <LayoutDashboard size={17} />
                Dashboard
              </Link>

              {/* Profile */}
              {profileLink && (
                <Link
                  href={profileLink}
                  className="flex items-center gap-2 rounded-full border border-[#e8e6de] px-4 py-2.5 text-sm font-semibold text-[#526b50] transition hover:bg-[#eeefe9]"
                >
                  <UserRound size={17} />
                  Profile
                </Link>
              )}

              {/* Sign Out */}
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 rounded-full bg-[#526b50] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#40563e]"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </>
          ) : (
            <>
              {/* Sign In */}
              <Link
                href="/auth/sign-in"
                className="rounded-full px-5 py-2.5 text-sm font-semibold text-[#526b50] transition hover:bg-[#eeefe9]"
              >
                Sign In
              </Link>

              {/* Get Started */}
              <Link
                href="/auth/sign-up"
                className="flex items-center gap-2 rounded-full bg-[#526b50] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#40563e]"
              >
                Get Started
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
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-[#55574f] hover:text-[#526b50]"
              >
                {link.name}
              </Link>
            ))}

            <div className="flex flex-col gap-3 border-t border-[#e8e6de] pt-5">
              {isPending ? (
                <div className="h-10 animate-pulse rounded-full bg-[#eeefe9]" />
              ) : session && dashboardLink ? (
                <>
                  <Link
                    href={dashboardLink}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 rounded-full bg-[#eeefe9] px-5 py-3 text-sm font-semibold text-[#526b50]"
                  >
                    <LayoutDashboard size={17} />
                    Dashboard
                  </Link>

                  {profileLink && (
                    <Link
                      href={profileLink}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 rounded-full border border-[#526b50] px-5 py-3 text-sm font-semibold text-[#526b50]"
                    >
                      <UserRound size={17} />
                      My Profile
                    </Link>
                  )}

                  <button
                    onClick={handleSignOut}
                    className="flex items-center justify-center gap-2 rounded-full bg-[#526b50] px-5 py-3 text-sm font-semibold text-white"
                  >
                    <LogOut size={17} />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/sign-in"
                    onClick={() => setIsOpen(false)}
                    className="rounded-full border border-[#526b50] py-3 text-center text-sm font-semibold text-[#526b50]"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/auth/sign-up"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-full bg-[#526b50] py-3 text-sm font-semibold text-white"
                  >
                    Get Started
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
