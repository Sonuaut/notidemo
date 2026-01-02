"use client";

import { useState, ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormMode, RechargeResponse } from "@/types";
import CreateAndUpdateRechargeForm from "./CreateAndUpdateRechargeForm";

interface CreateAndUpdateRechargeDialogProps {
  mode: FormMode;
  rechargeData?: RechargeResponse;
  children: ReactNode;
}

export default function CreateAndUpdateRechargeDialog({ 
  mode, 
  rechargeData,
  children 
}: CreateAndUpdateRechargeDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
  };

  const isCreateMode = mode === FormMode.CREATE;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader className="border-b border-gray-200 pb-4">
          <DialogTitle>
            {isCreateMode ? "Create New Recharge" : "Update Recharge"}
          </DialogTitle>
        </DialogHeader>
        <div className="">
          <CreateAndUpdateRechargeForm
            mode={mode}
            rechargeData={rechargeData}
            onSuccess={handleSuccess} 
          />
        </div>
      </DialogContent>
    </Dialog>
  );
} 