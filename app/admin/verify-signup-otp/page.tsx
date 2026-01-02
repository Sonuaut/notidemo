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

export default function AdminVerifySignupOTP() {
  const { toast } = useToast()
  const [otp, setOtp] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Get email from localStorage on component mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("signupEmail")
    if (!storedEmail) {
      router.push("/admin/signup")
      return
    }
    setEmail(storedEmail)
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL ;
      
      const response = await fetch(`${API_URL}/api/v1/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          email: email,
          otp: otp 
        })
      });
      
      const data = await response.json();
      
      if (data.status !== 200) {
        throw new Error(data.message || "Invalid OTP. Please try again.");
      }
      
      // Clear signup email from localStorage
      localStorage.removeItem("signupEmail");
      
      toast({
        title: "Account Verified",
        description: "Your account has been created successfully. You can now login.",
      });
      
      router.push("/admin/login");
    } catch (error: any) {
      console.error("OTP verification error:", error);
      setError(error.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const resendOTP = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL ;
      
      const response = await fetch(`${API_URL}/api/v1/auth/resend-otp-forgot-password`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      
      const data = await response.json();
      
      if (data.status !== 200) {
        throw new Error(data.message || "Failed to resend OTP");
      }
      
      toast({
        title: "OTP Resend",
        description: "A new OTP has been sent to your email.",
      });
    } catch (error: any) {
      console.error("Resend OTP error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to resend OTP. Please try again.",
      });
    }
  }

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numeric input
    const numericValue = e.target.value.replace(/\D/g, '');
    
    // Limit to 4 digits
    if (numericValue.length <= 4) {
      setOtp(numericValue);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-green-600">Verify Your Email</CardTitle>
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

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
              {loading ? "Verifying..." : "Verify & Create Account"}
            </Button>

            <div className="text-center">
              <Button variant="link"   type="button"  onClick={resendOTP} className="text-sm">
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


