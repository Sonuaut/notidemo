 

import { useState } from "react";
import type { RechargeResponse } from "@/types";
import CommonButton from "@/components/common/Button";
import { Badge } from "@/components/ui/badge";
import { createSuperAdminRechargeSubscriptionAction } from "@/actions/super-admin/recharge-subscription";
import { useRouter } from "next/navigation";

interface SuperAdminRechargeCardProps {
  recharge: RechargeResponse;
  adminUserId: number;
}

export default function SuperAdminRechargeCard({ 
  recharge, 
  adminUserId,   
}: SuperAdminRechargeCardProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const badgeCls = (type: string) => {
    switch (type) {
      case "SMS":
        return "bg-orange-100 text-orange-700";
      case "Email":
        return "bg-blue-100 text-blue-700";
      case "EmailAndSMS":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getCreditsText = (type: string) => {
    switch (type) {
      case "Email":
        return `${recharge.email_limit} Email Credits`;
      case "SMS":
        return `${recharge.sms_limit} SMS Credits`;
      case "EmailAndSMS":
        return `${recharge.email_limit} Email + ${recharge.sms_limit} SMS Credits`;
      default:
        return "Credits";
    }
  };

  const handleRecharge = async () => {
    try {
      setLoading(true);
      
      const payload = {
        recharge_plan_id: recharge.id,
        is_mobile: false,
        admin_user_id: adminUserId,
      };

      const result = await createSuperAdminRechargeSubscriptionAction(payload);
      if (result.success) {
        const checkoutUrl = result.data?.data?.checkout_url;
        if (recharge.recharge_price > 0 && checkoutUrl) {
          window.location.href = checkoutUrl;
        } else {
          router.push('/super-admin/recharge/success');
        }
      } else {
        console.error('Recharge failed:', result.error);
        const errorMessage = encodeURIComponent(result.error || 'Unknown error occurred');
        router.push(`/super-admin/recharge/failure?error=${errorMessage}`);
      }
    } catch (error) {
      console.error('Error processing recharge:', error);
      router.push('/super-admin/recharge/failure');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:border-[#8D8EF5]/30">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900 capitalize">
              {recharge.title}
            </h3>
            <Badge className={`${badgeCls(recharge.type)} text-xs font-medium px-2 py-1`}>
              {recharge.type.replace("_", " ")}
            </Badge>
          </div>
        </div>

        {/* Description */}
        <div className="flex-1 mb-4">
          <p className="text-sm text-gray-600 mb-2">
            {getCreditsText(recharge.type)}
          </p>
          
          {recharge.type === "Email" && recharge.email_detail && (
            <p className="text-xs text-gray-500">{recharge.email_detail}</p>
          )}
          
          {recharge.type === "SMS" && recharge.sms_detail && (
            <p className="text-xs text-gray-500">{recharge.sms_detail}</p>
          )}
          
          {recharge.type === "EmailAndSMS" && (
            <div className="space-y-1">
              {recharge.email_detail && (
                <p className="text-xs text-gray-500">Email: {recharge.email_detail}</p>
              )}
              {recharge.sms_detail && (
                <p className="text-xs text-gray-500">SMS: {recharge.sms_detail}</p>
              )}
            </div>
          )}
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-[#8D8EF5]">
            ${recharge.recharge_price}
          </div>
          <CommonButton
            loading={loading}
            onClick={handleRecharge}
            className="bg-[#8D8EF5] text-white hover:bg-[#8D8EF5]/90 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200"
          >
            {loading ? "Processing..." : "Recharge"}
          </CommonButton>
        </div>
      </div>
    </div>
  );
}
