"use client";
import { authClient } from "@/lib/auth-client";
import { Role } from "../types";

export function useAuth() {
  const { data, isPending, refetch } = authClient.useSession();
  const user = data?.user;
  return {
    user,
    role: (user as (typeof user & { role?: Role }) | undefined)?.role,
    isPending,
    refetch,
  };
}
