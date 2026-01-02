"use client";
import { useState } from "react";
import { Users } from "lucide-react";
import CommonButton from "@/components/common/Button";
import { errorToast, successToast } from "@/components/hooks/use-toast";
import { getCookie } from "@/actions/cookie";
import { ICookiesKey } from "@/types";

interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface SaveTeachersButtonProps {
  teachers: Teacher[];
  onSaveSuccess: () => void;
  schoolId: number;
  setOpen?: (open: boolean) => void;
  fetchAllUsers: () => void;
}

export default function SaveTeachersButton({
  teachers,
  onSaveSuccess,
  fetchAllUsers,
  setOpen,
  schoolId,
}: SaveTeachersButtonProps) {
  const [isSaving, setIsSaving] = useState(false);
  console.log(schoolId, "schoolId in save button");

  const handleSaveTeachers = async () => {
    setIsSaving(true);
    try {
      console.log("🔄 Starting teachers upload...", {
        teacherCount: teachers.length,
        schoolId,
      });

      const token = await getCookie(ICookiesKey.AUTHTOKEN);
      console.log("🔑 Token retrieved:", token ? "✅ Found" : "❌ Not found");

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const formattedTeachers = teachers.map((teacher) => ({
        school_id: schoolId,
        teacher_name: teacher.name,
        teacher_email: teacher.email,
        teacher_mobile_no: teacher.phone,
      }));

      const payload = {
        teachers: formattedTeachers,
      };
      console.log("📦 Payload for bulk teachers:", payload);

      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "https://api.mynotifly.com";
      const fullUrl = `${apiUrl}/api/v1/admin/bulk-add-teachers`;
      console.log("🌐 Making API call to:", fullUrl);

      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "1",
        },
        body: JSON.stringify(payload),
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

      successToast(`${teachers.length} teachers have been saved successfully`);
      console.log("✅ Teachers upload successful, closing dialog");

      setOpen && setOpen(false);
      onSaveSuccess();
      fetchAllUsers();
    } catch (error) {
      console.error("❌ Error saving teachers:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to save teachers. Please try again.";
      errorToast(errorMessage);
    } finally {
      setIsSaving(false);
      console.log("🏁 Upload process completed");
    }
  };

  return (
    <div className=" rounded-xl pr-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl">
            <Users className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="  font-medium text-gray-900 ">
              Ready to Add Teachers
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium ">{teachers.length} teachers</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <CommonButton
            onClick={handleSaveTeachers}
            loading={isSaving}
            disabled={isSaving || teachers.length === 0}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-3 rounded-xl h-11 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Save All {`(${teachers.length})`} Teachers
          </CommonButton>
        </div>
      </div>
    </div>
  );
}
