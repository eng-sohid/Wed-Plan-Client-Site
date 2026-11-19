"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { clearTokenCache, uploadImage, errMsg } from "@/lib/api";
import { Field } from "../components/shared/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { roseBtn } from "@/lib/format";

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    businessName: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const { name, email, password, role, businessName } = form;

    if (!name.trim() || !email || !password)
      return toast.error("Name, email and password are required");
    if (
      password.length < 6 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password)
    ) {
      return toast.error(
        "Password needs 6+ characters with an uppercase and a lowercase letter",
      );
    }
    if (role === "vendor" && !businessName.trim())
      return toast.error("Business name is required for vendors");

    setLoading(true);
    try {
      let image: string | undefined;
      if (file) image = await uploadImage(file);

      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email,
        password,
        image,
        fetchOptions: {
          body: {
            role,
            businessName: role === "vendor" ? businessName.trim() : undefined,
          },
        },
      });
      if (error) throw new Error(error.message || "Registration failed");

      clearTokenCache();
      toast.success("Account created successfully!");
      router.replace("/dashboard");
      router.refresh();
    } catch (err) {
      toast.error(errMsg(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[75vh] max-w-md items-center px-4 py-10">
      <div className="w-full space-y-5 rounded-2xl border bg-white p-8 shadow-sm">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold">Create Account</h1>
          <p className="mt-1 text-sm text-gray-500">Join WedPlan today</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <Field label="Full Name">
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </Field>
          <Field label="Email">
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </Field>
          <Field label="Password">
            <Input
              type="password"
              placeholder="Min 6 chars, upper & lower case"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </Field>

          <Field label="Account Role">
            <div className="grid grid-cols-2 gap-3">
              {["customer", "vendor"].map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setForm({ ...form, role: r })}
                  className={`rounded-lg border p-2.5 text-sm font-medium capitalize ${form.role === r ? "border-rose-500 bg-rose-50 text-rose-700" : "hover:bg-gray-50"}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </Field>

          {form.role === "vendor" && (
            <Field label="Business Name">
              <Input
                value={form.businessName}
                onChange={(e) =>
                  setForm({ ...form, businessName: e.target.value })
                }
              />
            </Field>
          )}

          <Field label="Profile Image (optional)">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </Field>

          <Button
            type="submit"
            disabled={loading}
            className={`w-full ${roseBtn}`}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>

        <Button
          variant="outline"
          className="w-full"
          onClick={() =>
            authClient.signIn.social({
              provider: "google",
              callbackURL: "/dashboard",
            })
          }
        >
          Continue with Google
        </Button>

        <p className="text-center text-sm text-gray-500">
          Already registered?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-rose-600 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
