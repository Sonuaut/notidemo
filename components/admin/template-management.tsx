"use client";

import type React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import debounce from "lodash/debounce";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Mail,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { isTokenExpired, refreshAccessToken } from "@/lib/auth";
import type { Template } from "@/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Toaster } from "@/components/ui/toaster";
import { TemplateInstructions } from "./template-instructions";

const templateTypes = [
  { name: "Appreciation", color: "0xFF25B166" },
  { name: "Negative", color: "0xFFFF9395" },
  { name: "Neutral", color: "0xFF3B82F6" },
];

const getTemplateTypeFromColor = (color: string) => {
  const normalizedColor = color.toLowerCase();
  if (normalizedColor === "0xff25b166") {
    return "Appreciation";
  } else if (normalizedColor === "0xffff9395") {
    return "Negative";
  } else if (normalizedColor === "0xff3b82f6") {
    return "Neutral";
  }

  return templateTypes[0].name;
};

export default function TemplateManagement() {
  const { toast } = useToast();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "staff" as "staff" | "parent", // Changed from "email" | "sms" to "staff" | "parent"
    subject: "", // Always include subject regardless of type
    content: "",
    color: "black",
    is_active: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const itemsPerPage = 10;

  const [totalPages, setTotalPages] = useState(1);

  // Add this state for current templates
  const [currentTemplates, setCurrentTemplates] = useState<Template[]>([]);

  // Add this state variable
  const [templateToDelete, setTemplateToDelete] = useState<number | null>(null);

  // Add state for template type
  const [selectedTemplateType, setSelectedTemplateType] = useState("Custom");

  // Add state for template type filter
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Add a ref to track if component has mounted
  const didMount = useRef(false);
  useEffect(() => {
    didMount.current = true;
    return () => {
      didMount.current = false;
    };
  }, []);

  // Add a ref to track if we've already fetched data
  const hasFetchedData = useRef(false);

  // Add this state to track if we're currently waiting for a timeout
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  // Single useEffect for initialization
  useEffect(() => {
    // Only fetch if we haven't already
    if (!hasFetchedData.current) {
      console.log("Initial fetch - first and only time");
      hasFetchedData.current = true;
      fetchTemplates();
    }

    // No dependencies - this effect runs exactly once after mount
  }, []);

  useEffect(() => {
    const filtered = templates.filter(
      (template) =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ??
        template.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTemplates(filtered);

    // Only reset to page 1 if the search term changed
    if (searchTerm !== "") {
      setCurrentPage(1);
    } else {
      // If current page is out of range after filtering, set to last page
      const lastPage = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
      if (currentPage > lastPage) {
        setCurrentPage(lastPage);
      }
    }
  }, [searchTerm, templates]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredTemplates.slice(startIndex, endIndex);
    setCurrentTemplates(currentItems);
    setTotalPages(Math.ceil(filteredTemplates.length / itemsPerPage));
  }, [currentPage, filteredTemplates, itemsPerPage]);

  // Memoize the fetchTemplates function to avoid recreating it on every render
  const fetchTemplates = useCallback(async () => {
    console.log("fetchTemplates called with searchTerm:", searchTerm);

    // Set loading state only if we're not already loading
    if (!isLoading) {
      setIsLoading(true);
    }

    try {
      // Check if token is expired and refresh if needed
      if (isTokenExpired("admin")) {
        const refreshed = await refreshAccessToken("admin");
        if (!refreshed) {
          throw new Error("Session expired. Please login again.");
        }
      }

      const token = localStorage.getItem("adminAccessToken");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      // Build query parameters
      const queryParams = new URLSearchParams({
        limit: "100",
        offset: "0",
      });

      // Only add name parameter if searchTerm is not empty
      if (searchTerm && searchTerm.trim() !== "") {
        queryParams.append("name", searchTerm);
      }

      if (typeFilter && typeFilter !== "all") {
        queryParams.append("template_type", typeFilter);
      }

      console.log(
        `Making API call to ${API_URL}/api/v1/templates/get-all?${queryParams.toString()}`
      );

      const response = await fetch(
        `${API_URL}/api/v1/templates/get-all?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "1",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API error response:", errorText);
        throw new Error(`API responded with status ${response.status}`);
      }

      const data = await response.json();

      // Handle "Template Not Found" response
      if (data.status === 200 && data.message === "Template Not Found") {
        // Set empty templates array
        setTemplates([]);
        setFilteredTemplates([]);
        return;
      }

      if (data.status !== 200) {
        throw new Error(data.message ?? "Failed to fetch templates");
      }

      // Transform API data to match our Template interface
      const formattedTemplates: Template[] = data.data.result
        .map((item: any) => ({
          id: item.id,
          name: item.name,
          type: item.type.toLowerCase(), // This should be "staff" or "parent"
          subject: item.subject ?? "",
          content: item.content,
          color: item.template_color
            ? item.template_color.toLowerCase()
            : "black",
          createdDate: new Date(item.created_at).toISOString().split("T")[0],
          sortDate: item.updated_at
            ? new Date(item.updated_at)
            : new Date(item.created_at),
        }))
        .sort(
          (
            a: { sortDate: { getTime: () => number } },
            b: { sortDate: { getTime: () => number } }
          ) => b.sortDate.getTime() - a.sortDate.getTime()
        );
      setTemplates(formattedTemplates);
      setFilteredTemplates(formattedTemplates);

      // After updating templates, keep the current page if possible
      const lastPage = Math.max(
        1,
        Math.ceil(formattedTemplates.length / itemsPerPage)
      );
      if (currentPage > lastPage) {
        setCurrentPage(lastPage);
      }
    } catch (err: any) {
      console.error("Error fetching templates:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message ?? "Failed to load templates",
      });

      setTemplates([]);
      setFilteredTemplates([]);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, typeFilter, isLoading, toast, currentPage, itemsPerPage]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (isTokenExpired("admin")) {
        const refreshed = await refreshAccessToken("admin");
        if (!refreshed) {
          throw new Error("Session expired. Please login again.");
        }
      }

      const token = localStorage.getItem("adminAccessToken");

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      const templateData = {
        name: formData.name,
        content: formData.content,
        type: formData.type,
        subject: formData.subject,
        template_color: formData.color || "0xFF25B166",
        is_active: !!formData.is_active,
      };
      console.log(templateData, "templateData");
      if (editingTemplate) {
        const response = await fetch(
          `${API_URL}/api/v1/templates/?template_id=${editingTemplate.id}`,
          {
            method: "PATCH",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "1",
            },
            body: JSON.stringify(templateData),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("API error response:", errorText);
          throw new Error(`API responded with status ${response.status}`);
        }

        const data = await response.json();

        if (data.status !== 200) {
          throw new Error(data.message ?? "Failed to update template");
        }

        toast({
          title: "Success",
          description: "Template updated successfully!",
        });

        // Refresh templates list
        fetchTemplates();
      } else {
        // Add new template
        const response = await fetch(`${API_URL}/api/v1/templates/`, {
          method: "POST",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "1",
          },
          body: JSON.stringify(templateData),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("API error response:", errorText);
          throw new Error(`API responded with status ${response.status}`);
        }

        const data = await response.json();

        if (data.status !== 201) {
          throw new Error(data.message ?? "Failed to create template");
        }

        toast({
          title: "Success",
          description: "Template created successfully!",
        });

        // Refresh templates list
        fetchTemplates();
      }

      resetForm();
    } catch (err: any) {
      console.error("Error saving template:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message ?? "Failed to save template",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (template: Template) => {
    setEditingTemplate(template);
    setIsDialogOpen(true);
    // formData will be updated by the useEffect that depends on editingTemplate
  };

  const handleDelete = async (id: number) => {
    setIsDeleting(id);

    try {
      // Check if token is expired and refresh if needed
      if (isTokenExpired("admin")) {
        const refreshed = await refreshAccessToken("admin");
        if (!refreshed) {
          throw new Error("Session expired. Please login again.");
        }
      }

      const token = localStorage.getItem("adminAccessToken");

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(
        `${API_URL}/api/v1/templates/?template_id=${id}`,
        {
          method: "DELETE",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "1",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API error response:", errorText);
        throw new Error(`API responded with status ${response.status}`);
      }

      const data = await response.json();

      if (data.status !== 200) {
        throw new Error(data.message ?? "Failed to delete template");
      }

      toast({
        title: "Success",
        description: "Template deleted successfully!",
      });

      setTemplates(templates.filter((template) => template.id !== id));
      setFilteredTemplates(
        filteredTemplates.filter((template) => template.id !== id)
      );
    } catch (err: any) {
      console.error("Error deleting template:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message ?? "Failed to delete template",
      });
    } finally {
      setIsDeleting(null);
      setTemplateToDelete(null);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      type: "staff",
      subject: "",
      content: "",
      color: "",
      is_active: true,
    });
    setEditingTemplate(null);
    setIsDialogOpen(false);
  };

  const handleTemplateTypeChange = (typeName: string) => {
    setSelectedTemplateType(typeName);

    if (typeName !== "Custom") {
      const typeColor =
        templateTypes.find((t) => t.name === typeName)?.color ?? "";
      setFormData({
        ...formData,
        color: typeColor,
      });
    }
  };

  useEffect(() => {
    if (editingTemplate) {
      const typeName = getTemplateTypeFromColor(
        editingTemplate.color.toLowerCase()
      );
      setSelectedTemplateType(typeName);

      const matchingType = templateTypes.find((type) => type.name === typeName);

      setFormData({
        name: editingTemplate.name,
        type: editingTemplate.type as "staff" | "parent",
        is_active: !!editingTemplate.is_active,
        subject: editingTemplate.subject ?? "",
        content: editingTemplate.content,
        color: matchingType ? matchingType.color : templateTypes[0].color,
      });
    } else {
      setSelectedTemplateType(templateTypes[0].name);
      setFormData((prev) => ({
        ...prev,
        color: templateTypes[0].color,
      }));
    }
  }, [editingTemplate]);

  useEffect(() => {
    if (didMount.current) {
      fetchTemplates();
    }
  }, [typeFilter]);

  const debouncedSearch = useCallback(
    debounce(() => {
      if (didMount.current && searchTermChanged.current) {
        fetchTemplates();
        searchTermChanged.current = false;
      }
    }, 500),
    [fetchTemplates]
  );
  const searchTermChanged = useRef(false);

  useEffect(() => {
    debouncedSearch();
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);

    if (!newValue || newValue.trim() === "") {
      fetchAllTemplates();
    } else {
      searchTemplates(newValue);
    }
  };

  const fetchAllTemplates = async () => {
    setIsLoading(true);

    try {
      if (isTokenExpired("admin")) {
        const refreshed = await refreshAccessToken("admin");
        if (!refreshed) {
          throw new Error("Session expired. Please login again.");
        }
      }

      const token = localStorage.getItem("adminAccessToken");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      const queryParams = new URLSearchParams({
        limit: "20",
        offset: "0",
      });

      if (typeFilter && typeFilter !== "all") {
        queryParams.append("template_type", typeFilter);
      }

      const response = await fetch(
        `${API_URL}/api/v1/templates/get-all?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "1",
          },
        }
      );
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const searchTemplates = async (term: string) => {
    try {
      // Check token
      if (isTokenExpired("admin")) {
        const refreshed = await refreshAccessToken("admin");
        if (!refreshed) {
          throw new Error("Session expired. Please login again.");
        }
      }

      const token = localStorage.getItem("adminAccessToken");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      // Include search term
      const queryParams = new URLSearchParams({
        limit: "20",
        offset: "0",
        name: term,
      });

      if (typeFilter && typeFilter !== "all") {
        queryParams.append("template_type", typeFilter);
      }

      const response = await fetch(
        `${API_URL}/api/v1/templates/get-all?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "1",
          },
        }
      );

      // Process response and update state
      // ...
    } catch (err) {
      // Handle errors
      // ...
    }
  };

  <div className="flex-1 flex items-center space-x-2">
    <Search className="h-4 w-4 text-gray-400" />
    <Input
      placeholder="Search templates..."
      value={searchTerm}
      onChange={handleSearchInput}
      className="max-w-sm"
    />
  </div>;

  useEffect(() => {
    fetchAllTemplates();
  }, []);

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="mb-1">Template Management</CardTitle>
              <CardDescription>
                Create and manage email and SMS templates
              </CardDescription>
            </div>

            <div className="flex items-center space-x-3">
              <TemplateInstructions />
              <div className="flex-1 flex items-center space-x-2 relative">
                <Search className="h-4 w-4 text-gray-400 absolute left-4 top-3" />
                <Input
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={handleSearchInput}
                  className="max-w-sm pl-8"
                />
              </div>

              <div className="flex items-center space-x-2">
                {/* <Label htmlFor="typeFilter" className="text-sm">Type:</Label> */}
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All types</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => resetForm()}>
                    <Plus className="h-4 w-4" />
                    Add Template
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>
                      {editingTemplate ? "Edit Template" : "Add New Template"}
                    </DialogTitle>
                    <DialogDescription>
                      {editingTemplate
                        ? "Update template information"
                        : "Create a new email or SMS template"}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => {
                            const regex = /^[A-Za-z\s]*$/;

                            // if (regex.test(e.target.value)) {
                            setFormData({
                              ...formData,
                              name: e.target.value,
                            });
                            // }
                          }}
                          className="col-span-3"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status">Status</Label>
                        <div className="col-span-3 flex items-center gap-2">
                          <Switch
                            id="status"
                            checked={!!formData.is_active}
                            onCheckedChange={(v) =>
                              setFormData({
                                ...formData,
                                is_active: Boolean(v),
                              })
                            }
                          />
                          <span className="text-sm text-gray-600">
                            {formData.is_active ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => {
                            const input = e.target.value;
                            // Remove scripts and emojis, but allow special characters like #, $, etc.
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
                              setFormData((prev) => ({
                                ...prev,
                                subject: sanitized,
                              }));
                            }
                          }}
                          placeholder="Subject"
                          maxLength={150}
                          className="col-span-3"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type">Type</Label>
                        <Select
                          value={formData.type}
                          onValueChange={(value: "staff" | "parent") =>
                            setFormData({ ...formData, type: value })
                          }
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="staff">Staff</SelectItem>
                            <SelectItem value="parent">Parent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="content">Content</Label>
                        <div className="col-span-3 space-y-2">
                          <Textarea
                            id="content"
                            value={formData.content}
                            onChange={(e) => {
                              let input = e.target.value;
                              if (input.length <= 160) {
                                setFormData({ ...formData, content: input });
                              }
                            }}
                            className="min-h-[120px]"
                            placeholder="Template content. Use {{variable}} for dynamic content. (160 character limit, inclusive of spaces and punctuation)"
                            required
                          />
                          <div className="flex justify-end text-sm">
                            <span
                              className={`$
                                {formData.content.length > 160
                                  ? "text-yellow-500"
                                  : "text-muted-foreground"}
                              `}
                            >
                              {formData.content.length}/160 characters
                              {formData.content.length === 160 &&
                                " (limit reached)"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="templateType">Template Type</Label>
                        <Select
                          value={selectedTemplateType}
                          onValueChange={handleTemplateTypeChange}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {templateTypes.map((type) => (
                              <SelectItem key={type.name} value={type.name}>
                                <div className="flex items-center gap-2">
                                  {type.color && (
                                    <div
                                      className="h-3 w-3 rounded-full"
                                      style={{ backgroundColor: type.color }}
                                    />
                                  )}
                                  {type.name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetForm}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {editingTemplate ? "Updating..." : "Creating..."}
                          </>
                        ) : editingTemplate ? (
                          "Update"
                        ) : (
                          "Create"
                        )}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="col-span-4 flex justify-center items-center min-h-[16rem]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Subject/Preview</TableHead>
                      <TableHead>Colour</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentTemplates.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center py-8 text-muted-foreground"
                        >
                          {searchTerm || typeFilter !== "all" ? (
                            <>
                              No templates found matching your search criteria.
                              {searchTerm && (
                                <div className="mt-1">
                                  Try a different search term or clear filters.
                                </div>
                              )}
                            </>
                          ) : (
                            <>No templates found. Create your first template!</>
                          )}
                        </TableCell>
                      </TableRow>
                    ) : (
                      currentTemplates.map((template) => (
                        <TableRow key={template.id}>
                          <TableCell className="font-medium">
                            {template.name}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span>
                                {template.type === "staff" ? "Staff" : "Parent"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              {template.subject}
                              <div
                                title={template.content}
                                className="text-sm text-gray-500 truncate"
                              >
                                {template.content.substring(0, 50)}...
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span>
                                {getTemplateTypeFromColor(template.color)}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {template.createdDate
                              ? formatDate(template.createdDate)
                              : "N/A"}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit(template)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setTemplateToDelete(template.id)}
                                disabled={isDeleting === template.id}
                              >
                                {isDeleting === template.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash2 className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center space-x-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="flex items-center px-4">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <AlertDialog
        open={templateToDelete !== null}
        onOpenChange={(open) => !open && setTemplateToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              template.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                templateToDelete !== null && handleDelete(templateToDelete)
              }
              disabled={isDeleting !== null}
            >
              {isDeleting !== null ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Toaster />
    </>
  );
}
