"use client";
import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import UploadedFile from "./UploadedFile";
import readXlsxFile from "read-excel-file";
import { errorToast, successToast } from "@/components/hooks/use-toast";

interface Staff {
  id: number;
  teacher_name: string;
  teacher_email: string;
  phone_no: string;
}

interface UploadExcelProps {
  setStaff: (staff: Staff[]) => void;
  setOriginalCount: (count: number) => void;
  staffLimit: number;
}

export default function UploadStaffExcel({
  setStaff,
  setOriginalCount,
  staffLimit,
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

  const parseExcel = async (file: File): Promise<Staff[]> => {
    try {
      const rows = await readXlsxFile(file);
      const staff: Staff[] = [];

      if (rows.length < 2) {
        return staff; // Need at least header + 1 data row
      }

      // Get header row and find column indices
      const headerRow = rows[0];
      const teacherNameIndex = findColumnIndex(headerRow, [
        "teacher_name",
        "teacher name",
        "Teacher Name",
        "teachername",
        "teacherName",
      ]);
      const teacherEmailIndex = findColumnIndex(headerRow, [
        "teacher_email",
        "teacher email",
        "Teacher Email",
        "teacheremail",
        "teacherEmail",
      ]);
      const phoneNoIndex = findColumnIndex(headerRow, [
        "phone_no",
        "phone no",
        "Phone No",
        "phone",
        "Phone",
        "mobile",
        "Mobile",
        "contact",
        "Contact",
      ]);

      // Validate that we found all required columns
      if (
        teacherNameIndex === -1 ||
        teacherEmailIndex === -1 ||
        phoneNoIndex === -1
      ) {
        const missingColumns = [];
        if (teacherNameIndex === -1) missingColumns.push("Teacher Name");
        if (teacherEmailIndex === -1) missingColumns.push("Teacher Email");
        if (phoneNoIndex === -1) missingColumns.push("Phone No");

        throw new Error(
          `Missing required columns: ${missingColumns.join(
            ", "
          )}. Please ensure your file has the required columns: teacher name, teacher email, phone no.`
        );
      }

      // Process data rows
      const dataRows = rows.slice(1);
      dataRows.forEach((row: any[], index: number) => {
        const teacherName = row[teacherNameIndex];
        const teacherEmail = row[teacherEmailIndex];
        const phoneNo = row[phoneNoIndex];

        // Validate required fields
        if (teacherName && teacherEmail && phoneNo) {
          staff.push({
            id: index + 1,
            teacher_name: String(teacherName).trim(),
            teacher_email: String(teacherEmail).trim(),
            phone_no: String(phoneNo).trim(),
          });
        }
      });

      return staff;
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

  const parseCSV = (csvText: string): Staff[] => {
    const lines = csvText.split("\n").filter((line) => line.trim());
    if (lines.length < 2) return [];

    const headers = parseCSVLine(lines[0]);
    const teacherNameIndex = headers.findIndex(
      (h) =>
        h.toLowerCase().includes("teacher") && h.toLowerCase().includes("name")
    );
    const teacherEmailIndex = headers.findIndex(
      (h) =>
        h.toLowerCase().includes("teacher") && h.toLowerCase().includes("email")
    );
    const phoneNoIndex = headers.findIndex(
      (h) =>
        h.toLowerCase().includes("phone") || h.toLowerCase().includes("mobile")
    );

    if (
      teacherNameIndex === -1 ||
      teacherEmailIndex === -1 ||
      phoneNoIndex === -1
    ) {
      throw new Error(
        "Missing required columns. Please ensure your CSV has: teacher name, teacher email, phone no"
      );
    }

    const staff: Staff[] = [];
    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      if (values.length >= 3) {
        staff.push({
          id: i,
          teacher_name: values[teacherNameIndex]?.trim() || "",
          teacher_email: values[teacherEmailIndex]?.trim() || "",
          phone_no: values[phoneNoIndex]?.trim() || "",
        });
      }
    }

    return staff;
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
      let staff: Staff[] = [];
      if (file.type.includes("sheet") || file.type.includes("excel")) {
        staff = await parseExcel(file);
      } else {
        const text = await file.text();
        staff = parseCSV(text);
      }

      console.log("Parsed Staff Data:", staff);

      if (staff.length === 0) {
        errorToast(
          "No valid staff data found. Please check the file format and content."
        );
        return;
      }

      const originalCount = staff.length;
      const truncatedStaff = staff.slice(0, staffLimit);

      setStaff(truncatedStaff);
      setOriginalCount(originalCount);
      setUploadedFile(file);

      if (originalCount > staffLimit) {
        errorToast(
          `Found ${originalCount} staff members, but only ${staffLimit} were imported due to your current plan.`
        );
      } else {
        successToast(
          `Successfully imported ${truncatedStaff.length} staff members.`
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
    setStaff([]);
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
