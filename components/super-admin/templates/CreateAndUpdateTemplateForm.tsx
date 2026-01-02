"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { FormMode, Template } from "@/types";
import {
  createTemplateAction,
  updateTemplateAction,
} from "@/actions/super-admin/templates";
import { errorToast, successToast } from "@/components/hooks/use-toast";
import CommonButton from "@/components/common/Button";

const templateTypes = [
  {
    name: "Appreciation",
    color: "0xFF25B166",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    borderColor: "border-green-200",
  },
  {
    name: "Negative",
    color: "0xFFFF9395",
    bgColor: "bg-red-50",
    textColor: "text-red-700",
    borderColor: "border-red-200",
  },
  {
    name: "Neutral",
    color: "0xFF3B82F6",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
  },
];

interface TemplateFormData {
  name: string;
  subject: string;
  type: string;
  content: string;
  template_color: string;
  is_custom: boolean;
  is_active: boolean;
}

interface CreateAndUpdateTemplateFormProps {
  mode: FormMode;
  templateData?: Template;
  onSuccess: (success: boolean) => void;
  className?: string;
}

const getTemplateTypeFromColor = (color: string) => {
  const normalizedColor = color?.toLowerCase();

  if (normalizedColor === "0xff25b166") {
    return "Appreciation";
  } else if (normalizedColor === "0xffff9395") {
    return "Negative";
  } else if (normalizedColor === "0xff3b82f6") {
    return "Neutral";
  }

  return templateTypes[0].name;
};

