"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";
import { errorToast, successToast } from "@/components/hooks/use-toast";

interface Parent {
  id: number;
  studentName: string;
  parentName: string;
  parentEmail: string;
  phoneNo: string;
  mode: string;
}

interface SaveParentsButtonProps {
  parents: Parent[];
  onSaveSuccess: () => void;
  setOpen?: (open: boolean) => void;
}

export default function SaveParentsButton({
  parents,
  onSaveSuccess,
  setOpen,
}: SaveParentsButtonProps) {
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveParents = async () => {
    if (parents.length === 0) {
      errorToast("No parents to save");
      return;
    }

    setIsSaving(true);
    try {
      // Create FormData for multipart/form-data upload
      const formData = new FormData();

      // Convert parents data to CSV format
      const csvHeaders =
        "Student Name,Parent Name,Parent Email,Phone No,Mode\n";
      const csvRows = parents
        .map(
          (parent) =>
            `"${parent.studentName}","${parent.parentName}","${parent.parentEmail}","${parent.phoneNo}","${parent.mode}"`
        )
        .join("\n");
      const csvContent = csvHeaders + csvRows;

      // Create a CSV file blob
      const csvBlob = new Blob([csvContent], { type: "text/csv" });
      formData.append("files", csvBlob, "parents.csv");

      const authtoken = localStorage.getItem("adminAccessToken") || "";
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

      const response = await fetch(`${apiUrl}/api/v1/contacts/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authtoken}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        successToast(
          `${parents.length} parents have been uploaded successfully`
        );
        setOpen && setOpen(false);
        onSaveSuccess();
      } else {
        throw new Error(
          result.message || `Request failed with status ${response.status}`
        );
      }
    } catch (error) {
      console.error("Save parents error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to upload parents. Please try again.";
      errorToast(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="rounded-xl pr-1.5">
      <Button
        onClick={handleSaveParents}
        disabled={isSaving || parents.length === 0}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
      >
        {isSaving ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="h-4 w-4 mr-2" />
            Upload {parents.length} Parents
          </>
        )}
      </Button>
    </div>
  );
}
