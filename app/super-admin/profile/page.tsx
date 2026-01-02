"use client";
import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/layout/admin-layout";
import { SuperAdminProfileForm } from "@/components/super-admin/profile/SuperAdminProfileForm";
import {  uploadProfile } from "@/actions/super-admin/profile";
import { errorToast, successToast } from "@/components/hooks/use-toast";
import { useRouter } from "next/navigation";
interface SuperAdminProfile {
  id: number;
  email: string;
  role: string;
  name: string;
  mobile_no: string;
  about: string;
  profile_img_url: string | null;
  is_super_admin: boolean;
  is_admin: boolean;
  is_active: boolean;
  otp_verified: boolean;
  school_id: number | null;
  created_at: string;
  updated_at: string;
}

export default function SuperAdminProfilePage() {
const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<SuperAdminProfile | null>(null);

  useEffect(() => {
    fetchInitialSuperAdminProfile();
  }, []);
  const fetchInitialSuperAdminProfile = async () => {
    
    try {
      const result = await fetch("/api/profile");
      const response=await result.json()
      console.log("result",response)
      if (response.status==200) {
        setProfile(response.data.result);
        setLoading(false)
      } else {

      }
    } catch (error: any) {
      console.error("Error fetching profile:", error);
      
    } finally {

    }
  };

  
  const handleProfileUpdate = async (formData: FormData) => {
    try {
      const result = await uploadProfile(formData);
      if (result.status) {
        await fetchInitialSuperAdminProfile();
        
        successToast("Profile updated successfully!")
      } else {
        errorToast("Failed to update profile")
      }
      router.refresh();
    } catch (error: any) {
      console.error("Error updating profile:", error);
      errorToast("Failed to update profile")
    }
  };

  if (loading) {
    return (
      <AdminLayout type="super-admin">
        <div className="space-y-6">
        
          <div className="flex justify-center items-center min-h-[16rem]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!profile) {
    return (
      <AdminLayout type="super-admin">
        <div className="space-y-6">
         
          <div className="flex justify-center items-center h-32">
            <p className="text-muted-foreground">
              Failed to load profile information
            </p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout type="super-admin" className="bg-white md:p-0 w-full h-full flex items-center justify-center">
          <SuperAdminProfileForm 
            profile={profile} 
            onProfileUpdate={handleProfileUpdate}
          />
        
    </AdminLayout>
  );
} 