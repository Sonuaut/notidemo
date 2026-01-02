import { Eye, PencilLine, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormMode, RechargeResponse, RechargeType } from "@/types";
import RechargeDetailsDialog from "@/components/super-admin/recharges/RechargeDetailsDialog";
import CreateAndUpdateRechargeDialog from "@/components/super-admin/recharges/CreateAndUpdateRechargeDialog";
import DeleteRechargeDialog from "@/components/super-admin/recharges/DeleteRechargeDialog";
import RechargeStatusSwitcher from "./RechargeStatusSwitcher";

interface RechargeTableProps {
  recharges: RechargeResponse[];
}

const formatPrice = (price: number) => {
  return `$${price.toFixed(2)}`;
};

export default function RechargeTable({ recharges }: RechargeTableProps) {
  return (
    <div className=" shadow-xl rounded-xl border border-[#E0E0E0] overflow-hidden">
      <table className="w-full">
        <thead className="">
          <tr className="">
            <th className="text-left px-6 py-5 font-medium text-sm">
              Title
            </th>
            <th className="text-left px-6 py-5 font-medium text-sm">
              Price
            </th>
            <th className="text-left px-6 py-5 font-medium text-sm">
              Type
            </th>
            <th className="text-left px-6 py-5 font-medium text-sm">
              Credits
            </th>
            <th className="text-left px-6 py-5 font-medium text-sm">
              Status
            </th>
            <th className="text-left px-6 py-5 font-medium text-sm">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {recharges.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center border-t py-4 text-muted-foreground">
                No recharges found 
              </td>
            </tr>
          ) : (
            recharges.map((recharge: RechargeResponse, index: number) => (
              <tr key={recharge.id} className={`last:border-b-0 ${index % 2 == 0 ? 'bg-[#F6F6FF]' : 'bg-white'}`}>
                <td className="px-6 py-4 font-medium capitalize">
                  {recharge.title}
                </td>
                <td className="p-4">
                  {formatPrice(recharge.recharge_price)}
                </td>
                <td className="p-4">
                  {recharge.type}
                </td>
                <td className="p-4">
                  {recharge.type === RechargeType.EMAIL ? recharge.email_limit : 
                   recharge.type === RechargeType.SMS ? recharge.sms_limit :
                   recharge.type === RechargeType.BOTH ? `${recharge.email_limit} / ${recharge.sms_limit}` : 
                   recharge.email_limit || recharge.sms_limit}
                </td>
                <td className="p-4">
                  <RechargeStatusSwitcher recharge={recharge} />
                </td>
                <td className="p-4">
                  <div className="flex space-x-6">
                    <RechargeDetailsDialog recharge={recharge} />
                    <CreateAndUpdateRechargeDialog mode={FormMode.UPDATE} rechargeData={recharge}>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
                        <PencilLine className="h-5 w-5 text-[#8D8EF5]" />
                      </Button>
                    </CreateAndUpdateRechargeDialog>
                    {/* <DeleteRechargeDialog recharge={recharge} /> */}
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