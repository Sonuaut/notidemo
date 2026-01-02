"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UploadParentsExcel from "./UploadParentsExcel";
import ParentsTable from "./ParentsTable";
import SaveParentsButton from "./SaveParentsButton";

interface Parent {
  id: number;
  studentName: string;
  parentName: string;
  parentEmail: string;
  phoneNo: string;
  mode: string;
}

interface ParentsBulkUploadProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onParentsAdded: () => void;
}

export default function ParentsBulkUpload({
  open,
  onOpenChange,
  onParentsAdded,
}: ParentsBulkUploadProps) {
  const [parentsList, setParentsList] = useState<Parent[]>([]);
  const [originalCount, setOriginalCount] = useState<number | undefined>(
    undefined
  );

  // For now, set a reasonable limit - you can make this dynamic based on subscription
  const parentLimit = 1000;

  const handleParentUpdate = (index: number, parent: Parent) => {
    const updatedParents = [...parentsList];
    updatedParents[index] = parent;
    setParentsList(updatedParents);
  };

  const handleParentRemove = (index: number) => {
    const updatedParents = parentsList.filter((_, i) => i !== index);
    setParentsList(updatedParents);
  };

  const handleSaveSuccess = () => {
    setParentsList([]);
    setOriginalCount(undefined);
    onParentsAdded();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Bulk Upload Parents</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-full overflow-hidden">
          <div className="space-y-4 flex-1 overflow-hidden">
            <UploadParentsExcel
              setParents={setParentsList}
              setOriginalCount={setOriginalCount}
              parentLimit={parentLimit}
            />

            {parentsList.length > 0 && (
              <>
                <SaveParentsButton
                  parents={parentsList}
                  setOpen={onOpenChange}
                  onSaveSuccess={handleSaveSuccess}
                />
                <ParentsTable
                  parents={parentsList}
                  onParentUpdate={handleParentUpdate}
                  onParentRemove={handleParentRemove}
                  parentLimit={parentLimit}
                  originalCount={originalCount}
                />
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
