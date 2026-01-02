import { AdminLayout } from "@/components/layout/admin-layout";
import PlanHeader from "@/components/super-admin/plans/PlanHeader";
import PlanTable from "@/components/super-admin/plans/PlanTable";
import { fetchPlans } from "@/lib/superadmin/plan";
import TablePagination from "@/components/common/TablePagination";
import PlanFiltersContainer from "@/components/super-admin/plans/filter/PlanFiltersContainer";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  
  // Extract filter parameters
  const filters = {
    role_type_plan: params.role_type_plan as string,
    is_active: params.is_active as string,
    offset: Number(params.offset) || 0,
  };
  
  const planData = await fetchPlans(filters);
  const foundplan =planData.plans.find(plan => plan.id === 35);
// console.log("foundplan", foundplan);
  return (
    <AdminLayout type="super-admin" className="md:p-0">
      <PlanHeader />
      <div className="px-6 py-9">
        <PlanFiltersContainer />
        <PlanTable plans={planData.plans} />
        {planData.pagination.total > 0 && <TablePagination total={planData.pagination.total} />}
      </div>
    </AdminLayout>
  );
} 