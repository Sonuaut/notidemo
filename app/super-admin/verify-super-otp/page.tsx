"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { ICookiesKey, IRole } from "@/types"
import { setCookie } from "@/actions/cookie"
import { successToast } from "@/components/hooks/use-toast"

export default function AdminVerifyLoginOTP() {
  const { toast } = useToast()
  const [otp, setOtp] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Get email from localStorage on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("superAdminEmailForOTP")
    if (!storedEmail) {
      router.push("/super-admin/login")
      return
    }
    setEmail(storedEmail)
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL 
      const formBody = new URLSearchParams()
      formBody.append("email", email)
      formBody.append("otp", otp)

      const response = await fetch(`${API_URL}/api/v1/auth/admin-login/verify-otp`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody.toString()
      })

      const data = await response.json()

   if (data.status !== 200) {
        throw new Error(data.message || "Login failed");
      }

      if (!data.data.is_super_admin) {
        throw new Error("You don't have super admin privileges");
      }
  
     if(data.data.is_super_admin){
      localStorage.setItem("superAdminAccessToken", data.access_token);
      localStorage.setItem("superAdminRefreshToken", data.refresh_token);
      localStorage.setItem(
        "superAdminTokenExpiry",
        String(Date.now() + 24 * 60 * 60 * 1000)
      );
      localStorage.setItem("superAdminAuth", "true");
      localStorage.setItem("superAdminUserData", JSON.stringify(data.data));
      localStorage.setItem("role",IRole.SUPER_ADMIN)
      localStorage.setItem(ICookiesKey.USER,JSON.stringify(data.data));
      setCookie(ICookiesKey.AUTHTOKEN,data.access_token)
      setCookie(ICookiesKey.ROLE,IRole.SUPER_ADMIN)
      setCookie(ICookiesKey.EXPRIY,String(Date.now() + 24 * 60 * 60 * 1000));
      setCookie(ICookiesKey.USER,JSON.stringify(data.data));

     successToast("Login Successful","#7CBBFF")

      console.log("Authentication successful, redirecting to dashboard");
    }
      // Clear login email from localStorage
      localStorage.removeItem("superAdminEmailForOTP")

      toast({
        title: "Login Successful",
        description: "Welcome back! Redirecting to your dashboard.",
      })

      // Redirect to dashboard
     
        router.push("/super-admin/dashboard")
    
    } catch (error: any) {
      console.error("Login OTP verification error:", error)
      setError(error.message || "Invalid OTP. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const resendOTP = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL
      const formBody = new URLSearchParams()
      formBody.append("email", email)

      const response = await fetch(`${API_URL}/api/v1/auth/admin-login/request-otp`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody.toString()
      })

      const data = await response.json()

      
      if (data.status !== 200) {
        throw new Error(data.message || "Failed to resend OTP")
      }

      toast({
        title: "OTP Resent",
        description: "A new OTP has been sent to your email.",
      })
    } catch (error: any) {
      console.error("Resend OTP error:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to resend OTP. Please try again.",
      })
    }
  }

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numeric input
    const numericValue = e.target.value.replace(/\D/g, '')
    if (numericValue.length <= 4) {
      setOtp(numericValue)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-blue-600">Verify Login</CardTitle>
          <CardDescription>Enter the 4-digit code sent to your email</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="otp">OTP Code</Label>
              <Input
                id="otp"
                type="text"
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter 4-digit OTP"
                maxLength={4}
                pattern="[0-9]*"
                inputMode="numeric"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
              {loading ? "Verifying..." : "Verify & Login"}
            </Button>

            <div className="text-center">
              <Button variant="link" type="button" onClick={resendOTP} className="text-sm">
                Didn't receive the code? Resend
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  )
}
