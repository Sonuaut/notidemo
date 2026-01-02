"use client";

import { useState } from "react";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, X } from "lucide-react";

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

interface SuperAdminProfileFormProps {
  profile: SuperAdminProfile;
  onProfileUpdate: (formData: FormData) => Promise<void>;
}

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  mobile_no: z.string().min(1, "Mobile number is required"),
  about: z.string().optional(),
});

export function SuperAdminProfileForm({ 
  profile, 
  onProfileUpdate 
}: SuperAdminProfileFormProps) {
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name || "",
    mobile_no: profile.mobile_no || "",
    about: profile.about || "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearSelectedImage = () => {
    setProfileImage(null);
    setImagePreview(null);
    const fileInput = document.getElementById("profile-image") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const validateForm = () => {
    try {
      profileSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as string;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setUpdating(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("mobile_no", formData.mobile_no);
      data.append("about", formData.about);
      if (profileImage) {
        data.append("file", profileImage);
      }
      await onProfileUpdate(data);
      
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center min-h-[calc(100vh-8rem)] p-3">
      <Card className="w-full max-w-xl shadow-none border rounded-3xl bg-gradient-to-br from-white via-zinc-50 to-zinc-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 p-0">
        <CardHeader className="pb-2 border-b border-zinc-100 dark:border-zinc-800 flex flex-col items-center">
          <div className="relative w-28 h-28 mb-2">
            <img
              src={
                imagePreview ||
                profile?.profile_img_url ||
                "/placeholder-user.jpg"
              }
              alt="Profile"
              className="w-28 h-28 object-cover rounded-full border border-primary/30 shadow-lg bg-zinc-200 dark:bg-zinc-800"
            />
           
          </div>
          <CardTitle className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 text-center">Edit Profile</CardTitle>
          <CardDescription className="text-zinc-500 dark:text-zinc-400 text-center mb-2">
            Update your profile information
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5">
          <form onSubmit={handleSubmit} className="space-y-3 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
              <Label htmlFor="name" className="text-zinc-700 dark:text-zinc-200">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`rounded-xl border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary/30 focus:border-primary transition text-lg px-4 py-2 ${errors.name ? "border-red-500" : ""}`}
                required
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile_no" className="text-zinc-700 dark:text-zinc-200">Mobile Number</Label>
              <Input
                id="mobile_no"
                value={formData.mobile_no}
                onChange={(e) => handleInputChange("mobile_no", e.target.value)}
                className={`rounded-xl border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary/30 focus:border-primary transition text-lg px-4 py-2 ${errors.mobile_no ? "border-red-500" : ""}`}
                placeholder="+1234567890"
                required
              />
              {errors.mobile_no && (
                <p className="text-red-500 text-xs mt-1">{errors.mobile_no}</p>
              )}
            </div>
          </div>

            <div className="space-y-2">
              <Label htmlFor="about" className="text-zinc-700 dark:text-zinc-200">About</Label>
              <Textarea
                id="about"
                value={formData.about}
                onChange={(e) => handleInputChange("about", e.target.value)}
                placeholder="Tell us about yourself..."
                rows={3}
                className="rounded-xl border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary/30 focus:border-primary transition text-base px-4 py-2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profile-image" className="text-zinc-700 dark:text-zinc-200">Profile Image</Label>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="cursor-pointer rounded-xl border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-primary/30 focus:border-primary transition px-3 py-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload a new profile image (optional)
                  </p>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-3 rounded-2xl bg-primary text-white  shadow-lg hover:bg-primary/90 transition disabled:opacity-60 disabled:cursor-not-allowed text-lg"
              disabled={updating}
            >
              {updating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Profile"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
