"use client";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Label } from "@/components/common/Label";
import { IRole } from "@/types";
import { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Users, Loader2 } from "lucide-react";
import StaffBulkUpload from "@/components/admin/staff/StaffBulkUpload";
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

interface Staff {
  id: number;
  staff_name: string;
  staff_email: string;
  staff_phone_no: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

interface StaffResponse {
  status: number;
  message: string;
  data?: {
    contacts: Staff[];
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

function StaffPageContent() {
  console.log("🏗️ StaffPageContent component rendering");

  const searchParams = useSearchParams();
  const [bulkUploadOpen, setBulkUploadOpen] = useState(false);
  const [staff, setStaff] = useState<Staff[]>([]);
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

  const fetchStaff = async () => {
    try {
      console.log("🔄 Starting to fetch staff...");
      setLoading(true);
      setError(null);

      const token = await getCookie(ICookiesKey.AUTHTOKEN);
      console.log("🔑 Token retrieved:", token ? "✅ Found" : "❌ Not found");

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "https://api.mynotifly.com";
      const fullUrl = `${apiUrl}/api/v1/staff/?limit=20&offset=${currentOffset}`;
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

      const data: StaffResponse = await response.json();
      console.log("📊 API Response data:", data);

      // Handle case when no staff members are found
      if (data?.data?.contacts) {
        setStaff(data.data.contacts);
        setPagination({
          total: data.data.pagination?.total_contacts || 0,
          total_contacts: data.data.pagination?.total_contacts || 0,
          limit: data.data.pagination?.limit || 20,
          offset: data.data.pagination?.offset || 0,
          total_pages: data.data.pagination?.total_pages || 0,
          next: data.data.pagination?.next || null,
          previous: data.data.pagination?.previous || null,
        });
      } else {
        // No staff members found
        setStaff([]);
        setPagination({
          total: 0,
          total_contacts: 0,
          limit: 20,
          offset: 0,
          total_pages: 0,
          next: null,
          previous: null,
        });
      }
      console.log("✅ Staff data set successfully");
    } catch (err) {
      console.error("❌ Error fetching staff:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch staff");
    } finally {
      setLoading(false);
      console.log("🏁 Loading completed");
    }
  };

  useEffect(() => {
    console.log("🎯 useEffect triggered - calling fetchStaff");
    fetchStaff();
  }, [currentOffset]);

  const handleStaffAdded = () => {
    // Refresh staff list after successful upload
    fetchStaff();
    console.log("Staff members added successfully");
  };

  return (
    <AdminLayout type={IRole.ADMIN} className="md:p-0">
      {/* Header */}
      <div className="flex items-center justify-between h-16 border-b border-gray-200 px-6">
        <div className="flex items-center space-x-3">
          <Label className="text-2xl font-bold text-gray-900">
            Staff Management
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
            Bulk Upload Staff
          </Button>
        </div>
      </div>

      <div className="w-full space-y-6 text-inter font-inter px-6 py-9">
        {/* Staff Table */}
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                Staff Members ({pagination.total_contacts || pagination.total})
              </h3>
              <Button
                onClick={fetchStaff}
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
                  Loading Staff Members...
                </h3>
                <p className="text-gray-500">
                  Please wait while we fetch the staff data.
                </p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-red-500 mb-4">
                  <Users className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Error Loading Staff Members
                  </h3>
                  <p className="text-gray-500 mb-6">{error}</p>
                  <Button
                    onClick={fetchStaff}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            ) : staff.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Staff Members Found
                </h3>
                <p className="text-gray-500 mb-6">
                  No staff members have been created yet. Upload staff members
                  using the bulk upload feature to get started.
                </p>
                <Button
                  onClick={() => setBulkUploadOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Staff Members
                </Button>
              </div>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Teacher Name</TableHead>
                      <TableHead>Teacher Email</TableHead>
                      <TableHead>Phone No</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {staff.map((staffMember) => (
                      <TableRow key={staffMember.id}>
                        <TableCell>{staffMember.staff_name}</TableCell>
                        <TableCell>{staffMember.staff_email}</TableCell>
                        <TableCell>{staffMember.staff_phone_no}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Pagination */}
            {staff.length > 0 && (
              <TablePagination total={pagination.total_contacts} />
            )}
          </div>
        </div>
      </div>

      {/* Bulk Upload Dialog */}
      <StaffBulkUpload
        open={bulkUploadOpen}
        onOpenChange={setBulkUploadOpen}
        onStaffAdded={handleStaffAdded}
      />
    </AdminLayout>
  );
}

export default function StaffPage() {
  return (
    <Suspense
      fallback={
        <AdminLayout type="admin">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex items-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Loading staff...</span>
            </div>
          </div>
        </AdminLayout>
      }
    >
      <StaffPageContent />
    </Suspense>
  );
}
