"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2 } from "lucide-react";
import { getCookie } from "@/actions/cookie";
import { ICookiesKey } from "@/types";
import { errorToast, successToast } from "@/components/hooks/use-toast";

interface CancelSubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCancelSuccess?: () => void;
}

export default function CancelSubscriptionDialog({
  open,
  onOpenChange,
  onCancelSuccess,
}: CancelSubscriptionDialogProps) {
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancelSubscription = async () => {
    try {
      setIsCancelling(true);

      const token = await getCookie(ICookiesKey.AUTHTOKEN);
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "https://api.mynotifly.com";

      // Prepare form data
      const formData = new URLSearchParams();
      formData.append("is_auto_pay", "false");
      formData.append("teacher_id", "");
      formData.append("Admin_user_id", "");

      const response = await fetch(
        `${apiUrl}/api/v1/subscription/cancel_subscription`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
            "ngrok-skip-browser-warning": "1",
          },
          body: formData.toString(),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `API responded with status ${response.status}: ${errorText}`
        );
      }

      const result = await response.json();
      console.log("Cancel subscription response:", result);

      successToast("Subscription cancelled successfully");
      onOpenChange(false);
      onCancelSuccess?.();
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to cancel subscription. Please try again.";
      errorToast(errorMessage);
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold text-gray-900">
                Cancel Subscription
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-600 mt-1">
                Are you sure you want to cancel your subscription?
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-red-800 mb-2">
              What happens when you cancel:
            </h4>
            <ul className="text-sm text-red-700 space-y-1">
              <li>
                • Your subscription will remain active until the current billing
                period ends
              </li>
              <li>
                • You'll lose access to premium features after the period
                expires
              </li>
              <li>• Auto-renewal will be disabled</li>
              <li>• You can reactivate your subscription anytime</li>
            </ul>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isCancelling}
            className="flex-1"
          >
            Keep Subscription
          </Button>
          <Button
            variant="destructive"
            onClick={handleCancelSubscription}
            disabled={isCancelling}
            className="flex-1"
          >
            {isCancelling ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Cancelling...
              </>
            ) : (
              "Yes, Cancel Subscription"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
