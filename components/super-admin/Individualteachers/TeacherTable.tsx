"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TeacherData } from "@/lib/superadmin/teacher";
import TeacherStatusToggle from "./TeacherStatusToggle";
import TeacherDetailsDialog from "./TeacherDetailsDialog";
import AssignTemplatesToTeacherDialog from "./AssignTemplatesToTeacherDialog";
import DeleteUserDialog from "./DeleteUserDialog";
import { Subscription } from "@/lib/admin/subscription";
import { Crown, Circle } from "lucide-react";

type TeacherTableProps = Readonly<{
  data: {
    user: TeacherData;
    subscription: Subscription;
  }[];
}>;

export default function TeacherTable(props: TeacherTableProps) {
  const { data } = props;
  const [rows, setRows] = useState(data);
  console.log("rows", rows);
  const handleUserDeleted = (id: number) => {
    setRows((prev) => prev.filter(({ user }) => user.id !== id));
  };

  return (
    <div className="shadow-xl rounded-xl border border-[#E0E0E0] overflow-hidden">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left px-6 py-5 font-medium text-sm">
              Teacher Name
            </th>
            <th className="text-left px-4 py-5 font-medium text-sm">Email</th>
            <th className="text-left px-4 py-5 font-medium text-sm">Phone</th>
            <th className="text-left px-4 py-5 font-medium text-sm">Role</th>
            <th className="text-left px-4 py-5 font-medium text-sm">Plan</th>
            <th className="text-left px-4 py-5 font-medium text-sm">Status</th>
            <th className="text-left px-4 py-5 font-medium text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="text-center border-t py-4 text-muted-foreground"
              >
                No individual teachers found
              </td>
            </tr>
          ) : (
            rows.map((data, index) => {
              const { user: teacher, subscription } = data;
              const assign = Boolean(subscription);

              const isFree = subscription?.subscription_amount == 0;

              return (
                <tr
                  key={teacher.id}
                  className={`last:border-b-0 ${
                    index % 2 === 0 ? "bg-[#F6F6FF]" : "bg-white"
                  }`}
                >
                  <td className="px-6 py-4 font-medium">{teacher.name}</td>
                  <td className="p-4">{teacher.email || "N/A"}</td>
                  <td className="p-4">{teacher.mobile_no || "N/A"}</td>
                  <td className="p-4">{teacher.role || "N/A"}</td>

                  {/* Plan with icon */}
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {isFree ? (
                        <>
                          <Circle className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium text-green-600">
                            Free
                          </span>
                        </>
                      ) : (
                        <>
                          <Crown className="w-4 h-4 text-purple-500" />
                          <span className="text-sm font-medium text-purple-600">
                            Paid
                          </span>
                        </>
                      )}
                    </div>
                  </td>

                  <td className="w-[10%] p-4">
                    <TeacherStatusToggle
                      teacherId={teacher?.id?.toString()}
                      initialStatus={teacher.is_active || false}
                      school_id={teacher.school_id || 0}
                      name={teacher.name}
                      mobile_no={teacher.mobile_no}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-6">
                      <TeacherDetailsDialog teacher={teacher} />
                      <AssignTemplatesToTeacherDialog
                        teacherId={teacher.id}
                        teacherData={teacher}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={!assign}
                          className="h-8 px-2 py-1 rounded-md border text-[#8D8EF5] hover:bg-[#8D8EF5]/10"
                        >
                          Assign Templates
                        </Button>
                      </AssignTemplatesToTeacherDialog>
                      <DeleteUserDialog
                        userId={teacher.id}
                        userName={teacher.name}
                        userEmail={teacher.email}
                        onDeleted={handleUserDeleted}
                      />
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
