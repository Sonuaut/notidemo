"use client";

import { useState } from "react";
import { PencilLine, Edit, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TeacherForm } from "./TeacherForm";
import { TeacherResponse } from "@/lib/superadmin/teacher-operations";

interface EditTeacherDialogProps {
  teacher: TeacherResponse;
  schoolId: string;
  onTeacherUpdated: () => void;
}

export function EditTeacherDialog({ teacher, schoolId, onTeacherUpdated }: EditTeacherDialogProps) {
  const [open, setOpen] = useState(false);

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 hover:bg-[#8D8EF5]/10 hover:border-[#8D8EF5]/20 border border-transparent transition-all duration-200 rounded-lg"
        >
          <PencilLine className="h-4 w-4 text-[#8D8EF5]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] overflow-y-auto">
        <DialogHeader className="space-y-4  p-0 border-none">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg">
              <Edit className="h-7 w- text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Edit Teacher
              </DialogTitle>
              <DialogDescription className="text-gray-600 mt-1">
                Update teacher information for {teacher.name}
              </DialogDescription>
            </div>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-900 mb-1">Edit Limitations</h4>
                <p className="text-sm text-amber-700">
                  Email address cannot be changed. Only name and phone number can be updated. Password changes require separate process.
                </p>
              </div>
            </div>
          </div>
        </DialogHeader>
        
        <div className="pt-2">
          <TeacherForm
            mode="edit"
            schoolId={schoolId}
            initialData={{
              id: teacher.id.toString(),
              name: teacher.name,
              email: teacher.email,
              mobile_no: teacher.mobile_no,
            }}
            onSuccess={() => {
              setOpen(false);
              onTeacherUpdated();
            }}
            onCancel={handleCancel}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
