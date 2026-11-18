"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Navbar from "../components/layout/navbar";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong!");
      }

      alert("Thank you! Your message has been received.");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact Form Error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">
        <section className="bg-rose-50 px-6 py-20 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
            Get In Touch
          </p>

          <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
            Contact Us
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-500">
            Have questions or planning your dream wedding? We would love to hear
            from you.
          </p>
        </section>

        <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:px-12 lg:px-20">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
              Contact Information
            </p>

            <h2 className="text-3xl font-bold text-gray-900">
              Let&apos;s Talk About Your Wedding
            </h2>

            <p className="mt-5 leading-7 text-gray-500">
              Our team is ready to help you plan your perfect celebration. Reach
              out to us through any of the following channels.
            </p>

            <div className="mt-10 space-y-7">
              <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-rose-100 text-rose-500">
                  <Mail size={24} />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">Email Us</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    hello@wedplan.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-rose-100 text-rose-500">
                  <Phone size={24} />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">Call Us</h3>
                  <p className="mt-1 text-sm text-gray-500">+880 1234-567890</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-rose-100 text-rose-500">
                  <MapPin size={24} />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">Our Location</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-100 p-8 shadow-lg md:p-10">
            <h2 className="mb-7 text-2xl font-bold text-gray-900">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-rose-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-rose-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Subject
                </label>

                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder="Enter subject"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-rose-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Your Message
                </label>

                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Write your message..."
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-rose-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-rose-500 py-4 font-semibold text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}
                <Send size={18} />
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
