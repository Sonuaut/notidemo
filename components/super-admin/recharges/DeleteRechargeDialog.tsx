"use client";

import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteRechargeAction } from "@/actions/super-admin/recharge";
import { errorToast, successToast } from "@/components/hooks/use-toast";
import { RechargeResponse } from "@/types";

interface DeleteRechargeDialogProps {
  recharge: RechargeResponse;
}

export default function DeleteRechargeDialog({ recharge }: DeleteRechargeDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const result = await deleteRechargeAction(recharge.id);
      
      if (result.success) {
        successToast("Recharge deleted successfully!");
      } else {
        errorToast(result.error || "Failed to delete recharge");
      }
    } catch (error) {
      errorToast("An error occurred while deleting the recharge");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
          <Trash2 className="h-5 w-5 text-red-500" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Recharge</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the recharge "{recharge.title}"? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-600"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
} 