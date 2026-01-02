
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, Star } from "lucide-react";
import { PlanResponse } from "@/types";
import PlanDetailHeader from "./PlanDetailHeader";
import PlanPricing from "./PlanPricing";
import PlanFeaturesTabs from "./PlanFeaturesTabs";
import PlanInfoStripe from "./PlanInfoStripe";

interface PlanDetailsDialogProps {
  plan: PlanResponse;
}

export default function PlanDetailsDialog({ plan }: PlanDetailsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-50 transition-colors">
          <Eye className="h-4 w-4 text-[#8D8EF5]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Star className="h-5 w-5 text-[#8D8EF5]" />
            Plan Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <PlanDetailHeader plan={plan} />
          <PlanPricing 
            monthlyAmount={plan.monthly_amount}
            yearlyAmount={plan.yearly_amount}
          />
          <PlanFeaturesTabs plan={plan} />
          <PlanInfoStripe 
            createdAt={plan.created_at}
            updatedAt={plan.updated_at}
            stripeIdMonthly={plan.stripeId_monthly}
            stripeIdYearly={plan.stripeId_yearly}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
} 