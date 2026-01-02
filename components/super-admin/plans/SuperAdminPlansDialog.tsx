"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlanResponse } from "@/types";
import SuperAdminPlansGrid from "./SuperAdminPlansGrid";
import CommonButton from "@/components/common/Button";
import { Plus, X } from "lucide-react";
import { Label } from "@/components/common/Label";
import { cn } from "@/lib/utils";

export default function SuperAdminPlansDialog({ adminId, schoolId ,className}: { adminId: number, schoolId: number, className?: string }) {
  const [isMonthly, setIsMonthly] = useState(true);
  const [plans, setPlans] = useState<PlanResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/plans');
        const data = await response.json();
        if (data.success) {
          setPlans(data.data.plans);
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // if (loading) {
  //   return (
  //     <Dialog open={open}>
  //       <DialogContent className="max-w-5xl w-[95vw] max-h-[85vh]">
  //         <div className="flex items-center justify-center h-64">
  //           <div className="text-lg">Loading plans...</div>
  //         </div>
  //       </DialogContent>
  //     </Dialog>
  //   );
  // }

  return (
    <Dialog >
      <DialogTrigger asChild>
     <CommonButton className={cn(`bg-[#8D8EF5] text-white hover:bg-[#8D8EF5]/90 rounded-lg  text-sm flex items-center gap-1 cursor-pointer`,className)}>
     <Plus className="h-3 w-3" />
   <Label size="sm" className="text-white cursor-pointer">Upgrade Plan</Label>
     </CommonButton>
      </DialogTrigger>
      <DialogContent className="max-w-5xl w-[95vw] max-h-[85vh] " hideClose={true}>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Choose Plan for Admin</DialogTitle>
        </DialogHeader>

        <div className="w-full flex flex-col gap-4 h-full">
          {/* Billing Cycle Toggle */}
          <div className="w-full h-12 flex justify-center items-center flex-shrink-0">
            <div className="bg-gray-100 rounded-full p-1 inline-flex border border-gray-200">
              <button
                onClick={() => setIsMonthly(true)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isMonthly
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsMonthly(false)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!isMonthly
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                Yearly
              </button>
            </div>
            <CommonButton
              variant="outline"
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 h-8 w-8 p-0 rounded-full bg-white/80 hover:bg-white"
            >
              <X size={16} className="text-gray-500" />
            </CommonButton>
          </div>

          {/* Plans Grid Container */}
          <div className=" overflow-hidden">
            <SuperAdminPlansGrid
              schoolId={schoolId}
              plans={plans}
              is_monthly={isMonthly}
              adminId={adminId}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}