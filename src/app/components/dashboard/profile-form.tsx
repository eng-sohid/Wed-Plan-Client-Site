"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { api, uploadImage, errMsg } from "@/lib/api";
import { useApi } from "../../hooks/use-api";
import { useAuth } from "../../hooks/use-auth";
import type { MeUser } from "../../types";
import { Field } from "../../components/shared/field";
import { Avatar } from "../../components/shared/avatar";
import { QueryState } from "../../components/shared/query-state";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { roseBtn } from "@/lib/format";

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
    if (!form.name.trim()) return toast.error("Name is required");
    setSaving(true);
    try {
      await api("/me", { method: "PATCH", body: form });
      toast.success("Profile updated successfully!");
      refetch();
    } catch (err) {
      toast.error(errMsg(err));
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={save}
      className="max-w-xl space-y-5 rounded-2xl border bg-white p-6 shadow-sm"
    >
      <div className="flex items-center gap-4">
        <Avatar src={form.image} name={form.name} size={72} />
        <div className="flex-1">
          <Field label="Profile Image">
            <Input
              type="file"
              accept="image/*"
              onChange={onFile}
              disabled={uploading}
            />
          </Field>
          {uploading && (
            <p className="mt-1 text-xs text-gray-500">Uploading...</p>
          )}
        </div>
      </div>
      <Field label="Full Name">
        <Input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </Field>
      <Field label="Email">
        <Input value={user.email || ""} disabled />
      </Field>
      <Field label="Phone">
        <Input
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </Field>
      {user.role === "vendor" && (
        <Field label="Business Name">
          <Input
            value={form.businessName}
            onChange={(e) => setForm({ ...form, businessName: e.target.value })}
          />
        </Field>
      )}
      <Button type="submit" disabled={saving || uploading} className={roseBtn}>
        {saving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Save Changes"
        )}
      </Button>
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
