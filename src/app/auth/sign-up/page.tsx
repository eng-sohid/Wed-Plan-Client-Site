"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

type UserRole = "customer" | "vendor";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("customer");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");

    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      setMessage("Password must contain uppercase and lowercase letters!");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        fetchOptions: {
          body: { role },
        },
      });

      if (error) {
        setMessage(error.message || "Registration failed!");
        return;
      }

      router.push(
        role === "vendor" ? "/dashboard/vendor" : "/dashboard/customer",
      );

      router.refresh();
    } catch {
      setMessage("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setMessage("Google registration role selection will be connected next.");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-rose-50 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="text-center text-3xl font-bold text-gray-900">
          Create Account
        </h1>

        <p className="mt-2 text-center text-gray-500">
          Join WedPlan and plan your special day.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-rose-400"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-rose-400"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              minLength={6}
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-rose-400"
            />

            <p className="mt-1 text-xs text-gray-400">
              Minimum 6 characters, including uppercase and lowercase letters.
            </p>
          </div>

          {/* Account Type */}

          <div>
            <label className="mb-3 block font-semibold text-gray-700">
              Choose Account Type
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("customer")}
                className={`rounded-xl border p-4 text-left transition ${
                  role === "customer"
                    ? "border-rose-500 bg-rose-50 text-rose-600"
                    : "border-gray-200 text-gray-600 hover:border-rose-300"
                }`}
              >
                <span className="block font-bold">Customer</span>
                <span className="mt-1 block text-xs">
                  Find and book services
                </span>
              </button>

              <button
                type="button"
                onClick={() => setRole("vendor")}
                className={`rounded-xl border p-4 text-left transition ${
                  role === "vendor"
                    ? "border-rose-500 bg-rose-50 text-rose-600"
                    : "border-gray-200 text-gray-600 hover:border-rose-300"
                }`}
              >
                <span className="block font-bold">Vendor</span>
                <span className="mt-1 block text-xs">
                  Provide wedding services
                </span>
              </button>
            </div>
          </div>

          {message && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-rose-500 py-3 font-semibold text-white transition hover:bg-rose-600 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-400">OR</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignUp}
          className="w-full rounded-xl border border-gray-200 py-3 font-semibold text-gray-700 hover:bg-gray-50"
        >
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-rose-500 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
