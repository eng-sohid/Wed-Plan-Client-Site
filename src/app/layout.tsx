import type { Metadata } from "next";
import { Toaster } from "sonner";
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "WedPlan — Wedding Planning Platform",
  description: "Discover wedding services and book trusted vendors.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
