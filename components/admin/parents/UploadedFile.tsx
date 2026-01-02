import { Button } from "@/components/ui/button";
import { Check, FileSpreadsheet, X } from "lucide-react";
import React from "react";

interface UploadedFileProps {
  file: File;
  onRemove: () => void;
}

export default function UploadedFile({ file, onRemove }: UploadedFileProps) {
  return (
    <div className="border border-green-200 bg-green-50 rounded-xl px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
            <FileSpreadsheet className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-gray-900 text-sm">{file.name}</p>
            <p className="text-xs text-green-600 flex items-center gap-1">
              <Check className="h-3 w-3" />
              Ready to process
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onRemove}
            className="text-red-600 hover:text-red-700 rounded-lg"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
