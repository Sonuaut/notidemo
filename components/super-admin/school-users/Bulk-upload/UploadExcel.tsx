"use client";
import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import UploadedFile from "./UploadedFile";
import readXlsxFile from 'read-excel-file';
import { errorToast, successToast } from "@/components/hooks/use-toast";

interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface UploadExcelProps {
  setTeachers: (teachers: Teacher[]) => void;
  setOriginalCount: (count: number) => void;
  teacherlimit: number;
}

export default function UploadExcel({ setTeachers, setOriginalCount, teacherlimit }: UploadExcelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);


  // Helper function to find column index by matching header names
  const findColumnIndex = (headers: any[], possibleNames: string[]): number => {
    for (let i = 0; i < headers.length; i++) {
      const header = String(headers[i]).trim().toLowerCase();
      if (possibleNames.map(name => name.toLowerCase()).includes(header)) {
        return i;
      }
    }
    return -1; // Column not found
  };

  const parseExcel = async (file: File): Promise<Teacher[]> => {
    try {
      const rows = await readXlsxFile(file);
      const teachers: Teacher[] = [];
      
      if (rows.length < 2) {
        return teachers; // Need at least header + 1 data row
      }
      
      // Get header row and find column indices
      const headerRow = rows[0];
      const nameIndex = findColumnIndex(headerRow, ['teacher_name', 'name', 'Name', 'teacher name', 'Teacher Name']);
      const emailIndex = findColumnIndex(headerRow, ['teacher_email', 'email', 'Email', 'e-mail', 'E-mail']);
      const phoneIndex = findColumnIndex(headerRow, ['teacher_mobile_no', 'phone', 'Phone', 'mobile', 'Mobile', 'contact', 'Contact']);
      
      // Validate that we found all required columns
      if (nameIndex === -1 || emailIndex === -1 || phoneIndex === -1) {
        const missingColumns = [];
        if (nameIndex === -1) missingColumns.push('teacher_name');
        if (emailIndex === -1) missingColumns.push('teacher_email');
        if (phoneIndex === -1) missingColumns.push('teacher_mobile_no');
        
        throw new Error(`Missing required columns: ${missingColumns.join(', ')}. Please ensure your file has the required columns.`);
      }
      
      // Process data rows
      const dataRows = rows.slice(1);
      dataRows.forEach((row: any[], index: number) => {
        const name = row[nameIndex] ? String(row[nameIndex]).trim() : '';
        const email = row[emailIndex] ? String(row[emailIndex]).trim() : '';
        const phone = row[phoneIndex] ? String(row[phoneIndex]).trim() : '';
        
        if (name && email && phone) {
          teachers.push({
            id: index + 1,
            name,
            email,
            phone,
          });
        }
      });
      
      return teachers;
    } catch (error) {
      console.error("Excel parsing error:", error);
      throw new Error('Failed to parse Excel file. Please check the format.');
    }
  };

  const parseCSV = (csvText: string): Teacher[] => {
    const teachers: Teacher[] = [];
    const lines = csvText.split(/\r?\n/).filter(line => line.trim());
    
    if (lines.length < 2) return teachers;
    
    const headerColumns = parseCSVLine(lines[0]);
    const nameIndex = findColumnIndex(headerColumns, ['teacher_name', 'name', 'Name', 'teacher name', 'Teacher Name']);
    const emailIndex = findColumnIndex(headerColumns, ['teacher_email', 'email', 'Email', 'e-mail', 'E-mail']);
    const phoneIndex = findColumnIndex(headerColumns, ['teacher_mobile_no', 'phone', 'Phone', 'mobile', 'Mobile', 'contact', 'Contact']);
    
    if (nameIndex === -1 || emailIndex === -1 || phoneIndex === -1) {
      const missingColumns = [];
      if (nameIndex === -1) missingColumns.push('teacher_name');
      if (emailIndex === -1) missingColumns.push('teacher_email');
      if (phoneIndex === -1) missingColumns.push('teacher_mobile_no');
      throw new Error(`Missing required CSV columns: ${missingColumns.join(', ')}.`);
    }
    
    lines.slice(1).forEach((line, index) => {
      const columns = parseCSVLine(line);
      if (columns.length > Math.max(nameIndex, emailIndex, phoneIndex)) {
        const name = columns[nameIndex]?.trim() || '';
        const email = columns[emailIndex]?.trim() || '';
        const phone = columns[phoneIndex]?.trim() || '';
        
        if (name && email && phone) {
          teachers.push({ id: index + 1, name, email, phone });
        }
      }
    });
    
    return teachers;
  };

  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);
    return result;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "text/csv", "application/vnd.ms-excel"];
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
      let teachers: Teacher[] = [];
      if (file.type.includes('sheet') || file.type.includes('excel')) {
        teachers = await parseExcel(file);
      } else {
        const text = await file.text();
        teachers = parseCSV(text);
      }
      
      console.log("Parsed Teacher Data:", teachers);

      if (teachers.length === 0) {
        errorToast("No valid teacher data found. Please check the file format and content.");
        return;
      }

      const originalCount = teachers.length;
      const truncatedTeachers = teachers.slice(0, teacherlimit);
      
      setTeachers(truncatedTeachers);
      setOriginalCount(originalCount);
      setUploadedFile(file);
      
      if (originalCount > teacherlimit) {
        errorToast(`Found ${originalCount} teachers, but only ${teacherlimit} were imported due to your current plan.`);
      } else {
        successToast(`Successfully imported ${truncatedTeachers.length} teachers.`);  
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Could not read the file. Please check the format and try again.";
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
    setTeachers([]);
    setOriginalCount(0);
    setUploadedFile(null);
  };

  return (
    <div className="relative">
      <Input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={handleFileUpload}
        className="hidden"
      />
      
      {!uploadedFile ? (
        <div 
          onClick={handleUploadClick}
          className="border-2 border-dashed border-blue-200 hover:border-blue-300 rounded-xl p-8 cursor-pointer transition-all duration-200 hover:bg-blue-50/50 group"
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <Upload className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Upload Teacher Data
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Drag & drop or click to browse for an Excel or CSV file.
            </p>
            <div className="text-xs text-gray-400 mt-2 space-y-1">
              <p>Required columns: teacher_name, teacher_email, teacher_mobile_no</p>
              <p>The first row must contain headers.</p>
              <p>Supports: .xlsx, .xls, and .csv files.</p>
              <p className="text-blue-600 font-medium">A maximum of {teacherlimit} teachers will be imported.</p>
            </div>
          </div>
        </div>
      ) : (
        <UploadedFile uploadedFile={uploadedFile} handleUploadClick={handleUploadClick} handleRemoveFile={handleRemoveFile} />
      )}
    </div>
  );
}
