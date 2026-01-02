"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RechargeResponse } from "@/types";
import SuperAdminRechargeGrid from "./SuperAdminRechargeGrid";
import CommonButton from "@/components/common/Button";
import { BatteryCharging, Plus, X } from "lucide-react";
import { Label } from "@/components/common/Label";
import { RechargeType } from "@/lib/superadmin/recharge";
import { cn } from "@/lib/utils";

export default function SuperAdminRechargeDialog({ 
  adminUserId,
  className
}: {
  adminUserId: number,
  className?: string
}) {
  const [recharges, setRecharges] = useState<RechargeResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<RechargeType>(RechargeType.EMAIL);

  useEffect(() => {
    const fetchRecharges = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/recharge?limit=50&offset=0&type=${selectedType}`);
        const data = await response.json();
        if (data.status) {
          setRecharges(data.data || []);
        }
      } catch (error) {
        console.error('Error fetching recharge plans:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecharges();
  }, [selectedType]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <CommonButton className={  cn(`bg-gradient-to-r from-[#8D8EF5] to-[#6366F1] text-white hover:from-[#8D8EF5]/90 hover:to-[#6366F1]/90 rounded-lg text-sm flex items-center gap-2 cursor-pointer shadow-md hover:shadow-lg transition-all duration-200`,className)}>
          <BatteryCharging className="h-4 w-4" />
          <Label size="sm" className="text-white cursor-pointer font-medium">Recharge Credits</Label>
        </CommonButton>
      </DialogTrigger>
      <DialogContent className="max-w-5xl w-[95vw] max-h-[85vh]" >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Recharge Credits</DialogTitle>
        </DialogHeader>

        <div className="w-full flex flex-col gap-4 h-full">
          {/* Type Toggle and Close Button */}
          <div className="w-full h-12 flex justify-center items-center flex-shrink-0 relative">
            <div className="bg-gray-100 rounded-full p-1 inline-flex border border-gray-200">
              <button
                onClick={() => setSelectedType(RechargeType.EMAIL)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedType === RechargeType.EMAIL
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Email
              </button>
              <button
                onClick={() => setSelectedType(RechargeType.SMS)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedType === RechargeType.SMS
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                SMS
              </button>
              <button
                onClick={() => setSelectedType(RechargeType.EMAIL_AND_SMS)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedType === RechargeType.EMAIL_AND_SMS
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Email & SMS
              </button>
            </div>
          </div>
          {/* Recharge Grid Container */}
          <div className="overflow-hidden">
            <SuperAdminRechargeGrid
              // schoolId={schoolId as number}
              recharges={recharges}
              adminUserId={adminUserId as number}

              loading={loading}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
