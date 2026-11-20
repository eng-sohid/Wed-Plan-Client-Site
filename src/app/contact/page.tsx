"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, ArrowUpRight } from "lucide-react";

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

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      value: "hello@wedplan.com",
      description: "Send us an email anytime",
    },
    {
      icon: Phone,
      title: "Call Us",
      value: "+880 1234-567890",
      description: "We're here to help",
    },
    {
      icon: MapPin,
      title: "Our Location",
      value: "Dhaka, Bangladesh",
      description: "Serving couples across Bangladesh",
    },
  ];

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#171815] px-4 py-3.5 text-sm text-[#faf9f6] placeholder:text-white/25 outline-none transition focus:border-[#d8b68c]/60 focus:ring-1 focus:ring-[#d8b68c]/20";

  return (
    <main className="min-h-screen overflow-hidden bg-[#171815] text-[#faf9f6]">
      {/* Hero */}
      <section className="relative border-b border-white/[0.06] px-6 py-24 text-center md:py-28">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#526b50]/15 blur-[120px]" />

        <div className="relative mx-auto max-w-3xl">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.4em] text-[#d8b68c]">
            We&apos;d Love To Hear From You
          </p>

          <h1 className="font-serif text-4xl tracking-tight md:text-6xl">
            Let&apos;s Start a
            <span className="mt-2 block italic text-[#d8b68c]">
              Conversation
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-sm leading-8 text-white/50 md:text-base">
            Have questions or planning your dream wedding? We would love to hear
            from you. Let&apos;s make something beautiful together.
          </p>

          <div className="mx-auto mt-9 h-px w-20 bg-[#d8b68c]/60" />
        </div>
      </section>

      {/* Contact Content */}
      <section className="mx-auto grid max-w-7xl gap-14 px-6 py-20 md:grid-cols-[0.85fr_1.15fr] md:px-12 md:py-28 lg:gap-20 lg:px-20">
        {/* Contact Information */}
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-[#d8b68c]">
            Contact Information
          </p>

          <h2 className="font-serif text-3xl leading-tight md:text-4xl">
            Let&apos;s Talk About Your{" "}
            <span className="italic text-[#d8b68c]">Wedding</span>
          </h2>

          <p className="mt-6 text-sm leading-8 text-white/45">
            Our team is ready to help you plan your perfect celebration. Reach
            out to us through any of the following channels.
          </p>

          <div className="mt-12 space-y-8">
            {contactInfo.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="group flex items-center gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#d8b68c]/20 bg-[#20211e] text-[#d8b68c] transition group-hover:border-[#d8b68c]/50 group-hover:bg-[#d8b68c] group-hover:text-[#171815]">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-[#faf9f6]">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm text-[#d8b68c]">{item.value}</p>

                    <p className="mt-1 text-xs text-white/30">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-14 border-t border-white/10 pt-7">
            <p className="font-serif text-xl italic text-[#d8b68c]">
              Every beautiful celebration begins with a conversation.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="relative">
          <div className="absolute -right-4 -top-4 h-24 w-24 border-r border-t border-[#d8b68c]/40" />

          <div className="relative rounded-2xl border border-white/[0.08] bg-[#20211e] p-7 shadow-2xl md:p-10">
            <div className="mb-9">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#d8b68c]">
                Send A Message
              </p>

              <h2 className="font-serif text-2xl md:text-3xl">
                We&apos;d Love To Hear From You
              </h2>

              <p className="mt-3 text-sm leading-7 text-white/40">
                Fill out the form below and our team will get back to you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-medium text-white/70"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter your name"
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-medium text-white/70"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter your email"
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-xs font-medium text-white/70"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder="Enter subject"
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs font-medium text-white/70"
                >
                  Your Message
                </label>

                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Write your message..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#d8b68c] py-4 text-sm font-semibold text-[#171815] transition hover:bg-[#e7cba9] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}

                {loading ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#171815]/30 border-t-[#171815]" />
                ) : (
                  <Send
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                )}
              </button>
            </form>
          </div>

          <div className="absolute -bottom-4 -left-4 h-20 w-20 border-b border-l border-[#d8b68c]/40" />
        </div>
      </section>
    </main>
  );
}
