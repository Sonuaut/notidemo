"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Only run on the client side
    if (typeof window === 'undefined') return;
    
    const checkExistingAuth = () => {
      try {
        console.log("AuthProvider: Checking auth on path:", pathname);
        
        // Check for auth status
        const superAdminAuth = localStorage.getItem("superAdminAuth") === "true";
        const adminAuth = localStorage.getItem("adminAuth") === "true";
        
        console.log("AuthProvider: Auth status:", { superAdminAuth, adminAuth });
        
        // Skip checks on auth pages and public pages
        if (pathname === "/" || 
            pathname.includes('/login') || 
            pathname.includes('/signup') || 
            pathname.includes('/forgot-password') ||
            pathname.includes('/reset-password') ||
            pathname.includes('/verify-signup-otp')||
            pathname.includes('/verify-reset-otp')||
            pathname.includes('/admin/verify-login-otp')||
            pathname.includes('/super-admin/verify-super-otp')||
            pathname.includes('/verify-otp')) 
        {
          // If on login page but already authenticated, redirect to dashboard
          if (pathname === "/super-admin/login" && superAdminAuth) {
            console.log("AuthProvider: Already authenticated as super admin, redirecting from login page");
            router.push("/super-admin/dashboard");
          }
          
          if (pathname === "/admin/login" && adminAuth) {
            console.log("AuthProvider: Already authenticated as admin, redirecting from login page");
            router.push("/admin/dashboard");
          }
          
          return;
        }

        // If logged in as super admin but trying to access admin area
        // Allow access to admin/plans/success route for super-admin
        if (superAdminAuth && pathname.includes('/admin') && !pathname.includes('/login') && !pathname.includes('/admin/plans/success')) {
          console.log("AuthProvider: Logged in as super admin but trying to access admin area, redirecting to super admin dashboard");
          router.push('/super-admin/dashboard');
          return;
        }
        
        // If logged in as admin but trying to access super admin area
        if (adminAuth && pathname.includes('/super-admin') && !pathname.includes('/login')) {
          console.log("AuthProvider: Logged in as admin but trying to access super admin area, redirecting to admin dashboard");
          router.push('/admin/dashboard');
          return;
        }
        
        // If on protected super admin path but no super admin auth
        if (pathname.includes('/super-admin') && !superAdminAuth && !pathname.includes('/login')) {
          console.log("AuthProvider: On super admin path without auth, redirecting to login");
          router.push('/super-admin/login');
          return;
        }
        
        // If on protected admin path but no admin auth
        if (pathname.includes('/admin') && !adminAuth && !pathname.includes('/login')) {
          console.log("AuthProvider: On admin path without auth, redirecting to login");
          router.push('/admin/login');
          return;
        }
        
        // If on root path, redirect based on auth status
        if (pathname === '/') {
          if (superAdminAuth) {
            router.push('/super-admin/dashboard');
          } else if (adminAuth) {
            router.push('/admin/dashboard');
          } else {
            router.push('/admin/login');
          }
        }
      } catch (error) {
        console.error("Auth check error:", error);
      }
    };

    // Run the check immediately
    checkExistingAuth();
  }, [pathname, router]);

  return <>{children}</>;
}
