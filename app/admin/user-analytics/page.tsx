"use client";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Label } from "@/components/common/Label";
import { IRole } from "@/types";
import { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Loader2, Users, BarChart3 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import UserAnalyticsPopup from "@/components/admin/user-analytics/UserAnalyticsPopup";
import { UserAnalytics, UserAnalyticsResponse } from "@/types/user-analytics";

const periodOptions = [
  { value: "month", label: "1 Month" },
  { value: "6month", label: "6 Months" },
  { value: "year", label: "1 Year" },
];

function UserAnalyticsPageContent() {
  console.log("🏗️ UserAnalyticsPageContent component rendering");

  const searchParams = useSearchParams();
  const [users, setUsers] = useState<UserAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserAnalytics | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("year");

  // Get current offset from URL params
  const currentOffset = parseInt(searchParams.get("offset") || "0");

  const fetchUserAnalytics = async () => {
    try {
      console.log("🔄 Starting to fetch user analytics...");
      setLoading(true);
      setError(null);

      const token = await getCookie(ICookiesKey.AUTHTOKEN);
      console.log("🔑 Token retrieved:", token ? "✅ Found" : "❌ Not found");

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "https://api.mynotifly.com";
      const fullUrl = `${apiUrl}/api/v1/logs/school-user-summary?period=${selectedPeriod}&limit=20&offset=${currentOffset}`;
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

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ API Error Response:", errorText);
        throw new Error(
          `API responded with status ${response.status}: ${errorText}`
        );
      }

      const data: UserAnalyticsResponse = await response.json();
      console.log("📊 API Response data:", data);

      setUsers(data?.data?.users_summary || []);
      console.log("✅ User analytics data set successfully");
    } catch (err) {
      console.error("❌ Error fetching user analytics:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch user analytics"
      );
    } finally {
      setLoading(false);
      console.log("🏁 Loading completed");
    }
  };

  useEffect(() => {
    console.log("🎯 useEffect triggered - calling fetchUserAnalytics");
    fetchUserAnalytics();
  }, [currentOffset, selectedPeriod]);

  const handleViewAnalytics = (user: UserAnalytics) => {
    setSelectedUser(user);
    setPopupOpen(true);
  };

  return (
    <AdminLayout type={IRole.ADMIN} className="md:p-0">
      {/* Header */}
      <div className="flex items-center justify-between h-16 border-b border-gray-200 px-6">
        <div className="flex items-center space-x-3">
          <Label className="text-2xl font-bold text-gray-900">
            User Analytics
          </Label>
          <Label className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#E0E7FF] text-[#6366F1]">
            Admin
          </Label>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <Label className="text-sm text-gray-600">Period:</Label>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {periodOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={fetchUserAnalytics}
            variant="outline"
            size="sm"
            disabled={loading}
          >
            {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
            Refresh
          </Button>
        </div>
      </div>

      <div className="w-full space-y-6 text-inter font-inter px-6 py-9">
        {/* Users Analytics Table */}
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                User Analytics ({users.length})
              </h3>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <Loader2 className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-spin" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Loading User Analytics...
                </h3>
                <p className="text-gray-500">
                  Please wait while we fetch the analytics data.
                </p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-red-500 mb-4">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Error Loading User Analytics
                  </h3>
                  <p className="text-gray-500 mb-6">{error}</p>
                  <Button
                    onClick={fetchUserAnalytics}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No User Analytics Found
                </h3>
                <p className="text-gray-500 mb-6">
                  No user analytics data is available at the moment.
                </p>
              </div>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Total Messages</TableHead>
                      <TableHead>Email Count</TableHead>
                      <TableHead>SMS Count</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.user_id}>
                        <TableCell className="font-medium">
                          {user.user_name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {user.role}
                          </span>
                        </TableCell>
                        <TableCell>
                          {user.total_messages.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {user.email_count.toLocaleString()}
                        </TableCell>
                        <TableCell>{user.sms_count.toLocaleString()}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleViewAnalytics(user)}
                            variant="outline"
                            size="sm"
                            className="flex items-center space-x-1"
                          >
                            <Eye className="h-4 w-4" />
                            <span>View</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Pagination */}
            {users.length > 0 && <TablePagination total={users.length} />}
          </div>
        </div>
      </div>

      {/* User Analytics Popup */}
      <UserAnalyticsPopup
        open={popupOpen}
        onOpenChange={setPopupOpen}
        userData={selectedUser}
      />
    </AdminLayout>
  );
}

export default function UserAnalyticsPage() {
  return (
    <Suspense
      fallback={
        <AdminLayout type="admin">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex items-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Loading user analytics...</span>
            </div>
          </div>
        </AdminLayout>
      }
    >
      <UserAnalyticsPageContent />
    </Suspense>
  );
}
