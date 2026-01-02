"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
export default function AdminForgotPassword() {
   const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault()
     setLoading(true)
     
     try {
       const API_URL = process.env.NEXT_PUBLIC_API_URL ;
       
       const response = await fetch(`${API_URL}/api/v1/auth/forgot-password`, {
         method: 'POST',
         headers: {
           'accept': 'application/json',
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({ email })
       });
       
       const data = await response.json();
       
       if (data.status !== 200) {
         throw new Error(data.message || "Failed to send OTP");
       }

       setSuccess(true)
       localStorage.setItem("resetEmail", email)
 
       setTimeout(() => {
         router.push("/admin/verify-reset-otp")
       }, 2000)
     } catch (error: any) {
       console.error("Forgot password error:", error);
       toast({
         variant: "destructive",
         title: "Error",
         description: error.message || "Failed to send OTP. Please try again.",
       });
     } finally {
       setLoading(false)
     }
   }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-green-600">Forgot Password</CardTitle>
          <CardDescription>Enter your email to receive an OTP</CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <Alert>
              <AlertDescription>OTP has been sent to your email. Redirecting to verification page...</AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
                {loading ? "Sending OTP..." : "Send OTP"}
              </Button>

              <div className="text-center">
                <Link href="/admin/login" className="text-sm text-green-600 hover:underline">
                  Back to login
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
      <Toaster />
    </div>
  )
}
