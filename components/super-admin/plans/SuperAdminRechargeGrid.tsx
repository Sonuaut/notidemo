
import type { RechargeResponse } from "@/types";
import SuperAdminRechargeCard from "./SuperAdminRechargeCard";  
import { Loader } from "lucide-react";

interface SuperAdminRechargeGridProps {
  recharges: RechargeResponse[];
  adminUserId: number;
  loading: boolean;
}

export default function SuperAdminRechargeGrid({ 
  recharges, 
  adminUserId,
  loading
}: SuperAdminRechargeGridProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-2">
          <Loader className="animate-spin w-8 h-8 text-gray-600" />
          <div className="text-lg text-gray-600">Loading recharge plans...</div>
        </div>
      </div>
    );
  }

  if (recharges.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-500">No recharge plans found.</div>
      </div>
    );
  }

  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recharges.map(recharge => (
        <SuperAdminRechargeCard 
          key={recharge.id} 
          recharge={recharge} 
          adminUserId={adminUserId as number}
        />
      ))}
    </div>
  );
}
