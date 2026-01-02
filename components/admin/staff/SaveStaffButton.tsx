"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";
import { errorToast, successToast } from "@/components/hooks/use-toast";
import { getCookie } from "@/actions/cookie";
import { ICookiesKey } from "@/types";

interface Staff {
  id: number;
  teacher_name: string;
  teacher_email: string;
  phone_no: string;
}

interface SaveStaffButtonProps {
  staff: Staff[];
  onSaveSuccess: () => void;
  setOpen?: (open: boolean) => void;
}

export default function SaveStaffButton({
  staff,
  onSaveSuccess,
  setOpen,
}: SaveStaffButtonProps) {
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveStaff = async () => {
    if (staff.length === 0) {
      errorToast("No staff members to save");
      return;
    }

    setIsSaving(true);
    try {
      console.log("🔄 Starting staff upload...", { staffCount: staff.length });
      // Create FormData for multipart/form-data upload
      const formData = new FormData();

      // Convert staff data to CSV format
      const csvHeaders = "teacher name,teacher email,phone no\n";
      const csvRows = staff
        .map(
          (member) =>
            `"${member.teacher_name}","${member.teacher_email}","${member.phone_no}"`
        )
        .join("\n");
      const csvContent = csvHeaders + csvRows;

      // Create a CSV file blob
      const csvBlob = new Blob([csvContent], { type: "text/csv" });
      formData.append("files", csvBlob, "staff.csv");

      const token = await getCookie(ICookiesKey.AUTHTOKEN);
      console.log("🔑 Token retrieved:", token ? "✅ Found" : "❌ Not found");

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "https://api.mynotifly.com";
      const fullUrl = `${apiUrl}/api/v1/staff/upload`;
      console.log("🌐 Making API call to:", fullUrl);

      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "1",
        },
        body: formData,
      });

      console.log("📡 Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ API Error Response:", errorText);
        throw new Error(
          `API responded with status ${response.status}: ${errorText}`
        );
      }

      const result = await response.json();
      console.log("📊 API Response data:", result);

      if (response.ok) {
        successToast(
          `${staff.length} staff members have been uploaded successfully`
        );
        console.log("✅ Staff upload successful, closing dialog");
        setOpen && setOpen(false);
        onSaveSuccess();
      } else {
        throw new Error(
          result.message || `Request failed with status ${response.status}`
        );
      }
    } catch (error) {
      console.error("❌ Error uploading staff:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to upload staff. Please try again.";
      errorToast(errorMessage);
    } finally {
      setIsSaving(false);
      console.log("🏁 Upload process completed");
    }
  };

  return (
    <div className="rounded-xl pr-1.5">
      <Button
        onClick={handleSaveStaff}
        disabled={isSaving || staff.length === 0}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
      >
        {isSaving ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="h-4 w-4 mr-2" />
            Upload {staff.length} Staff Members
          </>
        )}
      </Button>
    </div>
  );
}
