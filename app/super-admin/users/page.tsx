"use client";
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";

interface User {
  id: number;
  name?: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  schoolName: string;
  joinDate: string;
}

// This is the default export, which wraps the page in Suspense
export default function UsersPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UsersPage />
    </Suspense>
  );
}

// The actual page logic
function UsersPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "teacher";
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchUsers();
  }, [role]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("superAdminAccessToken");
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(
        `${API_URL}/api/v1/dashboard/get_user?role=${role}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      if (data.status !== 200 || !Array.isArray(data.data?.result)) {
        setUsers([]);
        setFilteredUsers([]);
        return;
      }
      const transformed: User[] = data.data.result.map((item: any) => ({
        id: item.id,
        name: item.name ?? item.email.split("@")[0],
        email: item.email,
        phone: item.mobile_no,
        status: item.is_active ? "active" : "inactive",
        schoolName: "-", // placeholder
        joinDate: new Date(item.created_at).toISOString().split("T")[0],
      }));
      setUsers(transformed);
      setFilteredUsers(transformed);
    } catch (err) {
      setUsers([]);
      setFilteredUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (!value) {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter((t) =>
          t.name?.toLowerCase().includes(value.toLowerCase()) ||
          t.email.toLowerCase().includes(value.toLowerCase()) ||
          t.schoolName.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
    setCurrentPage(1);
  };

  // Pagination logic
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <AdminLayout type="super-admin">
      <div className="">
        <Card>
          <CardHeader>
            <CardTitle>{role.charAt(0).toUpperCase() + role.slice(1)}</CardTitle>
            <div className="flex items-center gap-2 mt-4">
              <Search className="h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder={`Search ${role}...`}
                value={searchTerm}
                onChange={handleSearchInput}
                className="max-w-xs"
              />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Join Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center">
                          No {role} found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.phone}</TableCell>
                          <TableCell>{user.joinDate ? formatDate(user.joinDate) : "N/A"}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
                {/* Pagination */}
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
      </div>
    </AdminLayout>
  );
}