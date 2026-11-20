"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Loader2,
  Camera,
  UserRound,
  Mail,
  Phone,
  BriefcaseBusiness,
  Sparkles,
  Save,
} from "lucide-react";

import { api, uploadImage, errMsg } from "@/lib/api";
import { useApi } from "../../hooks/use-api";
import { useAuth } from "../../hooks/use-auth";
import type { MeUser } from "../../types";
import { Field } from "../../components/shared/field";
import { Avatar } from "../../components/shared/avatar";
import { QueryState } from "../../components/shared/query-state";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function ProfileFields({
  user,
  refetch,
}: {
  user: MeUser;
  refetch: () => void;
}) {
  const [form, setForm] = useState({
    name: user.name,
    phone: user.phone,
    businessName: user.businessName,
    image: user.image,
  });

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target;
    const file = input.files?.[0];

    if (!file) return;

    setUploading(true);

    try {
      const url = await uploadImage(file);
      setForm((f) => ({ ...f, image: url }));
      toast.success("Image uploaded. Press Save to apply");
    } catch (err) {
      toast.error(errMsg(err));
    } finally {
      setUploading(false);
      input.value = "";
    }
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();

    if (!form.name.trim()) {
      return toast.error("Name is required");
    }

    setSaving(true);

    try {
      await api("/me", {
        method: "PATCH",
        body: form,
      });

      toast.success("Profile updated successfully!");
      refetch();
    } catch (err) {
      toast.error(errMsg(err));
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "border-white/10 bg-[#171815] text-[#faf9f6] placeholder:text-white/25 focus-visible:border-[#d8b68c]/60 focus-visible:ring-[#d8b68c]/20";

  return (
    <form
      onSubmit={save}
      className="relative max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#20211e] p-5 shadow-2xl shadow-black/10 sm:p-8"
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#526b50]/10 blur-[100px]" />

      <div className="relative">
        {/* Heading */}
        <div className="mb-8">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[#d8b68c]/20 bg-[#d8b68c]/10">
            <UserRound className="h-5 w-5 text-[#d8b68c]" />
          </div>

          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d8b68c]">
            Account Settings
          </p>

          <h2 className="font-serif text-3xl text-[#faf9f6] sm:text-4xl">
            Personal <span className="italic text-[#d8b68c]">Information.</span>
          </h2>

          <p className="mt-3 text-sm leading-6 text-white/40">
            Manage your account details and keep your profile up to date.
          </p>
        </div>

        {/* Profile Image */}
        <div className="mb-8 flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#171815] p-5 sm:flex-row sm:items-center">
          <div className="relative w-fit">
            <Avatar src={form.image} name={form.name} size={76} />

            <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#171815] bg-[#d8b68c]">
              <Camera className="h-3.5 w-3.5 text-[#171815]" />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-[#faf9f6]">
              Profile Photo
            </p>

            <p className="mt-1 text-xs leading-5 text-white/40">
              Upload a clear photo to personalize your account.
            </p>

            <div className="mt-3">
              <Field label="Choose Image">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={onFile}
                  disabled={uploading}
                  className={`h-auto cursor-pointer py-2 text-xs file:mr-3 file:rounded-lg file:border-0 file:bg-[#d8b68c]/15 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-[#d8b68c] ${inputClass}`}
                />
              </Field>
            </div>

            {uploading && (
              <p className="mt-2 flex items-center gap-2 text-xs text-[#d8b68c]">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Uploading image...
              </p>
            )}
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Sparkles className="h-4 w-4 text-[#d8b68c]" />
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              Basic Details
            </h3>
          </div>

          <Field label="Full Name">
            <div className="relative">
              <UserRound className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#d8b68c]/70" />
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your full name"
                className={`pl-10 ${inputClass}`}
              />
            </div>
          </Field>

          <Field label="Email Address">
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <Input
                value={user.email || ""}
                disabled
                className="border-white/10 bg-[#171815]/60 pl-10 text-white/40 disabled:opacity-100"
              />
            </div>
            <p className="mt-1.5 text-[11px] text-white/30">
              Your registered email address cannot be changed here.
            </p>
          </Field>

          <Field label="Phone Number">
            <div className="relative">
              <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#d8b68c]/70" />
              <Input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Enter your phone number"
                className={`pl-10 ${inputClass}`}
              />
            </div>
          </Field>

          {user.role === "vendor" && (
            <>
              <div className="flex items-center gap-2 border-b border-white/10 pb-3 pt-3">
                <BriefcaseBusiness className="h-4 w-4 text-[#d8b68c]" />
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                  Business Details
                </h3>
              </div>

              <Field label="Business Name">
                <div className="relative">
                  <BriefcaseBusiness className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#d8b68c]/70" />
                  <Input
                    value={form.businessName}
                    onChange={(e) =>
                      setForm({ ...form, businessName: e.target.value })
                    }
                    placeholder="Enter your business name"
                    className={`pl-10 ${inputClass}`}
                  />
                </div>
              </Field>
            </>
          )}
        </div>

        {/* Save Button */}
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
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default function ProfileForm() {
  const { data, loading, error, reload } = useApi<{ user: MeUser }>("/me");
  const { refetch } = useAuth();

  return (
    <QueryState loading={loading} error={error} onRetry={reload}>
      {data && (
        <ProfileFields
          key={`${data.user.email}-${data.user.name}-${data.user.phone}-${data.user.businessName}-${data.user.image}`}
          user={data.user}
          refetch={refetch}
        />
      )}
    </QueryState>
  );
}
