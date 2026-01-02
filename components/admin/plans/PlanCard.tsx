"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ICookiesKey, type PlanResponse } from "@/types";
import PlanFeatures from "./PlanFeatures";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSubscriptionAction } from "@/actions/admin/subscription";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import CommonButton from "@/components/common/Button";
import { errorToast } from "@/components/hooks/use-toast";

interface PlanCardProps {
  plan: PlanResponse;
  is_monthly: boolean;
  currentPlanId?: number;
  currentIsYearly?: boolean;
  onChosen?: () => void;
}

function getCycleFeatures(plan: PlanResponse, is_monthly: boolean) {
  return plan.plan_features.find(f => (is_monthly ? f.is_monthly : !f.is_monthly));
}

export default function PlanCard({ plan, is_monthly, currentPlanId, currentIsYearly, onChosen }: PlanCardProps) {
  const router = useRouter();
  const price = is_monthly ? plan.monthly_amount : plan.yearly_amount;
  const features = getCycleFeatures(plan, is_monthly);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [numOfSeats, setNumOfSeats] = useState(1);

  const handleChoose = async () => {
    if (isProcessing) return;
    setErrorMessage(null);
    const isFree = price === 0;
    if (!isFree) {
      console.log("isFree", isFree);
      setIsProcessing(true);
    }
    let keepProcessing = false;
    try {
      const result = await createSubscriptionAction({ 
        plan_id: plan.id, 
        is_yearly: !is_monthly,
        num_of_seat: numOfSeats
      });
      console.log("result in choose", result);
      if (result?.success) {
        const checkoutUrl = result.data?.data?.result?.checkout_url;
        if (isFree) {
          // Free plan chosen: no processing UI, no redirect. Close dialog via callback.
          try { onChosen?.(); } catch {}
           localStorage.setItem(ICookiesKey.SUBSCRIPTION,JSON.stringify(result.data.data.user_subscription));
          return;
        }
        if (checkoutUrl) {
          keepProcessing = true;
          window.location.href = checkoutUrl as string;
          return;
        }
        setErrorMessage("Checkout URL missing in response.");
      } else {
        if( (result as any)?.error){
          const parasedError=JSON.parse((result as any)?.error);
          if(parasedError.status==400){
          // setErrorMessage("You already have an active subscription.");
          errorToast(parasedError.message);
          // onChosen?.()/;
          return;
        }
        else{
          errorToast("Subscription failed.");
          // onChosen?.();
          return;
        }
        }
        const message = (result as any)?.error || (result as any)?.data?.message || "Subscription failed.";
        setErrorMessage(String(message));
        // onChosen?.();
      }
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : "Subscription failed.");
      // onChosen?.();
} finally {
      if (!keepProcessing) setIsProcessing(false);
      router.refresh();

    }
  };

// Check if this is the current plan (both ID and billing cycle must match)
const isCurrentPlan = plan.id === currentPlanId && is_monthly === currentIsYearly;
const buttonText = price>0 ? isCurrentPlan ? "Current Plan" : isProcessing ? "Processing..." : "Choose Plan" : "Continue"

  return (
    <Card className="h-full border border-gray-200 hover:border-indigo-200 hover:shadow-sm transition-colors sm:rounded-xl flex flex-col">
      <CardHeader className="pb-2 text-center">
        <CardTitle className="text-lg font-semibold text-gray-900">{plan.title}</CardTitle>
        <div className="text-sm text-gray-500">Organization</div>
      </CardHeader>
      <CardContent className="space-y-5 flex-1 flex flex-col">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-500">${price}</div>
          <div className="text-xs text-gray-500">per {is_monthly ? "month" : "year"}</div>
        </div>
        {features && (
          <div className="space-y-3 flex-1 overflow-y-auto">
            <div className="text-xs font-medium text-gray-900 uppercase tracking-wide">Included features</div>
            <PlanFeatures features={features} />
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="seats" className="text-sm font-medium text-gray-700">
            Number of Users
          </Label>
          <Input
            id="seats"
            type="number"
            min={1}
            value={numOfSeats}
            onChange={(e) => setNumOfSeats(parseInt(e.target.value) || 1)}
            className="w-full"
          />
        </div>

        <div className="relative mt-auto flex flex-col gap-2">
          <CommonButton loading={isProcessing}  onClick={handleChoose} disabled={isProcessing || isCurrentPlan} className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-60 h-10  self-end">
            {buttonText}
          </CommonButton>
          {isProcessing && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-md">
              <span className="text-sm text-gray-700">Processing...</span>
            </div>
          )}

          {errorMessage && (
            <div className="mt-2 text-sm text-red-600">{errorMessage}</div>
          )}

        </div>
        {price>0 && isProcessing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3 bg-white rounded-md p-6 shadow-lg">
              <LoadingSpinner />
              <div className="text-sm text-gray-700 text-center">
                Please wait... Do not close or go back. Redirecting to secure payment.
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
