// 'server-only'
import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';
import { ICookiesKey } from '@/types';

type Tags = string[];

async function getAuthHeader() {
  const store = await cookies();
  const token = store.get(ICookiesKey.AUTHTOKEN)?.value;
  if (!token) throw new Error('Missing auth token');
  return { Authorization: `Bearer ${token}` };
}

async function handleRes<T>(res: Response, tags: Tags, isGet: boolean): Promise<T> {
  const json = await res.json();
  if (!res.ok) {
    const msg = json?.message || res.statusText;
    throw new Error(`${res.status}: ${msg}`);
  }
  if (!isGet && tags.length) tags.forEach(tag => revalidateTag(tag));
  return json as T;
}

function normalizeHeaders(headers?: HeadersInit): Record<string, string> {
  if (!headers) return {};
  if (headers instanceof Headers) {
    const result: Record<string, string> = {};
    headers.forEach((value, key) => { result[key] = value; });
    return result;
  }
  if (Array.isArray(headers)) {
    return Object.fromEntries(headers);
  }
  return { ...headers };
}

/** GET */
export async function fetchGet<T>(
  url: string,
  opts?: { tags?: Tags; isWithCache?: boolean; headers?: HeadersInit; isWithToken?: boolean }
): Promise<T> {
  const { tags = [], isWithCache = false, headers: custom = {}, isWithToken = true } = opts || {};
  const headers: Record<string, string> = { ...normalizeHeaders(custom), 'Content-Type': 'application/json' };
  if (isWithToken) Object.assign(headers, await getAuthHeader());

  const res = await fetch(url, {
    method: 'GET',
    headers,
    cache: isWithCache ? 'force-cache' : 'no-store',
    next: { tags },
  });
  return handleRes<T>(res, tags, true);
}

/** POST */
export async function fetchPost<T>(
  url: string,
  body: any,
  opts?: { tags?: Tags; headers?: HeadersInit; contentType?: string; isWithToken?: boolean }
): Promise<T> {
  const { tags = [], headers: custom = {}, contentType } = opts || {};
  const headers: Record<string, string> = { ...normalizeHeaders(custom) };
  headers['Content-Type'] = contentType || 'application/json';
  if (opts?.isWithToken ?? true) Object.assign(headers, await getAuthHeader());

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: headers['Content-Type'].includes('json') ? JSON.stringify(body) : body,
    cache: 'no-store',
  });
  return handleRes<T>(res, tags, false);
}

/** PUT */
export async function fetchPut<T>(url: string, body: any, opts?: { tags?: Tags; headers?: HeadersInit; contentType?: string; isWithToken?: boolean }): Promise<T> {
  // Same as POST with method 'PUT'
  const result = await fetchPost<T>(url, body, { ...opts, headers: opts?.headers, contentType: opts?.contentType, isWithToken: opts?.isWithToken ?? true });
  return result;
}

/** PATCH */
export async function fetchPatch<T>(url: string, body: any, opts?: { tags?: Tags; headers?: HeadersInit; contentType?: string; isWithToken?: boolean }): Promise<T> {
  const { tags = [], headers: custom = {}, contentType, isWithToken = true } = opts || {};
  const headers: Record<string, string> = { ...normalizeHeaders(custom) };
  headers['Content-Type'] = contentType || 'application/json';
  if (isWithToken) Object.assign(headers, await getAuthHeader());

  const res = await fetch(url, {
    method: 'PATCH',
    headers,
    body: headers['Content-Type'].includes('json') ? JSON.stringify(body) : body,
    cache: 'no-store',
  });
  return handleRes<T>(res, tags, false);
}

/** DELETE */
export async function fetchDelete<T>(
  url: string,
  opts?: { tags?: Tags; body?: any; headers?: HeadersInit; isWithToken?: boolean; contentType?: string }
): Promise<T> {
  const { tags = [], headers: custom = {}, isWithToken = true, contentType, body } = opts || {};
  const headers: Record<string, string> = { ...normalizeHeaders(custom) };
  headers['Content-Type'] = contentType || 'application/json';
  if (isWithToken) Object.assign(headers, await getAuthHeader());

  const res = await fetch(url, {
    method: 'DELETE',
    headers,
    body: body !== undefined ? (headers['Content-Type'].includes('json') ? JSON.stringify(body) : body) : undefined,
    cache: 'no-store',
  });
  return handleRes<T>(res, tags, false);
}
