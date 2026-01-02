import { AdminLayout } from "@/components/layout/admin-layout";
import RechargeHeader from "@/components/super-admin/recharges/RechargeHeader";
import RechargeTable from "@/components/super-admin/recharges/RechargeTable";
import { fetchRecharges, RechargeType } from "@/lib/superadmin/recharge";
import TablePagination from "@/components/common/TablePagination";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { offset, name, type, is_active } = await searchParams;
  const rechargeData = await fetchRecharges({
    offset: Number(offset) || 0,
    name: name as string,
    type: type as RechargeType | undefined,
    is_active: is_active === 'true' ? true : is_active === 'false' ? false : undefined
  });
  
  return (
    <AdminLayout type="super-admin" className="md:p-0"> 
      <RechargeHeader />
     <div className="px-6 py-9">
        <RechargeTable recharges={rechargeData.recharges} />
        {rechargeData.pagination.total > 0 && (
          <TablePagination total={rechargeData.pagination.total} />
        )}
      </div>
    </AdminLayout>
  );
} 