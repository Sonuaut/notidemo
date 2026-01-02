import { AdminLayout } from "@/components/layout/admin-layout";
import TemplateHeader from "@/components/super-admin/templates/TemplateHeader";
import TemplateTable from "@/components/super-admin/templates/TemplateTable"
import { fetchTemplates } from "@/lib/superadmin/template";
import TablePagination from "@/components/common/TablePagination";
import { paginationLimit } from "@/types";
import TemplateFiltersContainer from "@/components/super-admin/templates/filter/TemplateFiltersContainer";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const offset = Number(params.offset) || 0;
  
  // Extract filter parameters
  const filters = {
    template_type: params.template_type as string,
    is_active: params.is_active as string,
    is_custom: params.is_custom as string,
    user_id: params.user_id ? Number(params.user_id) : undefined,
    school_id: params.school_id ? Number(params.school_id) : undefined,
    offset: offset,
    limit: paginationLimit.LIMIT_10,
  };
  
  const templateData = await fetchTemplates(filters);
  console.log("templateData",templateData);
  // Check if response has pagination (type guard)
  const hasPagination = 'pagination' in templateData;
  
  return (
    <AdminLayout type="super-admin" className="md:p-0">
      <TemplateHeader />
      <div className="px-6 py-9 ">
        <TemplateFiltersContainer />
        <TemplateTable templates={templateData.templates} />
        {hasPagination && templateData.pagination.total > 0 && (
          <TablePagination total={templateData.pagination.total} />
        )}
      </div>
    </AdminLayout>
  );
} 
