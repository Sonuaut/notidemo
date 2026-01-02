import { AdminLayout } from "@/components/layout/admin-layout";
import SchoolPage from "@/components/super-admin/schools/SchoolPage";
import { Suspense } from "react";


export default function Page() {
  return (
    <AdminLayout type="super-admin">
    <Suspense fallback={<div>Loading...</div>}>
      <SchoolPage />
    </Suspense>
    </AdminLayout>
    
  );
}