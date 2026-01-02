import { formatDate } from "@/lib/common/dateUtil";
import Link from "next/link";

export default function TeachersList({
  teachersList
}:{
  teachersList:any
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center mb-5 gap-2">
        <span className="text-lg font-bold text-gray-800">New Teachers</span>
        <Link href={"teachers"} className="ml-auto text-blue-600 text-sm font-medium cursor-pointer ">View All</Link>
      </div>
      <table className="min-w-full text-base font-normal">
        <thead>
          <tr className="text-gray-500 text-left">
            <th className="py-3 px-4">Teacher</th>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {teachersList.slice(0,5).map((teacher:any) => (
         <tr key={teacher.name} className="border-t hover:bg-blue-50 transition">
         <td className="py-3 px-4 font-medium text-gray-900 max-w-xs truncate" title={teacher.name}>{teacher.name}</td>
         <td className="py-3 px-4 whitespace-nowrap">{formatDate(teacher.create_at, "MMMM Do YYYY")}</td>
         <td className="py-3 px-4">
           <span className={`px-2 py-1 rounded text-xs font-semibold ${teacher.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{teacher.is_active ? "Active" : "InActive"}</span>
         </td>
       </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 