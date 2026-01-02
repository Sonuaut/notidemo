
import { AdminLayout } from "@/components/layout/admin-layout";
import { getSchoolUsers, User } from "@/lib/superadmin/school-users";
import { AdminDetails } from "@/components/super-admin/school-users/AdminDetails";
import { TeacherManagementWrapper } from "@/components/super-admin/school-users/TeacherManagementWrapper";
import BackButton from "@/components/super-admin/school-users/BackButton";


interface PageProps {
  searchParams: Promise<{
    schoolId?: string;
    schoolName?: string;
    search?: string;
    offset?: number;
  }>;
}

export default async function SchoolUsersPage({ searchParams }: PageProps) {
  const { schoolId, schoolName, search } = await searchParams;

  if (!schoolId) {
    return (
      <AdminLayout type="super-admin">
        <div className="flex flex-col items-center justify-center h-96">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">School Not Found</h2>
          <p className="text-gray-600 mb-6">There is Something Wrong.</p>
          <BackButton />
        </div>
      </AdminLayout>
    );
  }

  let schoolData;
  try {
    schoolData = await getSchoolUsers(schoolId, 0, search || "");
  } catch (error) {
    console.error("Error fetching school data:", error);
    return (
      <AdminLayout type="super-admin">
        <div className="flex flex-col items-center justify-center h-96">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Data</h2>
          <p className="text-gray-600 mb-6">Failed to load school users. Please try again.</p>
          <BackButton />
        </div>
      </AdminLayout>
    );
  }

  const filteredTeachers = schoolData.teachers
  return (
    <AdminLayout type="super-admin">
        <div className="space-y-6">
          <AdminDetails admin={schoolData.admin} schoolName={schoolName || schoolData.schoolName} schoolId={schoolId as unknown as number} />
          <TeacherManagementWrapper 
          subscription={schoolData.admin?.subscription as User["subscription"]}
            teachers={filteredTeachers} 
            schoolId={schoolId}
            total={schoolData.total  as number}
            searchTerm={search as string}
          />
        
      </div>
    </AdminLayout>
  );
}
