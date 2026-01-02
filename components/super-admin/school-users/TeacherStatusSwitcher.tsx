"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { updateTeacherAction,  } from "@/actions/super-admin/teacher-actions";
import { successToast, errorToast } from "@/components/hooks/use-toast";

interface TeacherStatusSwitcherProps {
  teacher_id: number;
  name: string;
  mobile_no: string;
  currentStatus: boolean;
  onStatusChange: () => void;
}

export function TeacherStatusSwitcher({ 
    teacher_id, 
  name, 
  mobile_no, 
  currentStatus, 
  onStatusChange 
}: TeacherStatusSwitcherProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(currentStatus);

  const handleStatusChange = async (checked: boolean) => {
    setIsLoading(true);
    try {
      const result = await updateTeacherAction({
        teacher_id: teacher_id,
        is_active: checked,
        name: name,
        mobile_no: mobile_no,
      });

      if (result.success) {
        setStatus(checked);
        successToast(result.message || "Teacher status updated successfully!");
        onStatusChange();
      } else {
        errorToast(result.error || "Failed to update teacher status");
        // Revert the switch state on error
        setStatus(!checked);
      }
    } catch (error: any) {
      errorToast(error.message || "An error occurred");
      // Revert the switch state on error
      setStatus(!checked);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={status}
        onCheckedChange={handleStatusChange}
        disabled={isLoading}
        className="data-[state=checked]:bg-green-500"
      />
      {isLoading && <Loader2 className="h-4 w-4 animate-spin text-gray-500" />}
      <span className={`text-sm font-medium ${status ? 'text-green-600' : 'text-red-600'}`}>
        {status ? 'Active' : 'Inactive'}
      </span>
    </div>
  );
}
