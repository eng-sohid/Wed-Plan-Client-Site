"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Loader2,
  UserRound,
  Mail,
  LockKeyhole,
  Building2,
  ImagePlus,
  ArrowRight,
  Heart,
  ShieldCheck,
  User,
  Store,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { clearTokenCache, uploadImage, errMsg } from "@/lib/api";
import { Field } from "../components/shared/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

    if (!name.trim() || !email || !password) {
      return toast.error("Name, email and password are required");
    }

    if (
      password.length < 6 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password)
    ) {
      return toast.error(
        "Password needs 6+ characters with an uppercase and a lowercase letter",
      );
    }

    if (role === "vendor" && !businessName.trim()) {
      return toast.error("Business name is required for vendors");
    }

    setLoading(true);

    try {
      let image: string | undefined;

      if (file) {
        image = await uploadImage(file);
      }

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

      if (error) {
        throw new Error(error.message || "Registration failed");
      }

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

  async function google() {
    clearTokenCache();

    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  }

  return (
    <main className="relative flex min-h-[calc(100vh-76px)] items-center justify-center overflow-hidden bg-[#171815] px-4 py-14 sm:px-6">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-[#526b50]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#d8b68c]/10 blur-[120px]" />

      <div className="relative z-10 w-full max-w-[480px]">
        {/* Brand */}
        <div className="mb-8 text-center">
          <Link href="/" className="mb-6 inline-flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d8b68c]/50 text-[#d8b68c]">
              <Heart size={19} />
            </span>

            <span className="font-serif text-2xl font-bold text-[#faf9f6]">
              WedPlan<span className="text-[#d8b68c]">.</span>
            </span>
          </Link>

          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#d8b68c]">
            Start Your Journey
          </p>

          <h1 className="mt-3 font-serif text-4xl font-medium text-[#faf9f6] sm:text-5xl">
            Create Account
          </h1>

          <p className="mt-3 text-sm leading-6 text-white/45">
            Join WedPlan and make every wedding moment unforgettable.
          </p>
        </div>

        {/* Signup Card */}
        <div className="rounded-3xl border border-white/10 bg-[#20211e]/90 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-9">
          <form onSubmit={submit} className="space-y-5">
            {/* Name */}
            <Field label="Full Name">
              <div className="relative">
                <UserRound
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                />

                <Input
                  value={form.name}
                  placeholder="Enter your full name"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="h-12 border-white/10 bg-[#171815] pl-11 text-[#faf9f6] placeholder:text-white/25 focus-visible:border-[#d8b68c]/60 focus-visible:ring-[#d8b68c]/20"
                />
              </div>
            </Field>

            {/* Email */}
            <Field label="Email Address">
              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                />

                <Input
                  type="email"
                  value={form.email}
                  placeholder="you@example.com"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="h-12 border-white/10 bg-[#171815] pl-11 text-[#faf9f6] placeholder:text-white/25 focus-visible:border-[#d8b68c]/60 focus-visible:ring-[#d8b68c]/20"
                />
              </div>
            </Field>

            {/* Password */}
            <Field label="Password">
              <div className="relative">
                <LockKeyhole
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                />

                <Input
                  type="password"
                  value={form.password}
                  placeholder="Min 6 characters, uppercase & lowercase"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="h-12 border-white/10 bg-[#171815] pl-11 text-[#faf9f6] placeholder:text-white/25 focus-visible:border-[#d8b68c]/60 focus-visible:ring-[#d8b68c]/20"
                />
              </div>
              <p className="mt-2 text-[11px] text-white/35">
                Use at least 6 characters, including uppercase and lowercase
                letters.
              </p>
            </Field>

            {/* Account Role */}
            <Field label="Choose Account Type">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: "customer" })}
                  className={`flex flex-col items-center gap-2 rounded-2xl border p-4 transition ${
                    form.role === "customer"
                      ? "border-[#d8b68c]/70 bg-[#d8b68c]/10 text-[#d8b68c]"
                      : "border-white/10 bg-[#171815] text-white/50 hover:border-white/25"
                  }`}
                >
                  <User size={21} />
                  <span className="text-sm font-semibold">Customer</span>
                  <span className="text-center text-[10px] text-white/35">
                    Plan your wedding
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: "vendor" })}
                  className={`flex flex-col items-center gap-2 rounded-2xl border p-4 transition ${
                    form.role === "vendor"
                      ? "border-[#d8b68c]/70 bg-[#d8b68c]/10 text-[#d8b68c]"
                      : "border-white/10 bg-[#171815] text-white/50 hover:border-white/25"
                  }`}
                >
                  <Store size={21} />
                  <span className="text-sm font-semibold">Vendor</span>
                  <span className="text-center text-[10px] text-white/35">
                    Offer wedding services
                  </span>
                </button>
              </div>
            </Field>

            {/* Business Name */}
            {form.role === "vendor" && (
              <Field label="Business Name">
                <div className="relative">
                  <Building2
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                  />

                  <Input
                    value={form.businessName}
                    placeholder="Enter your business name"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        businessName: e.target.value,
                      })
                    }
                    className="h-12 border-white/10 bg-[#171815] pl-11 text-[#faf9f6] placeholder:text-white/25 focus-visible:border-[#d8b68c]/60 focus-visible:ring-[#d8b68c]/20"
                  />
                </div>
              </Field>
            )}

            {/* Profile Image */}
            <Field label="Profile Image (Optional)">
              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-white/15 bg-[#171815] p-4 transition hover:border-[#d8b68c]/50">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#d8b68c]/10 text-[#d8b68c]">
                  <ImagePlus size={20} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-[#faf9f6]">
                    {file ? file.name : "Choose a profile image"}
                  </span>

                  <span className="mt-1 block text-xs text-white/35">
                    {file
                      ? "Image selected"
                      : "Select an image from your device"}
                  </span>
                </span>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </label>
            </Field>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="group h-12 w-full rounded-full bg-[#d8b68c] text-sm font-semibold text-[#171815] transition hover:bg-[#c9a77c] disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
              Or sign up with
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Google Signup */}
          <Button
            variant="outline"
            className="h-12 w-full rounded-full border-white/15 bg-transparent text-sm font-medium text-[#faf9f6] transition hover:border-[#d8b68c]/50 hover:bg-white/5 hover:text-[#d8b68c]"
            onClick={google}
          >
            <svg
              viewBox="0 0 48 48"
              className="mr-2 h-5 w-5"
              aria-hidden="true"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.25 5.48-4.71 7.17l7.19 5.59c4.2-3.88 6.56-9.59 6.56-17.23Z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.12.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.9-5.78l-7.19-5.59c-1.99 1.34-4.53 2.13-8.71 2.13-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
              />
            </svg>
            Continue with Google
          </Button>

          {/* Sign In */}
          <p className="mt-7 text-center text-sm text-white/45">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-[#d8b68c] transition hover:text-[#faf9f6]"
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Security Note */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-white/30">
          <ShieldCheck size={15} className="text-[#d8b68c]/70" />
          Your account information is protected and secure.
        </div>
      </div>
    </main>
  );
}
