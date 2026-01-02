import PageHeader from "@/components/common/PageHeader";
import { cn } from "@/lib/utils";
import { FormMode } from "@/types";
import CreateAndUpdateTemplateDialog from "./CreateAndUpdateTemplateDialog";

export default function TemplateHeader({className}:{className?:string}) {
  return (
    <section className={cn("flex justify-between items-center h-16 px-6 border-b border-gray-200",className)}>
      <PageHeader label="Templates" />
      <CreateAndUpdateTemplateDialog mode={FormMode.CREATE} />
    </section>
  );
} 