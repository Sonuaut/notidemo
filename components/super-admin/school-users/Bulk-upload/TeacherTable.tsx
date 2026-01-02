"use client";
import { useState, useMemo } from "react";
import { Edit3, Check, X, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface TeacherTableProps {
  teachers: Teacher[];
  onTeacherUpdate: (index: number, teacher: Teacher) => void;
  onTeacherRemove: (index: number) => void;
  teacherlimit?: number;
  originalCount?: number;
}

export default function TeacherTable({ teachers, onTeacherUpdate, onTeacherRemove, teacherlimit, originalCount }: TeacherTableProps) {
    const [editingRow, setEditingRow] = useState<number | null>(null);
    const [editData, setEditData] = useState<Teacher | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Show 5teachers per page

    const handleCancel = () => {
        setEditingRow(null);
        setEditData(null);
    };
    
    
    const handleFieldChange = (field: keyof Teacher, value: string) => {
        if (editData) {
            setEditData({ ...editData, [field]: value });
        }
    };

    // Pagination logic
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return teachers.slice(startIndex, endIndex);
    }, [teachers, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(teachers.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        setEditingRow(null); // Cancel any ongoing edit when changing pages
        setEditData(null);
    };

    const handleEdit = (index: number) => {
        const globalIndex = (currentPage - 1) * itemsPerPage + index;
        setEditingRow(globalIndex);
        setEditData({ ...teachers[globalIndex] });
    };

    const handleSave = (index: number) => {
        if (editData) {
            const globalIndex = (currentPage - 1) * itemsPerPage + index;
            onTeacherUpdate(globalIndex, editData);
            setEditingRow(null);
            setEditData(null);
        }
    };

    const handleRemove = (index: number) => {
        const globalIndex = (currentPage - 1) * itemsPerPage + index;
        onTeacherRemove(globalIndex);
    };


  if (teachers.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No teachers to display</p>
      </div>
    );
  }

  return (
    <div className="border rounded-xl overflow-hidden h-full flex flex-col">
      {/* Teacher Count Header */}
      {teacherlimit && (
        <div className="bg-blue-50 border-b px-4 py-2 flex-shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">
              Teachers: {teachers.length}
            </span>
            <span className="text-xs text-blue-700">
              Limit: {teacherlimit}
            </span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-1.5 mt-1">
            <div 
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((teachers.length / teacherlimit) * 100, 100)}%` }}
            ></div>
          </div>
          {originalCount && originalCount > teacherlimit && (
            <div className="mt-2 text-xs text-amber-700 bg-amber-100 px-2 py-1 rounded">
              ⚠️ File contained {originalCount} teachers, but only first {teacherlimit} were imported due to plan limits
            </div>
          )}
        </div>
      )}
      
      <div className="bg-gray-50 grid grid-cols-4 gap-4 px-4 py-3 flex-shrink-0">
        <div className="col-span-1 text-xs font-medium text-gray-500 uppercase">Name</div>
        <div className="col-span-1 text-xs font-medium text-gray-500 uppercase">Email</div>
        <div className="col-span-1 text-xs font-medium text-gray-500 uppercase text-center">Phone</div>
        <div className="col-span-1 text-xs font-medium text-gray-500 uppercase text-center">Actions</div>
      </div>
      <div className="flex-1">
        <div className="divide-y divide-gray-200">
          {paginatedData.map((teacher, index) => {
            const globalIndex = (currentPage - 1) * itemsPerPage + index;
            const isEditing = editingRow === globalIndex;
            
            return (
              <div key={teacher.id} className="grid grid-cols-4 gap-4 px-4 py-3 hover:bg-gray-50">
                <div className="col-span-1 flex items-center">
                  {isEditing ? (
                    <Input
                      value={editData?.name || ""}
                      onChange={(e) => handleFieldChange('name', e.target.value)}
                      className="h-8 border"
                    />
                  ) : (
                    <span className="text-sm text-gray-900">{teacher.name}</span>
                  )}
                </div>
                <div className="col-span-1 flex items-center">
                  {isEditing ? (
                    <Input
                      value={editData?.email || ""}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      className="h-8"
                    />
                  ) : (
                    <span className="text-sm text-gray-900">{teacher.email}</span>
                  )}
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  {isEditing ? (
                    <Input
                      value={editData?.phone || ""}
                      onChange={(e) => handleFieldChange('phone', e.target.value)}
                      className="h-8"
                    />
                  ) : (
                    <span className="text-sm text-gray-900">{teacher.phone}</span>
                  )}
                </div>
                <div className="col-span-1 flex items-center gap-2 justify-center">
                  {isEditing ? (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleSave(index)}
                        className="h-8 w-8 p-0 bg-green-600 hover:bg-green-700"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancel}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(index)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRemove(index)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="bg-gray-50 border-t px-4 py-3 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, teachers.length)} of {teachers.length} teachers
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-1">
              {(() => {
                const maxVisiblePages = 7; // Show maximum 7 page buttons
                const pages = [];
                
                if (totalPages <= maxVisiblePages) {
                  // Show all pages if total is small
                  for (let i = 1; i <= totalPages; i++) {
                    pages.push(
                      <Button
                        key={i}
                        size="sm"
                        variant={currentPage === i ? "default" : "outline"}
                        onClick={() => handlePageChange(i)}
                        className="h-8 w-8 p-0"
                      >
                        {i}
                      </Button>
                    );
                  }
                } else {
                  // Smart pagination for large datasets
                  const startPage = Math.max(1, currentPage - 3);
                  const endPage = Math.min(totalPages, currentPage + 3);
                  
                  // Always show first page
                  if (startPage > 1) {
                    pages.push(
                      <Button
                        key={1}
                        size="sm"
                        variant={currentPage === 1 ? "default" : "outline"}
                        onClick={() => handlePageChange(1)}
                        className="h-8 w-8 p-0"
                      >
                        1
                      </Button>
                    );
                    
                    if (startPage > 2) {
                      pages.push(
                        <span key="ellipsis1" className="px-2 text-gray-500">
                          ...
                        </span>
                      );
                    }
                  }
                  
                  // Show pages around current page
                  for (let i = startPage; i <= endPage; i++) {
                    if (i !== 1 && i !== totalPages) {
                      pages.push(
                        <Button
                          key={i}
                          size="sm"
                          variant={currentPage === i ? "default" : "outline"}
                          onClick={() => handlePageChange(i)}
                          className="h-8 w-8 p-0"
                        >
                          {i}
                        </Button>
                      );
                    }
                  }
                  
                  // Always show last page
                  if (endPage < totalPages) {
                    if (endPage < totalPages - 1) {
                      pages.push(
                        <span key="ellipsis2" className="px-2 text-gray-500">
                          ...
                        </span>
                      );
                    }
                    
                    pages.push(
                      <Button
                        key={totalPages}
                        size="sm"
                        variant={currentPage === totalPages ? "default" : "outline"}
                        onClick={() => handlePageChange(totalPages)}
                        className="h-8 w-8 p-0"
                      >
                        {totalPages}
                      </Button>
                    );
                  }
                }
                
                return pages;
              })()}
            </div>
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
