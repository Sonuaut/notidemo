"use client";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Label } from "@/components/common/Label";
import { IRole } from "@/types";
import { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Users, Loader2 } from "lucide-react";
import ParentsBulkUpload from "@/components/admin/parents/ParentsBulkUpload";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCookie } from "@/actions/cookie";
import { ICookiesKey } from "@/types";
import TablePagination from "@/components/common/TablePagination";
import { useSearchParams } from "next/navigation";

interface Parent {
  id: number;
  student_name: string;
  parent_name: string;
  parent_email: string;
  parent_phone_no: string;
  mode: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

interface ParentsResponse {
  status: number;
  message: string;
  data: {
    contacts: Parent[];
    pagination: {
      total_contacts: number;
      limit: number;
      offset: number;
      total_pages: number;
      next: string | null;
      previous: string | null;
    };
  };
}

function ParentsPageContent() {
  console.log("🏗️ ParentsPageContent component rendering");

  const searchParams = useSearchParams();
  const [bulkUploadOpen, setBulkUploadOpen] = useState(false);
  const [parents, setParents] = useState<Parent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    total_contacts: 0,
    limit: 20,
    offset: 0,
    total_pages: 0,
    next: null as string | null,
    previous: null as string | null,
  });

  // Get current offset from URL params
  const currentOffset = parseInt(searchParams.get("offset") || "0");

  const fetchParents = async () => {
    try {
      console.log("🔄 Starting to fetch parents...");
      setLoading(true);
      setError(null);

      const token = await getCookie(ICookiesKey.AUTHTOKEN);
      console.log("🔑 Token retrieved:", token ? "✅ Found" : "❌ Not found");

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "https://api.mynotifly.com";
      const fullUrl = `${apiUrl}/api/v1/contacts/get-all?limit=20&offset=${currentOffset}`;
      console.log("🌐 Making API call to:", fullUrl);

      const response = await fetch(fullUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "1",
        },
      });

      console.log("📡 Response status:", response.status);
      console.log(
        "📡 Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ API Error Response:", errorText);
        throw new Error(
          `API responded with status ${response.status}: ${errorText}`
        );
      }

      const data: ParentsResponse = await response.json();
      console.log("📊 API Response data:", data);

      setParents(data.data.contacts || []);
      setPagination({
        total: data.data.pagination?.total_contacts || 0,
        total_contacts: data.data.pagination?.total_contacts || 0,
        limit: data.data.pagination?.limit || 20,
        offset: data.data.pagination?.offset || 0,
        total_pages: data.data.pagination?.total_pages || 0,
        next: data.data.pagination?.next || null,
        previous: data.data.pagination?.previous || null,
      });
      console.log("✅ Parents data set successfully");
    } catch (err) {
      console.error("❌ Error fetching parents:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch parents");
    } finally {
      setLoading(false);
      console.log("🏁 Loading completed");
    }
  };

  useEffect(() => {
    console.log("🎯 useEffect triggered - calling fetchParents");
    fetchParents();
  }, [currentOffset]);

  const handleParentsAdded = () => {
    // Refresh parents list after successful upload
    fetchParents();
    console.log("Parents added successfully");
  };

  return (
    <AdminLayout type={IRole.ADMIN} className="md:p-0">
      {/* Header */}
      <div className="flex items-center justify-between h-16 border-b border-gray-200 px-6">
        <div className="flex items-center space-x-3">
          <Label className="text-2xl font-bold text-gray-900">
            Parents Management
          </Label>
          <Label className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#E0E7FF] text-[#6366F1]">
            Admin
          </Label>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => setBulkUploadOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Upload className="h-4 w-4 mr-2" />
            Bulk Upload Parents
          </Button>
        </div>
      </div>

      <div className="w-full space-y-6 text-inter font-inter px-6 py-9">
        {/* Parents Table */}
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                Parents ({pagination.total_contacts || pagination.total})
              </h3>
              <Button
                onClick={fetchParents}
                variant="outline"
                size="sm"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : null}
                Refresh
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <Loader2 className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-spin" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Loading Parents...
                </h3>
                <p className="text-gray-500">
                  Please wait while we fetch the parent data.
                </p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-red-500 mb-4">
                  <Users className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Error Loading Parents
                  </h3>
                  <p className="text-gray-500 mb-6">{error}</p>
                  <Button
                    onClick={fetchParents}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            ) : parents.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Parents Found
                </h3>
                <p className="text-gray-500 mb-6">
                  No parents have been created yet. Upload parents using the
                  bulk upload feature to get started.
                </p>
                <Button
                  onClick={() => setBulkUploadOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Parents
                </Button>
              </div>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Parent Name</TableHead>
                      <TableHead>Parent Email</TableHead>
                      <TableHead>Phone No</TableHead>
                      <TableHead>Mode</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {parents.map((parent) => (
                      <TableRow key={parent.id}>
                        <TableCell>{parent.student_name}</TableCell>
                        <TableCell>{parent.parent_name}</TableCell>
                        <TableCell>{parent.parent_email}</TableCell>
                        <TableCell>{parent.parent_phone_no}</TableCell>
                        <TableCell>{parent.mode}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Pagination */}
            {parents.length > 0 && (
              <TablePagination total={pagination.total_contacts} />
            )}
          </div>
        </div>
      </div>

      {/* Bulk Upload Dialog */}
      <ParentsBulkUpload
        open={bulkUploadOpen}
        onOpenChange={setBulkUploadOpen}
        onParentsAdded={handleParentsAdded}
      />
    </AdminLayout>
  );
}

export default function ParentsPage() {
  return (
    <Suspense
      fallback={
        <AdminLayout type="admin">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex items-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Loading parents...</span>
            </div>
          </div>
        </AdminLayout>
      }
    >
      <ParentsPageContent />
    </Suspense>
  );
}
