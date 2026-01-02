"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Edit2, Check, X } from "lucide-react";
import { errorToast, successToast } from "@/components/hooks/use-toast";

interface Staff {
  id: number;
  teacher_name: string;
  teacher_email: string;
  phone_no: string;
}

interface StaffTableProps {
  staff: Staff[];
  onStaffUpdate: (index: number, staff: Staff) => void;
  onStaffRemove: (index: number) => void;
  staffLimit: number;
  originalCount?: number;
}

export default function StaffTable({
  staff,
  onStaffUpdate,
  onStaffRemove,
  staffLimit,
  originalCount,
}: StaffTableProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<Staff | null>(null);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditData({ ...staff[index] });
  };

  const handleSave = (index: number) => {
    if (editData) {
      // Basic validation
      if (
        !editData.teacher_name.trim() ||
        !editData.teacher_email.trim() ||
        !editData.phone_no.trim()
      ) {
        errorToast("All fields are required");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(editData.teacher_email)) {
        errorToast("Please enter a valid email address");
        return;
      }

      onStaffUpdate(index, editData);
      setEditingIndex(null);
      setEditData(null);
      successToast("Staff member updated successfully");
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditData(null);
  };

  const handleInputChange = (field: keyof Staff, value: string) => {
    if (editData) {
      setEditData({ ...editData, [field]: value });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Staff Members ({staff.length})
        </h3>
        {originalCount && originalCount > staffLimit && (
          <p className="text-sm text-orange-600">
            Showing {staffLimit} of {originalCount} staff members
          </p>
        )}
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Teacher Name</TableHead>
              <TableHead>Teacher Email</TableHead>
              <TableHead>Phone No</TableHead>
              <TableHead className="w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staff.map((staffMember, index) => (
              <TableRow key={staffMember.id}>
                <TableCell>
                  {editingIndex === index ? (
                    <Input
                      value={editData?.teacher_name || ""}
                      onChange={(e) =>
                        handleInputChange("teacher_name", e.target.value)
                      }
                      className="h-8"
                    />
                  ) : (
                    staffMember.teacher_name
                  )}
                </TableCell>
                <TableCell>
                  {editingIndex === index ? (
                    <Input
                      value={editData?.teacher_email || ""}
                      onChange={(e) =>
                        handleInputChange("teacher_email", e.target.value)
                      }
                      className="h-8"
                    />
                  ) : (
                    staffMember.teacher_email
                  )}
                </TableCell>
                <TableCell>
                  {editingIndex === index ? (
                    <Input
                      value={editData?.phone_no || ""}
                      onChange={(e) =>
                        handleInputChange("phone_no", e.target.value)
                      }
                      className="h-8"
                    />
                  ) : (
                    staffMember.phone_no
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {editingIndex === index ? (
                      <>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleSave(index)}
                          className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={handleCancel}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(index)}
                          className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onStaffRemove(index)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {staff.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No staff members uploaded yet
        </div>
      )}
    </div>
  );
}
