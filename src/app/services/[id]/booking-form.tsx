"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  CalendarDays,
  MapPin,
  MessageSquare,
  Send,
  Sparkles,
} from "lucide-react";
import { api, errMsg } from "@/lib/api";

type BookingFormProps = {
  serviceId: string;
  serviceTitle: string;
};

const emptyForm = { eventDate: "", eventLocation: "", message: "" };

export default function BookingForm({
  serviceId,
  serviceTitle,
}: BookingFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.eventDate || !formData.eventLocation.trim()) {
      toast.error("Event date and location are required");
      return;
    }

    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      await api("/bookings", {
        method: "POST",
        body: {
          serviceId,
          eventDate: formData.eventDate,
          eventLocation: formData.eventLocation.trim(),
          message: formData.message.trim(),
        },
      });

      setSuccess(true);
      setMessage("Your booking request has been submitted successfully!");
      toast.success("Booking request submitted!");
      setFormData(emptyForm);

      // Customer ke tar booking list e niye jai
      setTimeout(() => router.push("/dashboard/customer/bookings"), 1200);
    } catch (error) {
      const text = errMsg(error);
      setSuccess(false);
      setMessage(text);
      toast.error(text);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#171815] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#d8b68c]/60 focus:ring-2 focus:ring-[#d8b68c]/10";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#20211e] p-6 shadow-2xl shadow-black/10 sm:p-8">
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#526b50]/10 blur-[90px]" />

      <div className="relative">
        <div className="mb-7">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-[#d8b68c]/20 bg-[#d8b68c]/10">
            <Sparkles className="h-5 w-5 text-[#d8b68c]" />
          </div>

          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d8b68c]">
            Make It Official
          </p>

          <h2 className="font-serif text-3xl text-[#faf9f6] sm:text-4xl">
            Book This <span className="italic text-[#d8b68c]">Service.</span>
          </h2>

          <p className="mt-3 text-sm leading-6 text-white/45">
            Share your event details and let us help make your special day
            unforgettable.
          </p>

          <div className="mt-5 rounded-xl border border-white/10 bg-[#171815] px-4 py-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">
              Selected Service
            </p>
            <p className="mt-1 text-sm font-medium text-[#d8b68c]">
              {serviceTitle}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="eventDate"
              className="mb-2 block text-xs font-medium text-white/70"
            >
              Event Date
            </label>

            <div className="relative">
              <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#d8b68c]" />
              <input
                id="eventDate"
                type="date"
                name="eventDate"
                min={today}
                value={formData.eventDate}
                onChange={handleChange}
                required
                className={`${inputClass} pl-11 [color-scheme:dark]`}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="eventLocation"
              className="mb-2 block text-xs font-medium text-white/70"
            >
              Event Location
            </label>

            <div className="relative">
              <MapPin className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-[#d8b68c]" />
              <input
                id="eventLocation"
                type="text"
                name="eventLocation"
                value={formData.eventLocation}
                onChange={handleChange}
                placeholder="Enter your event location"
                required
                className={`${inputClass} pl-11`}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-xs font-medium text-white/70"
            >
              Additional Details
              <span className="ml-2 font-normal text-white/30">(Optional)</span>
            </label>

            <div className="relative">
              <MessageSquare className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-[#d8b68c]" />
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us more about your event..."
                rows={4}
                className={`${inputClass} resize-none pl-11`}
              />
            </div>
          </div>

          {message && (
            <div
              className={`rounded-xl border px-4 py-3 text-sm leading-6 ${
                success
                  ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                  : "border-red-500/20 bg-red-500/10 text-red-300"
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#d8b68c] px-6 py-4 text-xs font-bold uppercase tracking-[0.18em] text-[#171815] transition hover:bg-[#e7c9a2] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Booking Request"}
            {!loading && (
              <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            )}
          </button>

          <p className="text-center text-[11px] leading-5 text-white/30">
            Your booking request will be sent to the service provider.
          </p>
        </form>
      </div>
    </div>
  );
}
