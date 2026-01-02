"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SchoolUsersHeaderProps {
  schoolName: string;

}

export function SchoolUsersHeader({ schoolName }: SchoolUsersHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.href = "/super-admin/schools"}
            className="flex items-center gap-2 hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Schools
          </Button>
          <div className="h-6 w-px bg-gray-300" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {schoolName}
            </h1>
            <p className="text-sm text-gray-600">School Users Management</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="text-sm text-gray-500">Super Admin</p>
            <p className="text-xs text-gray-400">School Management</p>
          </div>
        </div>
      </div>
    </div>
  );
}
