"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, AlertTriangle } from "lucide-react";
import CommonButton from "@/components/common/Button";
import { deletePlanAction } from "@/actions/super-admin/plans";
import { errorToast, successToast } from "@/components/hooks/use-toast";
import { PlanResponse } from "@/types";

interface DeletePlanDialogProps {
  plan: PlanResponse;
}

export default function DeletePlanDialog({ plan }: DeletePlanDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleDelete = async () => {
    setLoading(true);
    try {
      const result = await deletePlanAction(plan.id);
      
      if (result.success) {
        successToast("Plan deleted successfully!");
        setOpen(false);
      } else {
        errorToast(result.error || "Failed to delete plan");
        setLoading(false);
      }
    } catch (error) {
      console.log("error :", error);
      errorToast("An error occurred while deleting the plan");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
        >
          <Trash2 className="h-4 w-4 text-red-500 hover:text-red-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center gap-3 text-xl font-semibold text-gray-900">
            <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            Delete Plan
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Warning Message */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-red-800">
                {/* <p className="font-medium mb-1">This action cannot be undone</p> */}
                <p className="text-red-700">
                  All data associated with this plan will be permanently deleted from the system.
                </p>
              </div>
            </div>
          </div>

       
          {/* Confirmation Text */}
          <div className="text-center">
            <p className="text-gray-600">
              Are you absolutely sure you want to proceed with this deletion?
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <CommonButton
              type="button"
              variant="outline"
              onClick={() => {
                setOpen(false);
                setLoading(false);
              }}
              className="flex-1 h-11 rounded-lg border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200"
            >
              Cancel
            </CommonButton>
            <CommonButton
              type="button"
              loading={loading}
              onClick={handleDelete}
              className="flex-1 h-11 rounded-lg bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 transition-colors duration-200 shadow-sm"
            >
              {loading ? "Deleting..." : "Delete Plan"}
            </CommonButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 