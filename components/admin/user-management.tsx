"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BulkUploadDialog } from "@/components/super-admin/school-users/Bulk-upload/BulkUploadDialog";
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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit, Trash2, Search, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { isTokenExpired, refreshAccessToken } from "@/lib/auth";
import { Switch } from "@/components/ui/switch";

// Define interfaces for API response
interface School {
  id: number;
  school_name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  website: string;
  created_at: string;
  updated_at: string;
}

interface UserData {
  id: number;
  name?: string; // Add name field
  email: string;
  mobile_no: string;
  is_active: boolean;
  is_admin: boolean;
  is_super_admin: boolean;
  otp_verified: boolean;
  role: string;
  about: string | null;
  profile_img_url: string | null;
}

interface ApiUser {
  school: School;
  user: UserData;
}

interface User {
  id: number;
  name?: string; // Add name field
  email: string;
  phone: string;
  role: string;
  status: "active" | "inactive";
  schoolName: string;
  schoolId: number; // Add schoolId field
  joinDate: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [schoolID, setSchoolID] = useState<number | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    role: "Teacher",
    status: "active" as "active" | "inactive",
  });
  const itemsPerPage = 5;
  const [inputValue, setInputValue] = useState("");

  // 1. Create a simple search handler that calls API directly
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setSearchTerm(newValue);

    // If search box is empty, fetch all users
    if (!newValue || newValue.trim() === "") {
      fetchAllUsers();
    } else {
      // Otherwise search with the term
      searchUsers(newValue);
    }
  };

  // 2. Create separate functions for fetching all vs searching
  const fetchAllUsers = async () => {
    setIsLoading(true);
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

      // No search parameter
      const url = `${API_URL}/api/v1/auth/get-all?limit=20&offset=0`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "1",
        },
      });

      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }

      const data = await response.json();

      if (data.status !== 200 || !data.data?.result) {
        setUsers([]);
        setFilteredUsers([]);
        return;
      }
      console.log("data.data.result", data.data.result);
      // Transform API data to match our User type
      const transformedUsers: User[] = data.data.result.map(
        (item: ApiUser) => ({
          id: item.user.id,
          name: item.user.name ?? item.user.email.split("@")[0],
          email: item.user.email,
          phone: item.user.mobile_no,
          role: item.user.role,
          status: item.user.is_active ? "active" : "inactive",
          schoolName: item.school.school_name,
          schoolId: item.school.id,
          joinDate: new Date(item.school.created_at)
            .toISOString()
            .split("T")[0],
        })
      );

      console.log(transformedUsers , 'transformedUsers');
      setSchoolID(transformedUsers[0].schoolId);
      setUsers(transformedUsers);
      setFilteredUsers(transformedUsers);
    } catch (err: any) {
      console.error("Error fetching users:", err);
      setUsers([]);
      setFilteredUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const searchUsers = async (term: string) => {
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

      // URL with name parameter
      const url = `${API_URL}/api/v1/auth/get-all?limit=20&offset=0&name=${encodeURIComponent(
        term
      )}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "1",
        },
      });

      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }

      const data = await response.json();

      if (data.status !== 200 || !data.data?.result) {
        setUsers([]);
        setFilteredUsers([]);
        return;
      }

      // console.log("data.data.result", data.data.result);
      // Transform API data to match our User type
      const transformedUsers: User[] = data.data.result.map(
        (item: ApiUser) => ({
          id: item.user.id,
          name: item.user.name ?? item.user.email.split("@")[0],
          email: item.user.email,
          phone: item.user.mobile_no,
          role: item.user.role,
          status: item.user.is_active ? "active" : "inactive",
          schoolName: item.school.school_name,
          schoolId: item.school.id,
          joinDate: new Date(item.school.created_at)
            .toISOString()
            .split("T")[0],
        })
      );

      setSchoolID(transformedUsers[0].schoolId);
      setUsers(transformedUsers);
      setFilteredUsers(transformedUsers);
    } catch (err: any) {
      console.error("Error searching users:", err);
      setUsers([]);
      setFilteredUsers([]);
    }
  };

  // 3. Update the search input to use the new handler
  <Input
    type="search"
    placeholder="Search users..."
    className="pl-8"
    value={inputValue}
    onChange={handleSearchInput}
  />;

  // 4. Initialize with all users
  useEffect(() => {
    fetchAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ??
        user.schoolName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, users]);

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingUser) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Cannot update: No user selected",
      });
      console.log("No user selected toast triggered");
      return;
    }

    try {
      setIsSubmitting(true);

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

      // Create JSON data for the update with the correct format
      const updateData = {
        user_id: editingUser.id,
        is_active: formData.status === "active",
        role: formData.role,
        school_id: editingUser.schoolId,
        name: editingUser.name ?? "",
        mobile_no: formData.phone ?? "",
      };

      console.log("Sending update data:", updateData);

      // Make the PATCH request to update the user with JSON data
      const response = await fetch(`${API_URL}/api/v1/auth/update-user`, {
        method: "PATCH",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "1",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API error response:", errorText);
        throw new Error(`API responded with status ${response.status}`);
      }

      const data = await response.json();

      if (data.status !== 200) {
        throw new Error(data.message ?? "Failed to update user");
      }

      // Update the local state with the updated user
      setUsers(
        users.map((u) =>
          u.id === editingUser.id
            ? {
              ...u,
              role: formData.role,
              status: formData.status,
              phone: formData.phone,
            }
            : u
        )
      );

      // Force toast to display with a setTimeout
      setTimeout(() => {
        toast({
          title: "Success",
          description: "User updated successfully!",
          variant: "default",
        });
        console.log("Update success toast triggered");
      }, 100);

      resetForm();
    } catch (err: any) {
      console.error("Error updating user:", err);

      // Force toast to display with a setTimeout
      setTimeout(() => {
        toast({
          variant: "destructive",
          title: "Error",
          description: err.message ?? "Failed to update user",
        });
        console.log("Update error toast triggered");
      }, 100);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setIsDeleting(true);

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

      const response = await fetch(`${API_URL}/api/v1/auth/delete?id=${id}`, {
        method: "DELETE",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "1",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API error response:", errorText);
        throw new Error(`API responded with status ${response.status}`);
      }

      const data = await response.json();

      if (data.status !== 200) {
        throw new Error(data.message ?? "Failed to delete user");
      }

      // Update local state
      setUsers(users.filter((user) => user.id !== id));
      setFilteredUsers(filteredUsers.filter((user) => user.id !== id));

      // Force toast to display with a setTimeout
      setTimeout(() => {
        toast({
          title: "Success",
          description: "User deleted successfully!",
          variant: "default",
        });
        console.log("Delete success toast triggered");
      }, 100);
    } catch (err: any) {
      console.error("Error deleting user:", err);

      // Force toast to display with a setTimeout
      setTimeout(() => {
        toast({
          variant: "destructive",
          title: "Error",
          description: err.message ?? "Failed to delete user",
        });
        console.log("Delete error toast triggered");
      }, 100);
    } finally {
      setIsDeleting(false);
      setUserToDelete(null);
    }
  };

  const resetForm = () => {
    setFormData({
      email: "",
      phone: "",
      role: "Teacher",
      status: "active",
    });
    setEditingUser(null);
    setIsDialogOpen(false);
  };

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Add a function to handle status toggle
  const handleStatusToggle = async (user: User) => {
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

      // Create JSON data for the update
      const updateData = {
        user_id: user.id,
        is_active: user.status === "active" ? false : true,
        role: user.role,
        school_id: user.schoolId,
        name: user.name ?? "",
        mobile_no: user.phone ?? "",
      };

      // Make the PATCH request to update the user
      const response = await fetch(`${API_URL}/api/v1/auth/update-user`, {
        method: "PATCH",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "1",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API error response:", errorText);
        throw new Error(`API responded with status ${response.status}`);
      }

      const data = await response.json();

      if (data.status !== 200) {
        throw new Error(data.message ?? "Failed to update user status");
      }

      // Update the local state with the updated user status
      setUsers(
        users.map((u) =>
          u.id === user.id
            ? {
              ...u,
              status: user.status === "active" ? "inactive" : "active",
            }
            : u
        )
      );

      toast({
        title: "Success",
        description: `User status updated to ${user.status === "active" ? "inactive" : "active"
          }!`,
      });
    } catch (err: any) {
      console.error("Error updating user status:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message ?? "Failed to update user status",
      });
    }
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
    <>
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="mb-1">Teacher Management</CardTitle>
              <CardDescription>
                Manage all teachers in the system
              </CardDescription>
            </div>

            <BulkUploadDialog
            fetchAllUsers={fetchAllUsers}
              schoolId={Number(schoolID)}
            />
            <div className="relative w-72">
              <Search className="absolute left-2.5 top-[11px] h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-8 focus-visible:ring-offset-0 focus-visible:ring-0"
                value={inputValue}
                onChange={handleSearchInput}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>School</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    <div className="col-span-4 flex justify-center items-center min-h-[16rem]">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : currentUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    <div className="text-muted-foreground">No users found</div>
                  </TableCell>
                </TableRow>
              ) : (
                currentUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.schoolName}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={user.status === "active"}
                          onCheckedChange={() => handleStatusToggle(user)}
                          aria-label={`Toggle ${user.email} status`}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.joinDate ? formatDate(user.joinDate) : "N/A"}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(user)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setUserToDelete(user.id)}
                          disabled={isDeleting}
                        >
                          {isDeleting && userToDelete === user.id ? (
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
          {totalPages > 1 && (
            <div className="flex justify-center space-x-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="flex items-center px-2">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={formData.email}
                  className="col-span-3"
                  disabled
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => {
                    // Only allow numeric input for phone
                    let numericValue = e.target.value.replace(/\D/g, "");

                    // Enforce max length of 15
                    if (numericValue.length > 15) {
                      numericValue = numericValue.slice(0, 15);
                    }

                    setFormData({ ...formData, phone: numericValue });
                  }}
                  className="col-span-3"
                  maxLength={15}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role">Role</Label>
                <Select
                  disabled
                  value={formData.role}
                  onValueChange={(value) =>
                    setFormData({ ...formData, role: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Teacher">Teacher</SelectItem>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Parent">Parent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status">Status</Label>

                <Switch
                  id="status-switch"
                  checked={formData.status === "active"}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      status: checked ? "active" : "inactive",
                    })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={userToDelete !== null}
        onOpenChange={(open) => !open && setUserToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              user and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                userToDelete !== null && handleDelete(userToDelete)
              }
              disabled={isDeleting}
            >
              {isDeleting ? (
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
