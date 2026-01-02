import { FormMode } from "@/types";
import { Template } from "@/lib/superadmin/template";
import CreateAndUpdateTemplateDialog from "./CreateAndUpdateTemplateDialog";
import DeleteTemplateDialog from "./DeleteTemplateDialog";
import StatusSwitcher from "./StatusSwitcher";
import { fetchTemplates } from "@/lib/superadmin/template";
import CustomTemplateSwitcher from "./CustomTemplateSwitcher";

interface TemplateTableProps {
  templates: Template[];
}

export default async function TemplateTable({ templates }: TemplateTableProps) {
  const getTemplateTypeFromColor = (color: string) => {
    const normalizedColor = color.toLowerCase();
    
    if (normalizedColor === "0xff25b166") {
      return "Appreciation";
    } else if (normalizedColor === "0xffff9395") {
      return "Negative";
    } else if (normalizedColor === "0xff3b82f6") {
      return "Neutral";
    }
    return "Custom";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full shadow-xl rounded-b-xl border border-[#E0E0E0] overflow-hidden">
      {/* Header Section */}
      <section className="w-full flex items-center ">
        <div className="w-[17%] text-left px-6 py-5 font-medium text-sm">Name</div>
        <div className="w-[8%] text-left px-4 py-5 font-medium text-sm">Type</div>
        <div className="w-[20%] text-left  py-5 font-medium text-sm">Subject</div>
        <div className="w-[10%] text-left px-4 py-5 font-medium text-sm">Template Type</div>
        <div className="w-[15%] text-left px-4 py-5 font-medium text-sm">Custom</div>
        <div className="w-[10%] text-left px-4 py-5 font-medium text-sm">Status</div>
        <div className="w-[10%] text-left px-4 py-5 font-medium text-sm">Created</div>
        <div className="w-[10%] text-left px-4 py-5 font-medium text-sm">Actions</div>
      </section>

      {/* Body Section */}
      <section className="w-full">
        {templates.length === 0 ? (
          <div className="text-center border-t py-4 text-muted-foreground px-6">
            No templates found
          </div>
        ) : (
          templates.map((template: Template, index: number) => (
            <div 
              key={template.id} 
              className={`w-full flex items-center last:border-b-0 ${
                index % 2 === 0 ? 'bg-[#F6F6FF]' : 'bg-white'
              }`}
            >
              <div className="w-[17%] px-6 py-4 font-medium">
                {template.name}
              </div>
              <div className="w-[8%] p-4 capitalize">
                {template.type === "staff" ? "Staff" : "Parent"}
              </div>
              <div className="w-[20%] py-4">
                <div className="">
                  <div className="font-medium truncate">{template.subject}</div>
                  <div className="text-sm text-gray-500 truncate" title={template.content}>
                    {template.content}
                  </div>
                </div>
              </div>
              <div className="w-[10%] p-4">
                <div className="flex items-center space-x-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: template.template_color.replace("0XFF", "#"),
                    }}
                  />
                  <span className="text-sm font-medium capitalize">
                    {getTemplateTypeFromColor(template.template_color)}
                  </span>
                </div>
              </div>
              <div className="w-[15%] p-4">
                <CustomTemplateSwitcher
                  templateId={template.id}
                  isCustom={template.is_custom}
                />
              </div>
              <div className="w-[10%] p-4">
                <StatusSwitcher 
                  templateId={template.id} 
                  isActive={template.is_active as boolean} 
                />
              </div>
              <div className="w-[10%] p-4">
                {formatDate(template.createdDate)}
              </div>
              <div className="w-[10%] p-4">
                <div className="flex space-x-6">
                  <CreateAndUpdateTemplateDialog
                    mode={FormMode.UPDATE}
                    templateData={template}
                  />
                  <DeleteTemplateDialog templateId={template.id} templateName={template.name} />
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
} 