export default function CreateAndUpdateTemplateForm({
  mode,
  templateData,
  onSuccess,
  className,
}: CreateAndUpdateTemplateFormProps) {
  console.log("template color :",templateData)
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTemplateType, setSelectedTemplateType] = useState(
    templateData
      ? getTemplateTypeFromColor(templateData.template_color)
      : templateTypes[0].name
  );

  const [formData, setFormData] = useState<TemplateFormData>({
    name: templateData?.name || "",
    subject: templateData?.subject || "",
    type: templateData?.type || "staff",
    content: templateData?.content || "",
    template_color: templateData?.template_color || templateTypes[0].color,
    is_custom: templateData?.is_custom || false,
    is_active: templateData ? (templateData.is_active as boolean) : true,
  });

  const isCreateMode = mode === FormMode.CREATE;

  const handleTemplateTypeChange = (typeName: string) => {
    setSelectedTemplateType(typeName);

    const typeColor =
      templateTypes.find((t) => t.name === typeName)?.color ||
      templateTypes[0].color;
    setFormData({
      ...formData,
      template_color: typeColor,
    });
  };

  const handleCustomToggle = (checked: boolean) => {
    setFormData({
      ...formData,
      is_custom: checked,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let result;

      if (isCreateMode) {
        // For create, use template_subject
        const createPayload = {
          ...formData,
          template_subject: formData.subject,
        };
        result = await createTemplateAction(createPayload);
      } else {
        if (!templateData?.id) {
          throw new Error("Template ID is required for update");
        }

        // For update, use subject
        const updatePayload = {
          ...formData,
          template_id: templateData.id,
        };
        result = await updateTemplateAction(updatePayload);
      }

      if (result.success) {
        successToast(
          `Template ${isCreateMode ? "created" : "updated"} successfully!`
        );
        onSuccess(true);
      } else {
        errorToast(
          result.error ||
            `Failed to ${isCreateMode ? "create" : "update"} template`
        );
      }
    } catch (error) {
      console.error("Form submit error:", error);
      errorToast(
        `An error occurred while ${
          isCreateMode ? "creating" : "updating"
        } the template`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const selectedTypeData =
    templateTypes.find((t) => t.name === selectedTemplateType) ||
    templateTypes[0];

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Template Name */}
          <div className="space-y-1">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Template Name *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  name: e.target.value,
                });
              }}
              className="h-10 focus:ring-2 focus:ring-[#8D8EF5] focus:border-[#8D8EF5]"
              placeholder="Enter template name"
              required
            />
          </div>

          {/* Recipient Type */}
          <div className="space-y-1">
            <Label htmlFor="type" className="text-sm font-medium text-gray-700">
              Recipient Type *
            </Label>
            <Select
              value={formData.type}
              onValueChange={(value: string) =>
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger className="h-10 focus:ring-2 focus:ring-[#8D8EF5] focus:border-[#8D8EF5]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="staff">Staff</SelectItem>
                <SelectItem value="parent">Parent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Subject */}
          <div className="space-y-1">
            <Label
              htmlFor="subject"
              className="text-sm font-medium text-gray-700"
            >
              Subject Line *
            </Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => {
                const input = e.target.value;
                // Remove scripts and emojis
                const sanitized = input
                  .replace(
                    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
                    ""
                  ) // Remove script tags
                  .replace(/javascript:/gi, "") // Remove javascript: protocol
                  .replace(/on\w+\s*=/gi, "") // Remove event handlers
                  .replace(
                    /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu,
                    ""
                  ) // Remove emojis
                  .replace(
                    /[\u{1F900}-\u{1F9FF}]|[\u{1FA70}-\u{1FAFF}]|[\u{1FAB0}-\u{1FABF}]|[\u{1FAC0}-\u{1FAFF}]|[\u{1FAD0}-\u{1FAFF}]|[\u{1FAE0}-\u{1FAFF}]|[\u{1FAF0}-\u{1FAFF}]/gu,
                    ""
                  ); // Remove more emojis

                if (sanitized.length <= 150) {
                  setFormData({
                    ...formData,
                    subject: sanitized,
                  });
                }
              }}
              placeholder="Enter subject line"
              maxLength={150}
              className="h-10 focus:ring-2 focus:ring-[#8D8EF5] focus:border-[#8D8EF5]"
              required
            />
            <p className="text-xs text-gray-500">
              {formData.subject.length}/150 characters
            </p>
          </div>
          {/* Template Type */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1 col-span-2">
              <Label
                htmlFor="templateType"
                className="text-sm font-medium text-gray-700"
              >
                Template Type *
              </Label>
              <Select
                value={selectedTemplateType}
                onValueChange={handleTemplateTypeChange}
              >
                <SelectTrigger className="h-10 focus:ring-2 focus:ring-[#8D8EF5] focus:border-[#8D8EF5]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {templateTypes.map((type) => (
                    <SelectItem key={type.name} value={type.name}>
                      <div className="flex items-center space-x-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{
                            backgroundColor: type.color.replace("0xFF", "#"),
                          }}
                        />
                        <span>{type.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-sm font-medium text-gray-700">
                Preview
              </Label>
              <div className="h-10 flex items-center">
                <Badge
                  className={` w-[90%]  h-8 flex justify-center items-center  ${selectedTypeData.bgColor}  ${selectedTypeData.borderColor} border `}
                >
                  <Label
                    className={`text-sm font-medium ${selectedTypeData.textColor} text-center `}
                  >
                    {selectedTemplateType}
                  </Label>
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Status Switches */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Is Custom */}
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium text-gray-700">
                Custom Template
              </Label>
              <p className="text-xs text-gray-500">
                {formData.is_custom 
                  ? "This is a custom template" 
                  : "This is a standard template"
                }
              </p>
            </div>
            <Switch
              checked={formData.is_custom}
              onCheckedChange={handleCustomToggle}
              disabled={false}
            />
          </div>

          {/* Is Active */}
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium text-gray-700">
                Active Status
              </Label>
              <p className="text-xs text-gray-500">Enable/disable template</p>
            </div>
            <Switch
              checked={formData.is_active}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, is_active: checked })
              }
              disabled={false}
            />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-1">
          <Label
            htmlFor="content"
            className="text-sm font-medium text-gray-700"
          >
            Message Content *
          </Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => {
              const input = e.target.value;
              // Remove only scripts, allow emojis
              const sanitized = input
                .replace(
                  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
                  ""
                ) // Remove script tags
                .replace(/javascript:/gi, "") // Remove javascript: protocol
                .replace(/on\w+\s*=/gi, ""); // Remove event handlers

              if (sanitized.length <= 160) {
                setFormData({ ...formData, content: sanitized });
              }
            }}
            className="min-h-[100px] focus:ring-2 focus:ring-[#8D8EF5] focus:border-[#8D8EF5] resize-none"
            placeholder="Enter template content. Use {{variable}} for personalization. Emojis are allowed! 😊"
            required
          />
          <div className="flex justify-end">
            <span
              className={`text-xs font-medium ${
                formData.content.length > 160
                  ? "text-red-500"
                  : formData.content.length > 140
                  ? "text-yellow-500"
                  : "text-gray-500"
              }`}
            >
              {formData.content.length}/160
            </span>
          </div>
        </div>
        {/* Form Actions */}
        <div className="flex justify-end space-x-3 ">
          <Button
            type="button"
            variant="outline"
            onClick={() => onSuccess(false)}
            disabled={isLoading}
            className="px-4 py-2"
          >
            Cancel
          </Button>
          <CommonButton
            type="submit"
            loading={isLoading}
            disabled={isLoading}
            className="px-6 h-10 py-2 bg-[#8D8EF5] text-white hover:bg-[#8D8EF5]/90"
          >
            {isCreateMode ? "Create" : "Update"}
          </CommonButton>
        </div>
      </form>
    </div>
  );
}
