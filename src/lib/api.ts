export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

let cached: { token: string; exp: number } | null = null;

export function clearTokenCache() {
  cached = null;
}

export function errMsg(e: unknown) {
  return e instanceof Error ? e.message : "Something went wrong";
}

async function getToken() {
  if (cached && cached.exp > Date.now()) return cached.token;
  const res = await fetch("/api/backend-token", { cache: "no-store" });
  if (!res.ok) throw new Error("Please sign in to continue");
  const { token } = await res.json();
  cached = { token, exp: Date.now() + 10 * 60 * 1000 };
  return token as string;
}

async function parse<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    console.error("API Error:", {
      status: res.status,
      response: data,
    });

    throw new Error(
      (data as { message?: string }).message ||
        (data as { error?: string }).error ||
        "Request failed",
    );
  }

  return data as T;
}

export async function publicApi<T>(path: string): Promise<T> {
  return parse<T>(await fetch(`${API_URL}${path}`, { cache: "no-store" }));
}

export async function api<T>(
  path: string,
  opts: { method?: string; body?: unknown } = {},
): Promise<T> {
  const token = await getToken();
  const res = await fetch(`${API_URL}${path}`, {
    method: opts.method || "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      ...(opts.body ? { "Content-Type": "application/json" } : {}),
    },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  return parse<T>(res);
}

export async function uploadImage(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("image", file);
  const data = await parse<{ url: string }>(
    await fetch("/api/upload", { method: "POST", body: fd }),
  );
  return data.url;
}
