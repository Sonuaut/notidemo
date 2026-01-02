"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UploadStaffExcel from "./UploadStaffExcel";
import StaffTable from "./StaffTable";
import SaveStaffButton from "./SaveStaffButton";

interface Staff {
  id: number;
  teacher_name: string;
  teacher_email: string;
  phone_no: string;
}

interface StaffBulkUploadProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStaffAdded: () => void;
}

export default function StaffBulkUpload({
  open,
  onOpenChange,
  onStaffAdded,
}: StaffBulkUploadProps) {
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [originalCount, setOriginalCount] = useState<number | undefined>(
    undefined
  );

  // For now, set a reasonable limit - you can make this dynamic based on subscription
  const staffLimit = 1000;

  const handleStaffUpdate = (index: number, staff: Staff) => {
    const updatedStaff = [...staffList];
    updatedStaff[index] = staff;
    setStaffList(updatedStaff);
  };

  const handleStaffRemove = (index: number) => {
    const updatedStaff = staffList.filter((_, i) => i !== index);
    setStaffList(updatedStaff);
  };

  const handleSaveSuccess = () => {
    setStaffList([]);
    setOriginalCount(undefined);
    onStaffAdded();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Bulk Upload Staff Members</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-full overflow-hidden">
          <div className="space-y-4 flex-1 overflow-hidden">
            <UploadStaffExcel
              setStaff={setStaffList}
              setOriginalCount={setOriginalCount}
              staffLimit={staffLimit}
            />

            {staffList.length > 0 && (
              <>
                <SaveStaffButton
                  staff={staffList}
                  setOpen={onOpenChange}
                  onSaveSuccess={handleSaveSuccess}
                />
                <StaffTable
                  staff={staffList}
                  onStaffUpdate={handleStaffUpdate}
                  onStaffRemove={handleStaffRemove}
                  staffLimit={staffLimit}
                  originalCount={originalCount}
                />
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
