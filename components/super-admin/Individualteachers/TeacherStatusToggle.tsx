"use client";
import { Switch } from "@/components/ui/switch";
import { updateTeacherStatus } from "@/actions/super-admin/teacher";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/common/Label";
import { errorToast, successToast } from "@/components/hooks/use-toast";

interface TeacherStatusToggleProps {
  teacherId: string;
  initialStatus: boolean;
  school_id: number;
  name: string;
  mobile_no: string;
}

export default function TeacherStatusToggle({ 
  teacherId, 
  initialStatus,
  school_id,
  name,
  mobile_no
}: TeacherStatusToggleProps) {
  const [isActive, setIsActive] = useState(initialStatus);

  const handleStatusChange = async (checked: boolean) => {
    try {
      const result = await updateTeacherStatus({
        userId: teacherId,
        is_active: checked,
        school_id,
        name,
        mobile_no
      });

      if (result.status) {
        setIsActive(checked);
        successToast(`Teacher is now ${checked ? 'active' : 'inactive'}`);
      }
    } catch (error) {
      console.error('Error updating teacher status:', error);
      errorToast("Failed to update teacher status");
      setIsActive(!checked);
    } finally {
     
    }
  };

  return (
   <div className=" flex items-center gap-2">
     <Switch
      checked={isActive}
      onCheckedChange={handleStatusChange}
     
    /><Label className={` ${isActive ? 'text-green-500' : 'text-red-500'}`}>{isActive ? "Active" : "Inactive"}</Label>
   </div>
  );
} 