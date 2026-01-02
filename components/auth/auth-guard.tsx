"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
  type: "admin" | "super-admin"
}

export function AuthGuard({ children, type }: AuthGuardProps) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Only run on the client side
    if (typeof window === 'undefined') {
      return;
    }
    
    // Set a timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (isLoading) {
        console.log("Auth check timed out, redirecting to login");
        const loginPath = type === "super-admin" ? "/super-admin/login" : "/admin/login";
        router.push(loginPath);
      }
    }, 3000); // 3 seconds timeout
    
    const checkAuth = async () => {
      try {
        console.log(`AuthGuard: Checking auth for ${type}`);
        
        const prefix = type === "super-admin" ? "superAdmin" : "admin";
        const authKey = `${prefix}Auth`;
        const isAuth = localStorage.getItem(authKey) === "true";
        
        console.log(`AuthGuard: ${authKey} = ${isAuth}`);
        
        // Check if logged in as the other type
        const otherPrefix = type === "super-admin" ? "admin" : "superAdmin";
        const otherAuth = localStorage.getItem(`${otherPrefix}Auth`) === "true";
        
        if (!isAuth) {
          // If logged in as the other type, redirect to their dashboard
          if (otherAuth) {
            const dashboardPath = type === "super-admin" ? "/admin/dashboard" : "/super-admin/dashboard";
            console.log(`AuthGuard: Logged in as ${otherPrefix}, redirecting to ${dashboardPath}`);
            router.push(dashboardPath);
            return;
          }
          
          // Not logged in at all, redirect to login
          console.log(`AuthGuard: Not authenticated, redirecting to login`);
          const loginPath = type === "super-admin" ? "/super-admin/login" : "/admin/login";
          router.push(loginPath);
          return;
        }
        
        // Check token expiration
        const tokenExpiry = localStorage.getItem(`${prefix}TokenExpiry`);
        if (!tokenExpiry || Number(tokenExpiry) < Date.now()) {
          console.log(`AuthGuard: Token expired, redirecting to login`);
          // Clear all auth-related localStorage
          localStorage.removeItem(`${prefix}Auth`);
          localStorage.removeItem(`${prefix}AccessToken`);
          localStorage.removeItem(`${prefix}TokenExpiry`);
          localStorage.removeItem(`${prefix}UserData`);
          const loginPath = type === "super-admin" ? "/super-admin/login" : "/admin/login";
          router.push(loginPath);
          return;
        }
        
        // Check user role
        const userData = localStorage.getItem(`${prefix}UserData`);
        console.log(`AuthGuard: User data = ${userData}`);
        
        if (userData) {
          try {
            const user = JSON.parse(userData);
            if (type === "super-admin" && !user.is_super_admin) {
              console.log(`AuthGuard: User is not a super admin`);
              router.push("/super-admin/login");
              return;
            } else if (type === "admin" && !user.is_admin) {
              console.log(`AuthGuard: User is not an admin`);
              router.push("/admin/login");
              return;
            }
          } catch (error) {
            console.error("Error parsing user data:", error);
            router.push(type === "super-admin" ? "/super-admin/login" : "/admin/login");
            return;
          }
        }
        
        console.log(`AuthGuard: User is authorized`);
        // User is authenticated and has the correct role
        setIsAuthorized(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Auth check error:", error);
        router.push(type === "super-admin" ? "/super-admin/login" : "/admin/login");
      }
    };
    
    checkAuth();
    
    return () => {
      clearTimeout(timeout);
    };
  }, [router, type, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-4 text-sm text-muted-foreground">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Only render children if authorized
  return isAuthorized ? <>{children}</> : null;

}