"use client";

import { useEffect, useState } from "react";
import PlansGrid from "./PlansGrid";
import { ICookiesKey, PlanResponse } from "@/types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CommonButton from "@/components/common/Button";
import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function BillingCycleToggle({
  dialogMode,
}: {
  dialogMode: boolean;
}) {
  const [isMonthly, setIsMonthly] = useState(true);
  const [plans, setPlans] = useState<PlanResponse[]>([]);
  const [open, setOpen] = useState(dialogMode);
  const [currentPlanId, setCurrentPlanId] = useState<number | undefined>(
    undefined
  );
  const [currentIsYearly, setCurrentIsYearly] = useState<boolean | undefined>(
    undefined
  );
 
  useEffect(() => {
    const fetchPlans = async () => {
      const response = await fetch(`/api/plans?is_monthly=${isMonthly}`);
      const data = await response.json();
      setPlans(data.data.plans);
    };
    fetchPlans();
  }, []);

  useEffect(() => {
    const fetchSubscription = async () => {
      const response = await fetch(`/api/subscription`);
      const data = await response.json();
      console.log("fetchsubscriptions :",data)
      localStorage.setItem(
        ICookiesKey.SUBSCRIPTION,
        JSON.stringify(data.data.result)
      );
      setCurrentPlanId(data.data.planId);
      setCurrentIsYearly(data.data.isYearly); // Get the billing cycle from subscription
      if (data.data?.price == 0) {
        setOpen(true);
      }
    };

    if (dialogMode) {
      fetchSubscription();
    }
  }, []);

  function PlansSelection({
    onChosen,
    currentPlanId,
    currentIsYearly,
  }: {
    onChosen: () => void;
    currentPlanId?: number;
    currentIsYearly?: boolean;
  }) {
    const pathname = usePathname();
    const router = useRouter();
    function handleClose() {
      router.push(pathname);  
      // setOpen(false);
     
    }
    return (
      <div className="w-full flex flex-col gap-4">
       <div className="w-full h-12 flex justify-center items-center">
          <div className="bg-gray-100 rounded-full p-1 inline-flex border border-gray-200 ">
            <button
              onClick={() => setIsMonthly(true)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isMonthly
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsMonthly(false)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !isMonthly
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Yearly
            </button>
          </div>
          <CommonButton
          onClick={handleClose}
          variant="outline"
          className="absolute top-3 right-3 h-8 w-8 p-0 rounded-full bg-white/80 hover:bg-white"
        >
          <X size={16} className="text-gray-500" />
        </CommonButton>
        </div>

        <PlansGrid
          plans={plans}
          is_monthly={isMonthly}
          currentPlanId={currentPlanId}
          currentIsYearly={currentIsYearly}
          onChosen={onChosen}
        />
      </div>
    );
  }

  function handleChosen() {
    setOpen(!open);
  }

  return dialogMode ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        hideClose={dialogMode}
        onPointerDownOutside={(e) => {
          if (dialogMode) e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          if (dialogMode) e.preventDefault();
        }}
        className="max-w-5xl w-[95vw] max-h-[85vh] "
      >
        <CommonButton
          onClick={() => setOpen(false)}
          variant="outline"
          className="absolute top-3 right-3 h-8 w-8 p-0 rounded-full bg-white/80 hover:bg-white"
        >
          <X size={16} className="text-gray-500" />
        </CommonButton>
        <PlansSelection onChosen={handleChosen} currentPlanId={currentPlanId} currentIsYearly={currentIsYearly} />
      </DialogContent>
    </Dialog>
  ) : (
    <PlansSelection onChosen={handleChosen} currentPlanId={currentPlanId} currentIsYearly={currentIsYearly} />
  );
}
