import { deleteCookie, setCookie } from "@/actions/cookie";
import { fetchFromApi } from "./api";
import { ICookiesKey } from "@/types";

// Token refresh utility
export async function refreshAccessToken(type: 'admin' | 'super-admin') {
  const prefix = type === 'super-admin' ? 'superAdmin' : 'admin';
  const refreshToken = localStorage.getItem(`${prefix}RefreshToken`);
  
  if (!refreshToken) {
    return false;
  }
  
  
  try {
    const data = await fetchFromApi('auth/refresh-token', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refresh_token: refreshToken })
    });
    
    if (data.status !== 200) {
      throw new Error(data.message || "Failed to refresh token");
    }
    
    localStorage.setItem(`${prefix}AccessToken`, data.access_token);
    localStorage.setItem(`${prefix}TokenExpiry`, String(Date.now() + 24 * 60 * 60 * 1000));
    
    return true;
  } catch (error) {
    // If refresh fails, log out the user
    logout(type);
    return false;
  }
}

// Check if token is expired
export function isTokenExpired(type: 'admin' | 'super-admin'): boolean {
  const prefix = type === 'super-admin' ? 'superAdmin' : 'admin';
  const expiry = localStorage.getItem(`${prefix}TokenExpiry`);

  const expired = !expiry || Number(expiry) < Date.now();

  if (expired) {
    localStorage.removeItem(`${prefix}Auth`);
    localStorage.removeItem(`${prefix}AccessToken`);
    localStorage.removeItem(`${prefix}TokenExpiry`);
    localStorage.removeItem(`${prefix}UserData`);
    localStorage.removeItem(`${prefix}RefreshToken`);
    localStorage.removeItem(ICookiesKey.PLAN);
    localStorage.removeItem(ICookiesKey.SUBSCRIPTION);
    localStorage.removeItem(ICookiesKey.USER);
    deleteCookie(ICookiesKey.AUTHTOKEN);
  deleteCookie(ICookiesKey.ROLE);
  deleteCookie(ICookiesKey.EXPRIY);
deleteCookie(ICookiesKey.USER)
    window.location.href = type === 'super-admin' ? '/super-admin/login' : '/admin/login';
    }

  return expired;
}


// Logout function
export function logout(type: 'admin' | 'super-admin') {
  const prefix = type === 'super-admin' ? 'superAdmin' : 'admin';
  console.log("logout called for ",prefix)
  localStorage.removeItem(`${prefix}AccessToken`);
  localStorage.removeItem(`${prefix}RefreshToken`);
  localStorage.removeItem(`${prefix}TokenExpiry`);
  localStorage.removeItem(`${prefix}Auth`);
  localStorage.removeItem(`${prefix}UserData`);
  localStorage.removeItem(`role`);
  deleteCookie(ICookiesKey.AUTHTOKEN);
  deleteCookie(ICookiesKey.ROLE);
  deleteCookie(ICookiesKey.EXPRIY);
  deleteCookie(ICookiesKey.USER)
}

// Check if user is authenticated
export function isAuthenticated(type: 'admin' | 'super-admin'): boolean {
  console.log(`isAuthenticated: Checking auth for ${type}`);
  const prefix = type === 'super-admin' ? 'superAdmin' : 'admin';
  return localStorage.getItem(`${prefix}Auth`) === 'true';
}

// Get user data
export function getUserData(type: 'admin' | 'super-admin') {
  const prefix = type === 'super-admin' ? 'superAdmin' : 'admin';
  const userData = localStorage.getItem(`${prefix}UserData`);
  return userData ? JSON.parse(userData) : null;
}
