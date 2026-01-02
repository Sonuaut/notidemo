"use client";
import { Upload, FileSpreadsheet, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BulkDialogContent from "./BulkDialogContent";
import { useEffect, useState } from "react";
import CommonButton from "@/components/common/Button";

interface BulkUploadDialogProps {
  schoolId: number;
  fetchAllUsers: () => void;
}

export function BulkUploadDialog({
  schoolId,
  fetchAllUsers,
}: BulkUploadDialogProps) {
  const [teacherlimit, setTeacherlimit] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [open, setOpen] = useState(false);

  async function fetchUserSubscription() {
    try {
      setIsLoading(true);
      const reponse = await fetch(`/api/plans`);
      const jsonData = await reponse.json();
      if (jsonData.success) {
        try {
          const response = await fetch(`/api/subscription`);
          const jsonResult = await response.json();
          const planId = jsonResult.data?.planId;
          const isYearly = jsonResult.data?.isYearly;
          const FoundCurrentPlan = jsonData.data?.plans.find(
            (plan: any) => plan.id === planId
          );
          const currentPlanFeatures = FoundCurrentPlan?.plan_features.find(
            (feature: any) => feature.is_monthly === !isYearly
          );
          setTeacherlimit(currentPlanFeatures?.user_limit || null);
        } catch (error) {
          console.error("Error fetching teacher limit:", error);
          setTeacherlimit(null);
        } finally {
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error("Error fetching user subscription:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const onTeachersAdded = () => {
    fetchUserSubscription();
  };

  useEffect(() => {
    fetchUserSubscription();
  }, []);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
        >
          <Upload className="h-4 w-4 mr-2" />
          Bulk Upload
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl sm:rounded-2xl max-h-[90vh] overflow-y-auto flex flex-col justify-start">
        <DialogHeader className="border-none sm:p-0">
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Bulk Upload Teachers
          </DialogTitle>
          <DialogDescription>
            Upload an Excel file with teacher information. You can edit the data
            before uploading.
          </DialogDescription>
        </DialogHeader>
        {!isLoading && teacherlimit && teacherlimit > 0 && (
          <div className="space-y-4">
            <BulkDialogContent
              schoolId={schoolId}
              setOpen={setOpen}
              fetchAllUsers={fetchAllUsers}
              onTeachersAdded={onTeachersAdded}
              teacherlimit={teacherlimit}
            />
          </div>
        )}

        {!isLoading && teacherlimit === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="h-10 w-10 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Teacher Limit Reached
            </h3>
            <p className="text-gray-600 text-center mb-6 max-w-md">
              You have reached the maximum number of teachers allowed by your
              current plan. or we are unable to fetch your current plan
              information.
            </p>
          </div>
        )}

        {teacherlimit === null && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="h-10 w-10 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Unable to Load Plan Details
            </h3>
            <p className="text-gray-600 text-center mb-6 max-w-md">
              We couldn't fetch your current plan information. Please try again
              or contact support if the issue persists.
            </p>
            <div className="flex gap-3">
              <CommonButton
                variant="outline"
                loading={isLoading}
                className="bg-blue-500 hover:bg-blue-600 h-10 text-white px-4 hover:text-white"
                onClick={fetchUserSubscription}
              >
                Try Again
              </CommonButton>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
