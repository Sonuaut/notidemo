"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteTemplateAction } from "@/actions/super-admin/templates";
import { errorToast, successToast } from "@/components/hooks/use-toast";
import CommonButton from "@/components/common/Button";
import { AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogContent, AlertDialogFooter, AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface DeleteTemplateDialogProps {
  templateId: number;
  templateName: string;
}

export default function DeleteTemplateDialog({ 
  templateId, 
  templateName 
}: DeleteTemplateDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    
    try {
      const result = await deleteTemplateAction(templateId);
      if (result.success) {
        successToast("Template deleted successfully!");
        setOpen(false);
      } else {
        errorToast(result.error || "Failed to delete template");
      }
    } catch (error) {
      console.error("Delete template error:", error);
      errorToast("An error occurred while deleting the template");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Template</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this template? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {/* Action Buttons */}
        <AlertDialogFooter className="flex gap-3 border-none">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isLoading}
            className="flex-1 text-gray-700 hover:bg-gray-50 h-10"
          >
            Cancel
          </Button>
          <CommonButton
            type="button"
            loading={isLoading}
            disabled={isLoading}
            onClick={handleDelete}
            className="flex-1 bg-red-600 text-white hover:bg-red-700 border-red-600 h-10"
          >
            Delete Template
          </CommonButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
} 