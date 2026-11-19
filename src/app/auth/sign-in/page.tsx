"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { authClient } from "../../../lib/auth-client";
import { clearTokenCache } from "../../../lib/api";
import { Field } from "../../components/shared/field";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { roseBtn } from "../../../lib/format";

function safeRedirect() {
  const r = new URLSearchParams(window.location.search).get("redirect");
  return r && r.startsWith("/") && !r.startsWith("//") ? r : "/dashboard";
}

export default function SignInPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email || !form.password)
      return toast.error("Email and password are required");
    setLoading(true);
    const { error } = await authClient.signIn.email(form);
    setLoading(false);
    if (error) return toast.error(error.message || "Invalid email or password");
    clearTokenCache();
    toast.success("Welcome back!");
    router.replace(safeRedirect());
    router.refresh();
  }

  async function google() {
    clearTokenCache();
    await authClient.signIn.social({
      provider: "google",
      callbackURL: safeRedirect(),
    });
  }

  return (
    <div className="mx-auto flex min-h-[75vh] max-w-md items-center px-4 py-10">
      <div className="w-full space-y-5 rounded-2xl border bg-white p-8 shadow-sm">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold">Welcome Back</h1>
          <p className="mt-1 text-sm text-gray-500">
            Sign in to your WedPlan account
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <Field label="Email">
            <Input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </Field>
          <Field label="Password">
            <Input
              type="password"
              placeholder="••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
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
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className="relative text-center text-xs text-gray-400">
          <span className="bg-white px-2">OR</span>
          <div className="absolute inset-x-0 top-1/2 -z-10 border-t" />
        </div>

        <Button variant="outline" className="w-full" onClick={google}>
          Continue with Google
        </Button>

        <p className="text-center text-sm text-gray-500">
          No account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-rose-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
