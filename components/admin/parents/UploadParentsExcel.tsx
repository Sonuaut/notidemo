"use client";
import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import UploadedFile from "./UploadedFile";
import readXlsxFile from "read-excel-file";
import { errorToast, successToast } from "@/components/hooks/use-toast";

interface Parent {
  id: number;
  studentName: string;
  parentName: string;
  parentEmail: string;
  phoneNo: string;
  mode: string;
}

interface UploadExcelProps {
  setParents: (parents: Parent[]) => void;
  setOriginalCount: (count: number) => void;
  parentLimit: number;
}

export default function UploadParentsExcel({
  setParents,
  setOriginalCount,
  parentLimit,
}: UploadExcelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Helper function to find column index by matching header names
  const findColumnIndex = (headers: any[], possibleNames: string[]): number => {
    for (let i = 0; i < headers.length; i++) {
      const header = String(headers[i]).trim().toLowerCase();
      if (possibleNames.map((name) => name.toLowerCase()).includes(header)) {
        return i;
      }
    }
    return -1; // Column not found
  };

  const parseExcel = async (file: File): Promise<Parent[]> => {
    try {
      const rows = await readXlsxFile(file);
      const parents: Parent[] = [];

      if (rows.length < 2) {
        return parents; // Need at least header + 1 data row
      }

      // Get header row and find column indices
      const headerRow = rows[0];
      const studentNameIndex = findColumnIndex(headerRow, [
        "student_name",
        "student name",
        "Student Name",
        "Student Name",
      ]);
      const parentNameIndex = findColumnIndex(headerRow, [
        "parent_name",
        "parent name",
        "Parent Name",
        "Parent Name",
      ]);
      const parentEmailIndex = findColumnIndex(headerRow, [
        "parent_email",
        "parent email",
        "Parent Email",
        "Parent Email",
      ]);
      const phoneNoIndex = findColumnIndex(headerRow, [
        "phone_no",
        "phone no",
        "Phone No",
        "Phone No",
        "phone",
        "Phone",
        "mobile",
        "Mobile",
      ]);
      const modeIndex = findColumnIndex(headerRow, [
        "mode",
        "Mode",
        "notification_mode",
        "notification mode",
      ]);

      // Validate that we found all required columns
      if (
        studentNameIndex === -1 ||
        parentNameIndex === -1 ||
        parentEmailIndex === -1 ||
        phoneNoIndex === -1 ||
        modeIndex === -1
      ) {
        const missingColumns = [];
        if (studentNameIndex === -1) missingColumns.push("Student Name");
        if (parentNameIndex === -1) missingColumns.push("Parent Name");
        if (parentEmailIndex === -1) missingColumns.push("Parent Email");
        if (phoneNoIndex === -1) missingColumns.push("Phone No");
        if (modeIndex === -1) missingColumns.push("Mode");

        throw new Error(
          `Missing required columns: ${missingColumns.join(
            ", "
          )}. Please ensure your file has the required columns.`
        );
      }

      // Process data rows
      const dataRows = rows.slice(1);
      dataRows.forEach((row: any[], index: number) => {
        const studentName = row[studentNameIndex];
        const parentName = row[parentNameIndex];
        const parentEmail = row[parentEmailIndex];
        const phoneNo = row[phoneNoIndex];
        const mode = row[modeIndex];

        // Validate required fields
        if (studentName && parentName && parentEmail && phoneNo && mode) {
          parents.push({
            id: index + 1,
            studentName: String(studentName).trim(),
            parentName: String(parentName).trim(),
            parentEmail: String(parentEmail).trim(),
            phoneNo: String(phoneNo).trim(),
            mode: String(mode).trim().toUpperCase(),
          });
        }
      });

      return parents;
    } catch (error) {
      console.error("Excel parsing error:", error);
      throw new Error(
        "Failed to parse Excel file. Please check the format and try again."
      );
    }
  };

  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }

    result.push(current);
    return result;
  };

  const parseCSV = (csvText: string): Parent[] => {
    const lines = csvText.split("\n").filter((line) => line.trim());
    if (lines.length < 2) return [];

    const headers = parseCSVLine(lines[0]);
    const studentNameIndex = headers.findIndex(
      (h) =>
        h.toLowerCase().includes("student") && h.toLowerCase().includes("name")
    );
    const parentNameIndex = headers.findIndex(
      (h) =>
        h.toLowerCase().includes("parent") && h.toLowerCase().includes("name")
    );
    const parentEmailIndex = headers.findIndex(
      (h) =>
        h.toLowerCase().includes("parent") && h.toLowerCase().includes("email")
    );
    const phoneNoIndex = headers.findIndex(
      (h) =>
        h.toLowerCase().includes("phone") || h.toLowerCase().includes("mobile")
    );
    const modeIndex = headers.findIndex((h) =>
      h.toLowerCase().includes("mode")
    );

    if (
      studentNameIndex === -1 ||
      parentNameIndex === -1 ||
      parentEmailIndex === -1 ||
      phoneNoIndex === -1 ||
      modeIndex === -1
    ) {
      throw new Error(
        "Missing required columns. Please ensure your CSV has: Student Name, Parent Name, Parent Email, Phone No, Mode"
      );
    }

    const parents: Parent[] = [];
    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      if (values.length >= 5) {
        parents.push({
          id: i,
          studentName: values[studentNameIndex]?.trim() || "",
          parentName: values[parentNameIndex]?.trim() || "",
          parentEmail: values[parentEmailIndex]?.trim() || "",
          phoneNo: values[phoneNoIndex]?.trim() || "",
          mode: values[modeIndex]?.trim().toUpperCase() || "",
        });
      }
    }

    return parents;
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
      "application/vnd.ms-excel",
    ];
    if (!validTypes.includes(file.type)) {
      errorToast("Please upload an Excel (.xlsx, .xls) or CSV file");
      return;
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      errorToast("File is too large. Please upload a file smaller than 10MB.");
      return;
    }

    try {
      let parents: Parent[] = [];
      if (file.type.includes("sheet") || file.type.includes("excel")) {
        parents = await parseExcel(file);
      } else {
        const text = await file.text();
        parents = parseCSV(text);
      }

      console.log("Parsed Parents Data:", parents);

      if (parents.length === 0) {
        errorToast(
          "No valid parent data found. Please check the file format and content."
        );
        return;
      }

      const originalCount = parents.length;
      const truncatedParents = parents.slice(0, parentLimit);

      setParents(truncatedParents);
      setOriginalCount(originalCount);
      setUploadedFile(file);

      if (originalCount > parentLimit) {
        errorToast(
          `Found ${originalCount} parents, but only ${parentLimit} were imported due to your current plan.`
        );
      } else {
        successToast(
          `Successfully imported ${truncatedParents.length} parents.`
        );
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Could not read the file. Please check the format and try again.";
      errorToast(errorMessage);
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setParents([]);
    setOriginalCount(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <div className="mt-4">
          <button
            type="button"
            onClick={handleUploadClick}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Click to upload
          </button>
          <p className="text-xs text-gray-500 mt-1">or drag and drop</p>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Excel (.xlsx, .xls) or CSV files up to 10MB
        </p>
        <Input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {uploadedFile && (
        <UploadedFile file={uploadedFile} onRemove={handleRemoveFile} />
      )}
    </div>
  );
}
