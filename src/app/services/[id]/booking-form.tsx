"use client";

import { useState } from "react";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

type BookingFormProps = {
  serviceId: string;
  serviceTitle: string;
};

export default function BookingForm({
  serviceId,
  serviceTitle,
}: BookingFormProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    weddingDate: "",
    message: "",
  });

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

    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      const response = await fetch(`${BASE_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId,
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Booking failed!");
      }

      setSuccess(true);
      setMessage("Your booking has been submitted successfully!");

      setFormData({
        name: "",
        email: "",
        phone: "",
        weddingDate: "",
        message: "",
      });
    } catch (error) {
      setSuccess(false);
      setMessage(
        error instanceof Error ? error.message : "Something went wrong!",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-xl md:p-10">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-rose-500">
          Book Your Service
        </p>

        <h2 className="mt-3 text-3xl font-bold text-gray-900">
          Let&apos;s Plan Your Special Day
        </h2>

        <p className="mt-3 text-gray-500">
          Selected Service:{" "}
          <span className="font-semibold text-rose-500">{serviceTitle}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Your Name *
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-rose-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Email Address *
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-rose-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Phone Number *
          </label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-rose-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Wedding Date *
          </label>

          <input
            type="date"
            name="weddingDate"
            value={formData.weddingDate}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            required
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-rose-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Additional Message
          </label>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your wedding..."
            rows={4}
            className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-rose-400"
          />
        </div>

        {message && (
          <p
            className={`rounded-xl p-3 text-sm ${
              success ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-rose-500 px-6 py-4 font-semibold text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit Booking"}
        </button>
      </form>
    </div>
  );
}
