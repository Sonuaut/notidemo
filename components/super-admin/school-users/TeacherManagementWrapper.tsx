"use client";

import { useRouter } from "next/navigation";
import { TeachersTable } from "./TeachersTable";
import { AddTeacherDialog } from "./AddTeacherDialog";
import { BulkUploadDialog } from "./Bulk-upload/BulkUploadDialog";
import { TeachersSearchFilter } from "./TeachersSearchFilter";
import { User } from "@/lib/superadmin/school-users";
import TablePagination from "@/components/common/TablePagination";
import { Subscription } from "@/lib/admin/subscription";

interface TeacherManagementWrapperProps {
  teachers: User[];
  subscription: User["subscription"];
  schoolId: string; 
  searchTerm?: string;
  total: number;
}

export function TeacherManagementWrapper({ 
  subscription,
  teachers, 
  schoolId, 
  total,
}: TeacherManagementWrapperProps) {
  const router = useRouter();

  const handleTeacherAdded = () => {
    router.refresh();
  };

  const handleTeacherUpdated = () => {
    router.refresh();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900 pl-1">Teachers</h2>
        <div className="flex items-center gap-4">
          <TeachersSearchFilter placeholder="Search teachers by name, email..." />
          <AddTeacherDialog 
            schoolId={schoolId} 
            onTeacherAdded={handleTeacherAdded} 
          />
        </div>
      </div>
      <TeachersTable 
        teachers={teachers} 
        schoolId={schoolId}
        onTeacherUpdated={handleTeacherUpdated}
      />
      <TablePagination
        total={total}
      />
    </div>
  );
}
