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
import { Eye, EyeOff, UserCheck } from "lucide-react";
import { setCookie } from "@/actions/cookie";
import { ICookiesKey, IRole } from "@/types";
import { errorToast, successToast } from "@/components/hooks/use-toast";

export default function AdminLogin() {
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
      localStorage.setItem("loginEmail", email);
      if (data.status !== 200) {
        throw new Error(data.message || "Login failed");
      }

      // if (!data.data.is_admin) {
      //   throw new Error("You don't have admin privileges");
      // }
   
      // console.log("data login for admin only ",data)
    //   if(data.data.is_admin){
    //   localStorage.setItem("adminAccessToken", data.access_token);
    //   localStorage.setItem("adminRefreshToken", data.refresh_token);
    //   localStorage.setItem(
    //     "adminTokenExpiry",
    //     String(Date.now() + 24 * 60 * 60 * 1000)
    //   );
    //   localStorage.setItem("adminAuth", "true");
    //   localStorage.setItem("adminUserData", JSON.stringify(data.data));
    //   localStorage.setItem("role",IRole.ADMIN)
    //   localStorage.setItem(ICookiesKey.USER,JSON.stringify(data.data));
    //   localStorage.setItem(ICookiesKey.PLAN,JSON.stringify(data.data.plan));
    //   localStorage.setItem(ICookiesKey.SUBSCRIPTION,JSON.stringify(data.data.user_subscription));
    //   setCookie(ICookiesKey.AUTHTOKEN,data.access_token)
    //   setCookie(ICookiesKey.ROLE,IRole.ADMIN)
    //   setCookie(ICookiesKey.EXPRIY,String(Date.now() + 24 * 60 * 60 * 1000));
    //   setCookie(ICookiesKey.USER,JSON.stringify(data.data));
    //   setCookie(ICookiesKey.PLAN,JSON.stringify(data.data.plan));
    //   setCookie(ICookiesKey.SUBSCRIPTION,JSON.stringify(data.data.user_subscription));
    //   successToast("Login Successful","#7CBBFF")
    // }
    router.push("/admin/verify-login-otp");
      console.log("Authentication successful, redirecting to dashboard");
      
      router.refresh();
    } catch (err: any) {
      console.error("Login error:", err);
      errorToast(err.message || "Invalid email or password");
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#4398e318] to-[#04d7c517] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center mb-8">
        <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
          <img
            src="/logo-icon.png"
            alt="Logo"
            style={{ height: "40px", width: "100px", objectFit: "contain" }}
          />
        </div>
        <h1 className="text-3xl font-bold text-[#4399E3]">Admin Portal</h1>
        <p className="text-gray-600 mt-2">User & Template Management</p>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Sign in
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the admin dashboard
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
                placeholder="admin@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/admin/forgot-password"
                  className="text-xs text-[#4399E3] hover:underline"
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
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#4399E3]"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="text-center">
              <span className="text-sm text-gray-500">
                Don't have an account?{" "}
              </span>
              <Link
                href="/admin/signup"
                className="text-sm text-[#4399E3] hover:underline"
              >
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="mt-6 text-center text-sm text-gray-600"></div>
    </div>
  );
}
