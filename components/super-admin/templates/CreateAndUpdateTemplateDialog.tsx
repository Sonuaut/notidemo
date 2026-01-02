"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, PencilLine } from "lucide-react";
import { FormMode } from "@/types";
import { type Template } from "@/lib/superadmin/template";
import CommonButton from "@/components/common/Button";
import CreateAndUpdateTemplateForm from "./CreateAndUpdateTemplateForm";

interface CreateAndUpdateTemplateDialogProps {
  mode: FormMode;
  templateData?: Template;
}

export default function CreateAndUpdateTemplateDialog({ 
  mode, 
  templateData 
}: CreateAndUpdateTemplateDialogProps) {
  const [open, setOpen] = useState(false);

  const isCreateMode = mode === FormMode.CREATE;

  const handleSuccess = (success: boolean) => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isCreateMode ? (
          // Create Mode: Render Button
          <CommonButton className="bg-[#8D8EF5] text-white hover:bg-[#8D8EF5]/90 rounded-lg h-10 px-5">
            <Plus className="h-4 w-4" />
            Create Template
          </CommonButton>
        ) : (
          // Update Mode: Render Icon Only
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
            <PencilLine className="h-5 w-5 text-[#8D8EF5]" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[50%] sm:rounded-xl max-w-[95%] max-h-[90vh] rounded-lg overflow-y-auto sm:p-4 py-0">
        <DialogHeader className="p-4">
          <DialogTitle>
            {isCreateMode ? "Create New Template" : "Update Template"}
          </DialogTitle>
        </DialogHeader>
        <div className="sm:px-4 px-0">
          <CreateAndUpdateTemplateForm
            mode={mode}
            templateData={templateData as Template}
            onSuccess={handleSuccess}
            className="sm:p-1 p-0"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
} 