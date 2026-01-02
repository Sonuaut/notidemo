"use client";
import React, { useEffect, useState } from "react";
import UploadExcel from "./UploadExcel";
import TeacherTable from "./TeacherTable";
import SaveTeachersButton from "./SaveTeachersButton";
import { User } from "@/lib/superadmin/school-users";

interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
  setOpen?: (open: boolean) => void;
}

export default function BulkDialogContent({
  schoolId,
  onTeachersAdded,
  setOpen,
  fetchAllUsers,
  teacherlimit,
}: {
  schoolId: number;
  onTeachersAdded: () => void;
  teacherlimit: number;
  setOpen: (open: boolean) => void;
  fetchAllUsers: () => void;
}) {
  const [teacherList, setTeacherList] = useState<Teacher[]>([]);
  const [originalCount, setOriginalCount] = useState<number | undefined>(
    undefined
  );

  const handleTeacherUpdate = (index: number, teacher: Teacher) => {
    const updatedTeachers = [...teacherList];
    updatedTeachers[index] = teacher;
    setTeacherList(updatedTeachers);
  };

  const handleTeacherRemove = (index: number) => {
    const updatedTeachers = teacherList.filter((_, i) => i !== index);
    setTeacherList(updatedTeachers);
  };

  const handleSaveSuccess = () => {
    setTeacherList([]);
    setOriginalCount(undefined);
    setOpen(false);
    onTeachersAdded();
  };
  console.log(teacherList, "teacherList");

  return (
    <div className="flex flex-col h-full ">
      <div className="space-y-4 flex-1 overflow-hidden">
        <UploadExcel
          setTeachers={setTeacherList}
          setOriginalCount={setOriginalCount}
          teacherlimit={teacherlimit}
        />
        {teacherList.length > 0 && (
          <>
            <SaveTeachersButton
              fetchAllUsers={fetchAllUsers}
              teachers={teacherList}
              setOpen={setOpen}
              onSaveSuccess={handleSaveSuccess}
              schoolId={schoolId}
            />
            <TeacherTable
              teachers={teacherList}
              onTeacherUpdate={handleTeacherUpdate}
              onTeacherRemove={handleTeacherRemove}
              teacherlimit={teacherlimit}
              originalCount={originalCount}
            />
          </>
        )}
      </div>
    </div>
  );
}
