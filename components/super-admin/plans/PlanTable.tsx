
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormMode, PlanResponse } from "@/types";
import PlanDetailsDialog from "./planDetailView/PlanDetailsDialog";
import CreateAndUpdatePlanDialog from "./PlanCreationAndUpdation/CreateAndUpdatePlanDialog";
import DeletePlanDialog from "./PlanCreationAndUpdation/DeletePlanDialog";
import PlanStatusSwitcher from "./PlanStatusSwitcher";

interface PlanTableProps {
  plans: PlanResponse[];
}

export default function PlanTable({ plans }: PlanTableProps) {
  const formatPrice = (price: number) => {
    return price === 0 ? "Free" : `$${price}`;
  };

  return (
    <div className=" shadow-xl rounded-b-xl border border-[#E0E0E0] overflow-hidden">
      <table className="w-full">
        <thead className="">
          <tr className="">
            <th className="text-left px-6 py-5 font-medium text-sm">Plan Title</th>
            <th className="text-left px-4 py-5 font-medium text-sm">Monthly Price</th>
            <th className="text-left px-4 py-5 font-medium text-sm">Yearly Price</th>
            <th className="text-left px-4 py-5 font-medium text-sm">User Role</th>
            <th className="text-left px-4 py-5 font-medium text-sm">Status</th>
            <th className="text-left px-4 py-5 font-medium text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center border-t py-4 text-muted-foreground">
                No plans found 
              </td>
            </tr>
          ) : (
            plans.map((plan:PlanResponse,index:number) => (
              <tr key={plan.id} className={` last:border-b-0 ${index % 2 == 0 ? 'bg-[#F6F6FF]' : 'bg-white'}`}>
                <td className="px-6 py-4 font-medium capitalize">
                  {plan.title}
                </td>
               
                <td className="p-4">
                    {formatPrice(plan.monthly_amount)}
                </td>
                <td className="p-4">
                    {formatPrice(plan.yearly_amount)}
                </td>
                <td className="p-4">
                  {plan.role_type_plan}
                </td>
                <td className="p-4">
                  <PlanStatusSwitcher 
                    planId={plan.id} 
                    isActive={plan.is_active} 
                  />
                </td>
                <td className="p-4">
                  <div className="flex space-x-6">
                    <PlanDetailsDialog plan={plan} />
                    <CreateAndUpdatePlanDialog mode={FormMode.UPDATE} planData={plan} />
                    <DeletePlanDialog plan={plan} />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
} 