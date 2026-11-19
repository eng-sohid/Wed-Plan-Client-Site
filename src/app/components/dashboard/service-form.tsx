"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import { api, uploadImage, errMsg } from "@/lib/api";
import { CATEGORIES, type Service } from "../../types";
import { Field } from "../../components/shared/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { roseBtn, selectCls } from "@/lib/format";

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

  const set =
    (k: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm({ ...form, [k]: e.target.value });

  async function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target;
    const files = Array.from(input.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      const urls = await Promise.all(files.map(uploadImage));
      setImages((prev) => [...prev, ...urls].slice(0, 5));
      toast.success("Image(s) uploaded");
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
    if (isNaN(Number(form.price)) || Number(form.price) < 0)
      return toast.error("Enter a valid price");
    if (!images.length) return toast.error("Please upload at least one image");

    setSaving(true);
    try {
      await api(initial ? `/services/${initial._id}` : "/services", {
        method: initial ? "PUT" : "POST",
        body: { ...form, price: Number(form.price), images },
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
      className="max-w-2xl space-y-5 rounded-2xl border bg-white p-6 shadow-sm"
    >
      <Field label="Service Name">
        <Input value={form.serviceName} onChange={set("serviceName")} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Category">
          <select
            className={selectCls}
            value={form.category}
            onChange={set("category")}
          >
            <option value="">Select category</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Price (USD)">
          <Input
            type="number"
            min="0"
            value={form.price}
            onChange={set("price")}
          />
        </Field>
      </div>
      <Field label="Location">
        <Input value={form.location} onChange={set("location")} />
      </Field>
      <Field label="Description">
        <Textarea
          rows={5}
          value={form.description}
          onChange={set("description")}
        />
      </Field>
      <Field label="Service Images (up to 5)">
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={onFiles}
          disabled={uploading || images.length >= 5}
        />
      </Field>
      {uploading && (
        <p className="text-sm text-gray-500">Uploading images...</p>
      )}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {images.map((img, i) => (
            <div key={img + i} className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt=""
                className="h-20 w-28 rounded-lg object-cover"
              />
              <button
                type="button"
                onClick={() => setImages(images.filter((_, x) => x !== i))}
                className="absolute -right-2 -top-2 rounded-full bg-red-600 p-0.5 text-white"
                aria-label="Remove image"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
      <Button type="submit" disabled={saving || uploading} className={roseBtn}>
        {saving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : initial ? (
          "Update Service"
        ) : (
          "Add Service"
        )}
      </Button>
    </form>
  );
}
