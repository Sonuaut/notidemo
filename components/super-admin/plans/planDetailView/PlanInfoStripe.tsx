"use client";

interface PlanInfoStripeProps {
  createdAt: string;
  updatedAt: string;
  stripeIdMonthly?: string;
  stripeIdYearly?: string;
}

export default function PlanInfoStripe({ 
  createdAt, 
  updatedAt, 
  stripeIdMonthly, 
  stripeIdYearly 
}: PlanInfoStripeProps) {
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
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Plan Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 border border-gray-200 rounded-lg">
            <div className="text-xs text-gray-500 mb-1">Created</div>
            <div className="text-sm font-medium text-gray-900">{formatDate(createdAt)}</div>
          </div>
          <div className="p-3 border border-gray-200 rounded-lg">
            <div className="text-xs text-gray-500 mb-1">Last Updated</div>
            <div className="text-sm font-medium text-gray-900">{formatDate(updatedAt)}</div>
          </div>
        </div>
      </div>


       {/* Stripe Information */}
       {(stripeIdMonthly || stripeIdYearly) && (
        <div className="w-">
          <h3 className="text-lg font-semibold text-gray-900">Stripe Configuration</h3>
          <div className="grid grid-cols-2 gap-4">
            {stripeIdMonthly && (
              <div className="p-3 border border-gray-200 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Monthly Product ID</div>
                <div className="text-sm font-mono text-gray-700 break-all">
                  {stripeIdMonthly}
                </div>
              </div>
            )}
            {stripeIdYearly && (
              <div className="p-3 border border-gray-200 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Yearly Product ID</div>
                <div className="text-sm font-mono text-gray-700 break-all">
                  {stripeIdYearly}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
   
    </div>
  );
} 