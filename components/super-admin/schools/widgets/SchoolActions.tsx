import React from "react";
import EditSchool from "./EditSchool";
import GoToSchoolLink from "./GoToSchoolLink";
import AssignTemplatesToSchoolDialog from "../AssignTemplatesToSchoolDialog";
import { Button } from "@/components/ui/button";
import { School } from "@/types";
import { Trash2 } from "lucide-react";

export default function SchoolActions({
  schoolData,
  onDelete,
}: {
  schoolData: School;
  onDelete: () => void;
}) {
  const isSubscriptionActive = schoolData?.subscription?.is_active;
  return (
    <section className="w-full flex items-center md:justify-center gap-2 ">
      <GoToSchoolLink schoolData={schoolData} />
      <EditSchool schoolData={schoolData} editingSchool={true} />
      <AssignTemplatesToSchoolDialog schoolId={schoolData.id}>
        <Button
          variant="ghost"
          size="sm"
          disabled={!isSubscriptionActive}
          className="h-8 px-2 py-1 rounded-md border text-[#8D8EF5] hover:bg-[#8D8EF5]/10"
        >
          Assign Templates
        </Button>
      </AssignTemplatesToSchoolDialog>
      <Button
        variant="ghost"
        size="icon"
        onClick={onDelete}
        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </section>
  );
}
