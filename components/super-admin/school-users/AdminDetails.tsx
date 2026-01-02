

import { User2, Mail, Phone, Calendar, Shield, CreditCard } from "lucide-react";
import { User } from "@/lib/superadmin/school-users";
import { PlanDetails } from "./PlanDetails";

interface AdminDetailsProps {
  admin: User | null;
  schoolName: string;
  isLoading?: boolean;
  schoolId?: number;
}

export function AdminDetails({ admin, isLoading = false, schoolId }: AdminDetailsProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="relative bg-gradient-to-tr from-blue-50/80 to-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-8 border border-blue-100 overflow-hidden animate-pulse">
        <div className="flex-shrink-0">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center" />
        </div>
        <div className="flex-1 min-w-0 w-full">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-6 w-40 bg-gray-200 rounded" />
            <span className="h-5 w-14 bg-blue-100 rounded-full ml-2" />
          </div>
          <div className="flex flex-wrap gap-3 mt-2">
            <span className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-blue-900 text-sm font-medium shadow-sm">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-200" />
              <span className="inline-block h-4 w-28 bg-gray-200 rounded" />
            </span>
            <span className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 text-green-900 text-sm font-medium shadow-sm">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-200" />
              <span className="inline-block h-4 w-20 bg-gray-200 rounded" />
            </span>
            <span className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 text-gray-700 text-xs font-medium shadow-sm">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-200" />
              <span className="inline-block h-4 w-24 bg-gray-200 rounded" />
            </span>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-32 h-32 bg-blue-100/30 rounded-full blur-2xl opacity-60 pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
            {admin ? (
              admin.name.charAt(0).toUpperCase()
            ) : (
              <User2 className="text-blue-100 w-10 h-10" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {admin ? admin.name : "No Admin Assigned"}
            </h2>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="text-blue-600 font-semibold">School Administrator</span>
            </div>
          </div>
        </div>
        
       
          <div className="hidden md:block">
            <PlanDetails subscription={admin?.subscription} adminId={admin?.id} schoolId={schoolId as number} />
          </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Mail className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium text-gray-900">
              {admin?.email || "Not provided"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <Phone className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Phone</p>
            <p className="font-medium text-gray-900">
              {admin?.phone && admin.phone !== "N/A" ? admin.phone : "Not provided"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Joined</p>
            <p className="font-medium text-gray-900">
              {admin ? formatDate(admin.joinDate) : "Unknown"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
