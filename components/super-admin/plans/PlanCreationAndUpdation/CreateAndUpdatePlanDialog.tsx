"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, PencilLine } from "lucide-react";
import CommonButton from "@/components/common/Button";
import CreateAndUpdatePlanForm from "./CreateAndUpdatePlanForm";
import { PlanResponse, FormMode } from "@/types";

interface CreateAndUpdatePlanDialogProps {
  mode: FormMode;
  planData?: PlanResponse;

}

export default function CreateAndUpdatePlanDialog({ mode, planData }: CreateAndUpdatePlanDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };

  const isCreateMode = mode === FormMode.CREATE ? true : false;
 
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isCreateMode ? (
          // Create Mode: Render Button
          <CommonButton className="bg-[#8D8EF5] text-white hover:bg-[#8D8EF5]/90 rounded-lg h-10 px-5">
            <Plus className="h-4 w-4" />
            Create Plans
          </CommonButton>
        ) : (
          // Update Mode: Render Icon Only
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
            <PencilLine className="h-5 w-5 text-[#8D8EF5]" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[70%] max-w-[95%] max-h-[90vh]  rounded-lg overflow-y-auto sm:p-4 py-0">
        <DialogHeader className="p-4">
          <DialogTitle>
            {isCreateMode ? "Create New Plan" : "Update Plan"}
          </DialogTitle>
        </DialogHeader>
        <div className="sm:px-4 px-0">
          <CreateAndUpdatePlanForm
            mode={mode}
            planData={planData}
            onSuccess={handleSuccess}
            className="sm:p-0 px-0 py-0"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
} 