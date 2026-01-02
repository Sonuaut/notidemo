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

interface Parent {
  id: number;
  studentName: string;
  parentName: string;
  parentEmail: string;
  phoneNo: string;
  mode: string;
}

interface ParentsTableProps {
  parents: Parent[];
  onParentUpdate: (index: number, parent: Parent) => void;
  onParentRemove: (index: number) => void;
  parentLimit: number;
  originalCount?: number;
}

export default function ParentsTable({
  parents,
  onParentUpdate,
  onParentRemove,
  parentLimit,
  originalCount,
}: ParentsTableProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<Parent | null>(null);

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditData({ ...parents[index] });
  };

  const handleSave = (index: number) => {
    if (editData) {
      // Basic validation
      if (
        !editData.studentName.trim() ||
        !editData.parentName.trim() ||
        !editData.parentEmail.trim() ||
        !editData.phoneNo.trim() ||
        !editData.mode.trim()
      ) {
        errorToast("All fields are required");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(editData.parentEmail)) {
        errorToast("Please enter a valid email address");
        return;
      }

      onParentUpdate(index, editData);
      setEditingIndex(null);
      setEditData(null);
      successToast("Parent updated successfully");
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditData(null);
  };

  const handleInputChange = (field: keyof Parent, value: string) => {
    if (editData) {
      setEditData({ ...editData, [field]: value });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Parents ({parents.length})</h3>
        {originalCount && originalCount > parentLimit && (
          <p className="text-sm text-orange-600">
            Showing {parentLimit} of {originalCount} parents
          </p>
        )}
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Parent Name</TableHead>
              <TableHead>Parent Email</TableHead>
              <TableHead>Phone No</TableHead>
              <TableHead>Mode</TableHead>
              <TableHead className="w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parents.map((parent, index) => (
              <TableRow key={parent.id}>
                <TableCell>
                  {editingIndex === index ? (
                    <Input
                      value={editData?.studentName || ""}
                      onChange={(e) =>
                        handleInputChange("studentName", e.target.value)
                      }
                      className="h-8"
                    />
                  ) : (
                    parent.studentName
                  )}
                </TableCell>
                <TableCell>
                  {editingIndex === index ? (
                    <Input
                      value={editData?.parentName || ""}
                      onChange={(e) =>
                        handleInputChange("parentName", e.target.value)
                      }
                      className="h-8"
                    />
                  ) : (
                    parent.parentName
                  )}
                </TableCell>
                <TableCell>
                  {editingIndex === index ? (
                    <Input
                      value={editData?.parentEmail || ""}
                      onChange={(e) =>
                        handleInputChange("parentEmail", e.target.value)
                      }
                      className="h-8"
                    />
                  ) : (
                    parent.parentEmail
                  )}
                </TableCell>
                <TableCell>
                  {editingIndex === index ? (
                    <Input
                      value={editData?.phoneNo || ""}
                      onChange={(e) =>
                        handleInputChange("phoneNo", e.target.value)
                      }
                      className="h-8"
                    />
                  ) : (
                    parent.phoneNo
                  )}
                </TableCell>
                <TableCell>
                  {editingIndex === index ? (
                    <Input
                      value={editData?.mode || ""}
                      onChange={(e) =>
                        handleInputChange("mode", e.target.value)
                      }
                      className="h-8"
                    />
                  ) : (
                    parent.mode
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
                          onClick={() => onParentRemove(index)}
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

      {parents.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No parents uploaded yet
        </div>
      )}
    </div>
  );
}
