"use server";
import { cookies } from "next/headers";

const environment = process.env.NEXT_PUBLIC_NODE_ENV;

// Helper function to get cookie store to avoid repetition
async function getCookieStore() {
  return await cookies();
}

export async function getCookie(key: string): Promise<string | undefined> {
  const store = await getCookieStore();
  return store.get(key)?.value;
}

export async function setCookie(
  key: string,
  value: string,
  opts: Partial<{
    path: string;
    domain: string;
    httpOnly: boolean;
    secure: boolean;
    sameSite: "lax" | "strict" | "none";
    maxAge: number;
  }> = {}
): Promise<void> {
  const store = await getCookieStore();
  store.set(key, value, {
    path: "/",
    httpOnly: true,
    secure: environment === "production",
    sameSite: "lax",
    ...opts,
  });
}

export async function deleteCookie(key: string): Promise<void> {
  const store = await getCookieStore();
  store.delete(key);
}
