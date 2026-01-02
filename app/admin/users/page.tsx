"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import UserManagement from "@/components/admin/user-management"
import { AdminLayout } from "@/components/layout/admin-layout"
import { Loader2 } from "lucide-react"

// Create a client component that uses useSearchParams
function UsersContent() {
  const searchParams = useSearchParams()
  const [layoutType, setLayoutType] = useState<"admin" | "super-admin">("admin")
  
  useEffect(() => {
    // Get school ID from URL parameters
    const schoolId = searchParams.get('schoolId')
    
    if (schoolId) {
      // If we have a school ID, we're likely coming from super admin
      setLayoutType("super-admin")
    }
  }, [searchParams])
  
  return (
    <AdminLayout type={layoutType}>
      <div className="space-y-6">
        <UserManagement />
      </div>
    </AdminLayout>
  )
}

// Create a loading fallback
export function LoadingFallback() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  )
}

// Main page component with Suspense boundary
export default function UsersPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <UsersContent />
    </Suspense>
  )
}
