"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CommonButton from "@/components/common/Button";
import { assignTemplateToUsersAction } from "@/actions/super-admin/template";
import { type Template } from "@/lib/superadmin/template";
import { type TeacherData } from "@/lib/superadmin/teacher";
import { Checkbox } from "@/components/ui/checkbox";
import { paginationLimit } from "@/types";
import { successToast } from "@/components/hooks/use-toast";
import { Search, Filter, XCircle } from "lucide-react";

export default function AssignTemplatesToTeacherDialog({
  teacherId,
  teacherData,
  children,
}: {
  teacherId: number;
  teacherData?: TeacherData;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (!open) return;
    setError(null);

    const fetchTemplatesFromAPI = async () => {
      try {
        const response = await fetch(
          `/api/templates?limit=${paginationLimit.LIMIT_50}&is_custom=true`
        );
        const data = await response.json();

        if (data.success) {
          setTemplates(data.templates || []);

          // Preselect templates based on teacher's template_mappings
          if (teacherData?.template_mappings) {
            const preselectedIds = new Set(
              teacherData.template_mappings.map(
                (mapping) => mapping.template_id
              )
            );
            setSelected(preselectedIds);
          }
        } else {
          setError(data.error || "Failed to fetch templates");
        }
      } catch (err) {
        setError("Failed to fetch templates");
        console.error("Error fetching templates:", err);
      }
    };

    fetchTemplatesFromAPI();
  }, [open, teacherData]);

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return templates;
    return templates.filter(
      (t) =>
        (t.name || "").toLowerCase().includes(q) ||
        (t.subject || "").toLowerCase().includes(q)
    );
  }, [filter, templates]);

  const toggleAll = (checked: boolean) => {
    if (checked) setSelected(new Set(filtered.map((t) => t.id)));
    else setSelected(new Set());
  };

  const toggleOne = (id: number, checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const assign = async () => {
    if (selected.size === 0) return;
    setLoading(true);
    setError(null);

    const templateIds = Array.from(selected);
    const res = await assignTemplateToUsersAction({
      user_ids: [teacherId],
      template_ids: templateIds,
    });
    if (!res.success) {
      setError((res as any)?.error || "Failed to assign some templates");
      setLoading(false);
      return;
    }
    setLoading(false);
    setOpen(false);
    successToast("Templates assigned successfully");
  };

  console.log("filtered templates", filtered);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-6xl w-[95vw] max-h-[90vh] flex flex-col bg-white ">
        <DialogHeader className="pb-0 border-none ">
          <DialogTitle className="text-2xl font-semibold text-gray-900 flex items-center gap-3">
            <Filter className="w-6 h-6 text-blue-600" />
            Assign Custom Templates to Teacher
          </DialogTitle>
          <p className="text-sm text-gray-600 mt-2">
            Select the custom templates you want to assign to this teacher
          </p>
        </DialogHeader>

        <div className="w-full">
          <div className="w-full relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              placeholder="Search templates by name or subject..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-700">
              <XCircle className="w-5 h-5" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          </div>
        )}

        <div className="">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Checkbox
                id="selectAll"
                checked={selected.size > 0 && selected.size === filtered.length}
                onCheckedChange={(val) => toggleAll(Boolean(val))}
                className="w-5 h-5 border-2 border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <label
                htmlFor="selectAll"
                className="text-sm font-medium text-gray-700"
              >
                Select all custom templates ({filtered.length})
              </label>
            </div>
            {selected.size > 0 && (
              <div className="text-sm text-blue-600 font-medium">
                {selected.size} template{selected.size !== 1 ? "s" : ""}{" "}
                selected
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto border border-gray-200 rounded-lg">
          <section className="w-full flex items-center bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 sticky top-0 z-10">
            <div className="w-[10%] px-6 py-3"></div>
            <div className="w-[25%] px-4 py-3 text-left font-semibold text-gray-700 text-sm uppercase tracking-wide">
              Template Name
            </div>
            <div className="w-[10%] px-4 py-3 text-left font-semibold text-gray-700 text-sm uppercase tracking-wide">
              Type
            </div>
            <div className="w-[40%] px-4 py-3 text-left font-semibold text-gray-700 text-sm uppercase tracking-wide">
              Subject
            </div>
            <div className="w-[15%] text-left font-semibold text-gray-700 text-sm uppercase tracking-wide">
              Category
            </div>
          </section>

          <section className="w-full overflow-y-auto">
            {filtered.map((t, index) => {
              const isSelected = selected.has(t.id);

              return (
                <div
                  key={t.id}
                  className={`w-full flex items-center border-b border-gray-100 transition-all duration-200 hover:bg-gray-50 ${
                    isSelected
                      ? "bg-blue-50 border-blue-200"
                      : index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50"
                  }`}
                >
                  <div className="w-[10%] px-6 py-3">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(val) => toggleOne(t.id, Boolean(val))}
                      className="w-5 h-5 border-2 border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                  </div>
                  <div className="w-[25%] px-4 py-3">
                    <div className="font-medium text-gray-900">{t.name}</div>
                  </div>
                  <div className="w-[10%] px-4 py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                      {t.type}
                    </span>
                  </div>
                  <div className="w-[40%] px-4 py-3">
                    <div className="text-gray-700 truncate" title={t.subject}>
                      {t.subject}
                    </div>
                  </div>

                  <div className="w-[15%]">
                    <span
                      className={`gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        t.is_custom
                          ? "bg-green-300 text-green-800 border border-green-200"
                          : "bg-gray-100 text-gray-800 border border-gray-200"
                      }`}
                    >
                      {t.is_custom ? "Custom" : "Non Custom"}
                    </span>
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div className="px-6 py-12 text-center">
                <div className="text-gray-500 text-lg font-medium">
                  No custom templates found
                </div>
                <p className="text-gray-400 text-sm mt-2">
                  Try adjusting your search criteria or check if custom
                  templates exist
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 mt-6">
          <CommonButton
            variant="secondary"
            onClick={() => setOpen(false)}
            disabled={loading}
            className="px-6 py-3 h-12 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
          >
            Cancel
          </CommonButton>
          <CommonButton
            onClick={assign}
            loading={loading}
            disabled={selected.size === 0}
            className="px-6 py-3 h-12 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Assign {selected.size > 0 ? `(${selected.size})` : ""} Template
            {selected.size !== 1 ? "s" : ""}
          </CommonButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
