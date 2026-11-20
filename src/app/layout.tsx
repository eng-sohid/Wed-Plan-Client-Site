import type { Metadata } from "next";
import { Toaster } from "sonner";
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "WedPlan — Wedding Planning Platform",
    template: "%s | WedPlan",
  },
  description:
    "Discover trusted wedding vendors, explore services, and plan your perfect celebration with WedPlan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-full">
      <body className="flex min-h-screen flex-col bg-[#171815] text-[#faf9f6] antialiased">
        <Navbar />

        <main className="flex-1">{children}</main>

        <Footer />

        <Toaster richColors position="top-right" theme="dark" closeButton />
      </body>
    </html>
  );
}
