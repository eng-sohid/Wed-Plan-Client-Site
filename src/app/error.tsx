"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#faf9f6] px-6 text-center">
      <h2 className="text-3xl font-bold text-[#252820]">
        Something went wrong!
      </h2>

      <p className="mt-3 text-[#77796f]">
        We encountered an unexpected error. Please try again.
      </p>

      <button
        onClick={() => reset()}
        className="mt-6 rounded-full bg-[#526b50] px-7 py-3 font-medium text-white transition hover:bg-[#40563e]"
      >
        Try Again
      </button>
    </div>
  );
}
