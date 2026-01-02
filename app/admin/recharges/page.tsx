import { AdminLayout } from "@/components/layout/admin-layout";
import { Label } from "@/components/common/Label";
import { fetchRechargeHistory } from "@/lib/admin/recharge";
import TablePagination from "@/components/common/TablePagination";
import RechargeHistoryTable from "@/components/admin/recharge/RechargeHistoryTable";
import { paginationLimit } from "@/types";
import RechargePlansDialog from "@/components/admin/plans/RechargePlansDialog";
import CommonButton from "@/components/common/Button";
import { Plus } from "lucide-react";

export default async function AdminRechargeHistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  const offset = Number(params.offset ?? 0) || 0;
  const { items, total } = await fetchRechargeHistory(offset, paginationLimit.LIMIT_20);

  return (
    <AdminLayout type="admin" className="md:p-0">
      <div className="flex items-center justify-between h-16 border-b border-gray-200 px-6">
        <div className="flex items-center space-x-3">
          <Label className="text-2xl font-bold text-gray-900">Recharge History</Label>
          <span className="px-2 py-1 rounded-xl bg-indigo-100 text-indigo-700 text-xs font-semibold">Admin</span>
        </div>
        <RechargePlansDialog>   
        <div className="flex items-center  bg-[#8D8EF5] text-white h-9 px-4 rounded-full ml-auto hover:bg-[#8D8EF5]/90 hover:text-white">
        <Plus className="h-4 w-4 text-white" />
        <CommonButton variant="outline" >New Recharge</CommonButton>
        </div>
           </RechargePlansDialog>     

      </div>
      <div className="px-6 py-9">
        <RechargeHistoryTable items={items} />
        {total > 0 && <TablePagination total={total} />}
      </div>
    </AdminLayout>
  );
}


