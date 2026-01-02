import { User } from "@/lib/superadmin/school-users";
import { EditTeacherDialog } from "./EditTeacherDialog";
import { TeacherStatusSwitcher } from "./TeacherStatusSwitcher";

interface TeachersTableProps {
  teachers: User[];
  schoolId: string;
  onTeacherUpdated: () => void;
}

export function TeachersTable({ teachers, schoolId, onTeacherUpdated }: TeachersTableProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="shadow-xl rounded-xl border border-[#E0E0E0] overflow-hidden">
      <table className="w-full">
        <thead className="">
          <tr className="">
            <th className="text-left px-6 py-5 font-medium text-sm">
              Name
            </th>
            <th className="text-left px-6 py-5 font-medium text-sm">
              Email
            </th>
            <th className="text-left px-6 py-5 font-medium text-sm">
              Phone
            </th>
            <th className="w-[15%] text-left px-6 py-5 font-medium text-sm">
              Status
            </th>
            <th className="text-left px-6 py-5 font-medium text-sm">
              Join Date
            </th>
            <th className="text-left px-6 py-5 font-medium text-sm">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {teachers.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center border-t py-4 text-muted-foreground">
                No teachers found
              </td>
            </tr>
          ) : (
            teachers.map((teacher, index) => (
              <tr key={teacher.id} className={`last:border-b-0 ${index % 2 == 0 ? 'bg-[#F6F6FF]' : 'bg-white'}`}>
                <td className="px-6 py-4 font-medium">
                  {teacher.name}
                </td>
                <td className="p-4">
                  {teacher.email}
                </td>
                <td className="p-4">
                  {teacher.phone}
                </td>
                <td className="p-4 w-[15%]">
                  <TeacherStatusSwitcher
                    teacher_id={teacher.id}
                    name={teacher.name}
                    mobile_no={teacher.phone}
                    currentStatus={teacher.status === "active"}
                    onStatusChange={onTeacherUpdated}
                  />
                </td>
                <td className="p-4">
                  {formatDate(teacher.joinDate)}
                </td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <EditTeacherDialog
                      teacher={{
                        id: teacher.id,
                        name: teacher.name,
                        email: teacher.email,
                        mobile_no: teacher.phone,
                        role: teacher.role,
                        is_active: teacher.status === "active",
                        created_at: teacher.joinDate,
                        school_id: schoolId,
                      }}
                      schoolId={schoolId}
                      onTeacherUpdated={onTeacherUpdated}
                    />
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
