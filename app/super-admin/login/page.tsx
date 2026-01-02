"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { setCookie } from "@/actions/cookie";
import { ICookiesKey, IRole } from "@/types";
import { successToast } from "@/components/hooks/use-toast";

export default function SuperAdminLogin() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
      
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;
  const isSuperAdminAuth = localStorage.getItem("superAdminAuth") === "true";
  const isAdminAuth = localStorage.getItem("adminAuth") === "true";

  if (isSuperAdminAuth) {
    console.log("Super Admin already logged in, redirecting...");
    router.push("/super-admin/dashboard");
  } else if (isAdminAuth) {
    console.log("Admin already logged in, redirecting...");
    router.push("/admin/dashboard");
  }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new URLSearchParams();
      formData.append("username", email.toLowerCase());
      formData.append("password", password);
      formData.append("grant_type", "");
      formData.append("scope", "");
      formData.append("client_id", "");
      formData.append("client_secret", "");

      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      console.log("Using API URL:", API_URL);

      const response = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (data.status !== 200) {
        throw new Error(data.message || "Login failed");
      }

      // if (!data.data.is_super_admin) {
      //   throw new Error("You don't have super admin privileges");
      // }
  
    //  if(data.data.is_super_admin){
    //   localStorage.setItem("superAdminAccessToken", data.access_token);
    //   localStorage.setItem("superAdminRefreshToken", data.refresh_token);
    //   localStorage.setItem(
    //     "superAdminTokenExpiry",
    //     String(Date.now() + 24 * 60 * 60 * 1000)
    //   );
    //   localStorage.setItem("superAdminAuth", "true");
    //   localStorage.setItem("superAdminUserData", JSON.stringify(data.data));
    //   localStorage.setItem("role",IRole.SUPER_ADMIN)
    //   localStorage.setItem(ICookiesKey.USER,JSON.stringify(data.data));
    //   setCookie(ICookiesKey.AUTHTOKEN,data.access_token)
    //   setCookie(ICookiesKey.ROLE,IRole.SUPER_ADMIN)
    //   setCookie(ICookiesKey.EXPRIY,String(Date.now() + 24 * 60 * 60 * 1000));
    //   setCookie(ICookiesKey.USER,JSON.stringify(data.data));

    //  successToast("Login Successful","#7CBBFF")

    //   console.log("Authentication successful, redirecting to dashboard");
    // }
    localStorage.setItem("superAdminEmailForOTP", email);
    router.push("/super-admin/verify-super-otp");
      router.refresh();
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4399e32b] to-[#04d7c42e] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center mb-8">
        <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
          <img
            src="/logo-icon.png"
            alt="Logo"
            style={{ height: "40px", width: "100px", objectFit: "contain" }}
          />
        </div>
        <h1 className="text-3xl font-bold text-[#4399E3]">
          Super Admin Portal
        </h1>
        <p className="text-gray-600 mt-2">System Management Dashboard</p>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Sign in
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the super admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="superadmin@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/super-admin/forgot-password"
                  className="text-xs text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye className="h-4 w-4" /> // 👁 Show password icon
                  ) : (
                    <EyeOff className="h-4 w-4" /> // 🙈 Hide password icon
                  )}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-6 text-center text-sm text-gray-600"></div>
      <Toaster />
    </div>
  );
}
