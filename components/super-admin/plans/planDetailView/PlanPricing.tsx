
import { Calendar, Clock } from "lucide-react";

interface PlanPricingProps {
  monthlyAmount: number;
  yearlyAmount: number;
}

export default function PlanPricing({ monthlyAmount, yearlyAmount }: PlanPricingProps) {
  const formatPrice = (price: number) => {
    return price === 0 ? "Free" : `$${price.toFixed(2)}`;
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900">Pricing</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
          <Calendar className="h-4 w-4 text-gray-600" />
          <div>
            <div className="text-sm font-medium text-gray-900">{formatPrice(monthlyAmount)}</div>
            <div className="text-xs text-gray-500">per month</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
          <Clock className="h-4 w-4 text-gray-600" />
          <div>
            <div className="text-sm font-medium text-gray-900">{formatPrice(yearlyAmount)}</div>
            <div className="text-xs text-gray-500">per year</div>
          </div>
        </div>
      </div>
    </div>
  );
} 