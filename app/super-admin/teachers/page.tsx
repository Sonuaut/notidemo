import { AdminLayout } from "@/components/layout/admin-layout";
import TablePagination from "@/components/common/TablePagination";
import { fetchIndividualTeachers } from "@/lib/superadmin/teacher";
import TeacherTable from "@/components/super-admin/Individualteachers/TeacherTable";
import TeacherHeader from "@/components/super-admin/Individualteachers/TeacherHeader";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { offset } = await searchParams;
  const formattedData = await fetchIndividualTeachers(Number(offset) || 0);
  return (
    <AdminLayout type="super-admin" className="md:p-0">
      <TeacherHeader />
      <div className="px-6 py-9">
        <TeacherTable data={formattedData.data} />
        {formattedData.total_count > 0 && (
          <TablePagination total={formattedData.total_count} />
        )}
      </div>
    </AdminLayout>
  );
}
