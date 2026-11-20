"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Loader2,
  X,
  UploadCloud,
  ImagePlus,
  BriefcaseBusiness,
  MapPin,
  DollarSign,
  Sparkles,
  FileText,
  Trash2,
} from "lucide-react";

import { api, uploadImage, errMsg } from "@/lib/api";
import { CATEGORIES, type Service } from "../../types";
import { Field } from "../../components/shared/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ServiceForm({ initial }: { initial?: Service }) {
  const router = useRouter();

  const [form, setForm] = useState({
    serviceName: initial?.serviceName || "",
    category: initial?.category || "",
    description: initial?.description || "",
    price: initial ? String(initial.price) : "",
    location: initial?.location || "",
  });

  const [images, setImages] = useState<string[]>(initial?.images || []);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const inputClass =
    "border-white/10 bg-[#171815] text-[#faf9f6] placeholder:text-white/25 focus-visible:border-[#d8b68c]/60 focus-visible:ring-[#d8b68c]/20";

  const set =
    (k: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setForm({ ...form, [k]: e.target.value });
    };

  async function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target;
    const files = Array.from(input.files || []);

    if (!files.length) return;

    const remaining = 5 - images.length;

    if (remaining <= 0) {
      toast.error("You can upload a maximum of 5 images");
      input.value = "";
      return;
    }

    if (files.length > remaining) {
      toast.error(`You can only upload ${remaining} more image(s)`);
    }

    const selectedFiles = files.slice(0, remaining);

    setUploading(true);

    try {
      const urls = await Promise.all(selectedFiles.map(uploadImage));
      setImages((prev) => [...prev, ...urls].slice(0, 5));
      toast.success("Image(s) uploaded successfully");
    } catch (err) {
      toast.error(errMsg(err));
    } finally {
      setUploading(false);
      input.value = "";
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (
      !form.serviceName.trim() ||
      !form.category ||
      !form.description.trim() ||
      !form.location.trim() ||
      form.price === ""
    ) {
      return toast.error("Please fill in all required fields");
    }

    if (isNaN(Number(form.price)) || Number(form.price) < 0) {
      return toast.error("Enter a valid price");
    }

    if (!images.length) {
      return toast.error("Please upload at least one image");
    }

    setSaving(true);

    try {
      await api(initial ? `/services/${initial._id}` : "/services", {
        method: initial ? "PUT" : "POST",
        body: {
          ...form,
          price: Number(form.price),
          images,
        },
      });

      toast.success(
        initial ? "Service updated!" : "Service submitted for admin approval!",
      );

      router.push("/dashboard/vendor/services");
    } catch (err) {
      toast.error(errMsg(err));
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="relative max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[#20211e] p-5 shadow-2xl shadow-black/10 sm:p-8"
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#526b50]/10 blur-[100px]" />

      <div className="relative">
        {/* Heading */}
        <div className="mb-8">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[#d8b68c]/20 bg-[#d8b68c]/10">
            <BriefcaseBusiness className="h-5 w-5 text-[#d8b68c]" />
          </div>

          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d8b68c]">
            Vendor Workspace
          </p>

          <h2 className="font-serif text-3xl text-[#faf9f6] sm:text-4xl">
            {initial ? "Update Your" : "Create Your"}{" "}
            <span className="italic text-[#d8b68c]">Service.</span>
          </h2>

          <p className="mt-3 text-sm leading-6 text-white/40">
            {initial
              ? "Keep your service information accurate and up to date."
              : "Showcase your wedding service and reach more customers."}
          </p>
        </div>

        <div className="space-y-6">
          {/* Basic Information */}
          <section className="space-y-5">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <Sparkles className="h-4 w-4 text-[#d8b68c]" />
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                Basic Information
              </h3>
            </div>

            <Field label="Service Name">
              <Input
                value={form.serviceName}
                onChange={set("serviceName")}
                placeholder="e.g. Premium Wedding Photography"
                className={inputClass}
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Category">
                <select
                  className="h-10 w-full rounded-md border border-white/10 bg-[#171815] px-3 text-sm text-[#faf9f6] outline-none transition focus:border-[#d8b68c]/60 focus:ring-2 focus:ring-[#d8b68c]/20"
                  value={form.category}
                  onChange={set("category")}
                >
                  <option value="" className="bg-[#171815]">
                    Select category
                  </option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c} className="bg-[#171815]">
                      {c}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Price (USD)">
                <div className="relative">
                  <DollarSign className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#d8b68c]/70" />
                  <Input
                    type="number"
                    min="0"
                    value={form.price}
                    onChange={set("price")}
                    placeholder="Enter price"
                    className={`pl-10 ${inputClass}`}
                  />
                </div>
              </Field>
            </div>

            <Field label="Service Location">
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#d8b68c]/70" />
                <Input
                  value={form.location}
                  onChange={set("location")}
                  placeholder="e.g. Dhaka, Bangladesh"
                  className={`pl-10 ${inputClass}`}
                />
              </div>
            </Field>

            <Field label="Service Description">
              <div className="relative">
                <FileText className="pointer-events-none absolute left-3.5 top-4 h-4 w-4 text-[#d8b68c]/70" />
                <Textarea
                  rows={6}
                  value={form.description}
                  onChange={set("description")}
                  placeholder="Describe your service, experience and what makes it special..."
                  className={`resize-none pl-10 ${inputClass}`}
                />
              </div>
            </Field>
          </section>

          {/* Images */}
          <section className="space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <ImagePlus className="h-4 w-4 text-[#d8b68c]" />
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                  Service Gallery
                </h3>
              </div>

              <span className="text-xs tabular-nums text-white/35">
                {images.length}/5 Images
              </span>
            </div>

            <label
              className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#d8b68c]/30 bg-[#171815] px-5 py-9 text-center transition hover:border-[#d8b68c]/60 hover:bg-[#d8b68c]/[0.04] ${
                uploading || images.length >= 5
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
            >
              {uploading ? (
                <Loader2 className="mb-3 h-8 w-8 animate-spin text-[#d8b68c]" />
              ) : (
                <UploadCloud className="mb-3 h-8 w-8 text-[#d8b68c]" />
              )}

              <span className="text-sm font-semibold text-[#faf9f6]">
                {uploading ? "Uploading images..." : "Upload Service Images"}
              </span>

              <span className="mt-2 text-xs text-white/35">
                Select images from your device · Maximum 5 images
              </span>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={onFiles}
                disabled={uploading || images.length >= 5}
                className="hidden"
              />
            </label>

            {images.length > 0 && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {images.map((img, i) => (
                  <div
                    key={img + i}
                    className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-[#171815]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={`Service image ${i + 1}`}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />

                    <button
                      type="button"
                      onClick={() =>
                        setImages((prev) => prev.filter((_, x) => x !== i))
                      }
                      aria-label="Remove image"
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/70 text-white transition hover:bg-red-500"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>

                    {i === 0 && (
                      <span className="absolute bottom-2 left-2 rounded-full bg-[#d8b68c] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#171815]">
                        Cover Image
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Submit */}
        <div className="mt-8 border-t border-white/10 pt-6">
          <Button
            type="submit"
            disabled={saving || uploading}
            className="h-12 w-full rounded-full bg-[#d8b68c] text-xs font-bold uppercase tracking-[0.18em] text-[#171815] transition hover:bg-[#e7c9a2] disabled:opacity-50 sm:w-auto sm:min-w-48"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : initial ? (
              "Update Service"
            ) : (
              "Submit Service"
            )}
          </Button>

          <p className="mt-3 text-xs leading-5 text-white/30">
            {initial
              ? "Your changes will be saved to your existing service."
              : "Your service will be submitted for admin approval."}
          </p>
        </div>
      </div>
    </form>
  );
}
