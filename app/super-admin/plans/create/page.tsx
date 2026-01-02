
import CreateAndUpdatePlanForm from "@/components/super-admin/plans/PlanCreationAndUpdation/CreateAndUpdatePlanForm";
import { AdminLayout } from "@/components/layout/admin-layout";
import { FormMode } from "@/types";
import CreatePlanHeader from "@/components/super-admin/plans/PlanCreationAndUpdation/CreatePlanHeader";

export default function CreatePlanPage() {

  return (
    <AdminLayout type="super-admin" className="md:p-0">
      <CreatePlanHeader />
      <div className="px-6 py-9">
        <CreateAndUpdatePlanForm mode={FormMode.CREATE} />
      </div>
    </AdminLayout>
  );
}
