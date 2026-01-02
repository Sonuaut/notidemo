"use client";
import { useState } from "react";
import { Plus, UserPlus, Mail } from "lucide-react";
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

interface AddTeacherDialogProps {
  schoolId: string;
  onTeacherAdded: () => void;
}

export function AddTeacherDialog({ schoolId, onTeacherAdded }: AddTeacherDialogProps) {
  const [open, setOpen] = useState(false);

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#8D8EF5] hover:bg-[#7B7CE8] text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-2 rounded-lg font-medium">
          <Plus className="h-4 w-4 mr-2" />
          Add Teacher
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4 p-0 border-none">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8D8EF5] to-[#7B7CE8] flex items-center justify-center shadow-lg">
              <UserPlus className="h-7 w-7 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Add New Teacher
              </DialogTitle>
              <DialogDescription className="text-gray-600 mt-1">
                Create a new teacher account for this school
              </DialogDescription>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Teacher Account Setup</h4>
                <p className="text-sm text-blue-700">
                  The teacher will receive login credentials via email and can access the school management system immediately through mobile app.
                </p>
              </div>
            </div>
          </div>
        </DialogHeader>
        
        <div className="pt-2">
          <TeacherForm
            mode="create"
            schoolId={schoolId}
            onSuccess={() => {
              setOpen(false);
              onTeacherAdded();
            }}
            onCancel={handleCancel}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
