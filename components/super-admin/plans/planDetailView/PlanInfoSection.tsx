"use client";

import { Badge } from "@/components/ui/badge";

interface PlanInfoSectionProps {
  createdAt: string;
  updatedAt: string;
  stripeIdMonthly?: string;
  stripeIdYearly?: string;
}

export default function PlanInfoSection({ 
  createdAt, 
  updatedAt, 
  stripeIdMonthly, 
  stripeIdYearly 
}: PlanInfoSectionProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      {/* Plan Information */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-[#8D8EF5] rounded-full"></div>
          <h3 className="text-lg font-semibold text-gray-900">Plan Information</h3>
        </div>
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">Created</div>
              <div className="text-sm font-semibold text-gray-900">{formatDate(createdAt)}</div>
            </div>
            <div className="space-y-2">
              <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">Last Updated</div>
              <div className="text-sm font-semibold text-gray-900">{formatDate(updatedAt)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stripe Information */}
      {(stripeIdMonthly || stripeIdYearly) && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 bg-[#8D8EF5] rounded-full"></div>
            <h3 className="text-lg font-semibold text-gray-900">Stripe Configuration</h3>
          </div>
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <div className="space-y-4">
              {stripeIdMonthly && (
                <div className="space-y-2">
                  <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">Monthly Product ID</div>
                  <div className="text-sm font-mono text-gray-700 bg-white px-3 py-2 rounded-lg border break-all">
                    {stripeIdMonthly}
                  </div>
                </div>
              )}
              {stripeIdYearly && (
                <div className="space-y-2">
                  <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">Yearly Product ID</div>
                  <div className="text-sm font-mono text-gray-700 bg-white px-3 py-2 rounded-lg border break-all">
                    {stripeIdYearly}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 