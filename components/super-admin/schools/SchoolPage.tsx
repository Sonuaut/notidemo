"use client";

import type React from "react";
import { useState, useEffect, useMemo } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit, Search, Eye } from "lucide-react";
import { AdminLayout } from "@/components/layout/admin-layout";
import type { School } from "@/types";
import { isTokenExpired, refreshAccessToken } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
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
import { Switch } from "@/components/ui/switch";
import { Country, State } from "country-state-city";
import type { ICountry, IState } from "country-state-city";
import SchoolHeader from "@/components/super-admin/schools/SchoolHeader";
import { useSearchParams } from "next/navigation";
import SchoolActions from "./widgets/SchoolActions";
import { normalizeSubscription, Subscription } from "@/lib/admin/subscription";

interface ApiSchool {
  school: {
    id: number;
    school_name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
    website: string | null;
    created_at: string;
    updated_at: string;
  };
  admin_user: {
    id: number;
    email: string;
    mobile_no: string;
    is_active: boolean;
    is_admin: boolean;
    role: string;
  };
  subscription: any;
}

export default function SchoolPage() {
  const { toast } = useToast();
  const [schools, setSchools] = useState<School[]>([]);
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [editingSchool, setEditingSchool] = useState<School | null>(null);
  const [formData, setFormData] = useState({
    school_name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    website: "",
    mobile_no: "",
    email: "",
    is_active: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [schoolToDelete, setSchoolToDelete] = useState<number | undefined>(
    undefined
  );
  const itemsPerPage = 5;

  // Add state variables for country and state selection
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>("");
  const [selectedStateCode, setSelectedStateCode] = useState<string>("");
  const [states, setStates] = useState<IState[]>([]);

  // Get all countries for dropdown
  const allCountries = Country.getAllCountries();
  useEffect(() => {
    if (selectedCountryCode) {
      console.log("Fetching states for country code:", selectedCountryCode);
      try {
        const newStates = State.getStatesOfCountry(selectedCountryCode);
        console.log(
          "Found states:",
          newStates?.length ?? 0,
          "for country:",
          selectedCountryCode
        );

        if (Array.isArray(newStates) && newStates.length > 0) {
          setStates(newStates);
        } else {
          console.warn(
            "No states found or invalid response for country:",
            selectedCountryCode
          );
          setStates([]);
        }
      } catch (error) {
        console.error("Error fetching states:", error);
        setStates([]);
      }
    } else {
      console.log("No country code selected, clearing states");
      setStates([]);
    }
  }, [selectedCountryCode]);

  // Add a console log to check states array when rendering
  useEffect(() => {
    console.log("Current state:", {
      selectedCountryCode,
      selectedStateCode,
      statesCount: states.length,
      formDataCountry: formData.country,
      formDataState: formData.state,
    });
  }, [
    selectedCountryCode,
    selectedStateCode,
    states,
    formData.country,
    formData.state,
  ]);

  // Add a direct test of the State.getStatesOfCountry function
  useEffect(() => {
    // Test the State.getStatesOfCountry function with a known country code
    const testCountryCode = "US"; // United States
    const testStates = State.getStatesOfCountry(testCountryCode);
    console.log(
      `TEST: States for ${testCountryCode}:`,
      testStates?.length ?? 0
    );

    const testCountryCode2 = "IN"; // India
    const testStates2 = State.getStatesOfCountry(testCountryCode2);
    console.log(
      `TEST: States for ${testCountryCode2}:`,
      testStates2?.length ?? 0
    );
  }, []);

  // Memoize country items to avoid re-rendering
  const countryItems = useMemo(() => {
    return allCountries.map((country: ICountry) => (
      <SelectItem key={country.isoCode} value={country.isoCode}>
        <div className="flex items-center">
          <img
            src={`https://flagcdn.com/w20/${country.isoCode.toLowerCase()}.png`}
            alt={country.name}
            className="mr-2 h-4 w-auto"
            loading="lazy"
          />
          {country.name}
        </div>
      </SelectItem>
    ));
  }, []);

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    setLoading(true);
    setError("");

    try {
      // Check if token is expired and refresh if needed
      if (isTokenExpired("super-admin")) {
        const refreshed = await refreshAccessToken("super-admin");
        if (!refreshed) {
          throw new Error("Session expired. Please login again.");
        }
      }

      const token = localStorage.getItem("superAdminAccessToken");

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      console.log("Using API URL:", API_URL);

      // Direct fetch with the ngrok-skip-browser-warning header
      const response = await fetch(
        `${API_URL}/api/v1/admin/?limit=20&offset=0`,
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
      // console.log("API Response in school fetch and super-admin", data);

      if (data.status !== 200) {
        throw new Error(data.message ?? "Failed to fetch schools");
      }

      // Make sure we're accessing the correct data structure
      if (!Array.isArray(data.data?.result)) {
        console.error("Unexpected API response structure:", data);
        throw new Error("Unexpected API response format");
      }
      console.log("data.data.result :", data.data.result);
      // Transform API data to match our School type
      const transformedSchools: School[] = data.data.result.map(
        (item: ApiSchool) => ({
          id: item.school.id,
          name: item.school.school_name,
          address: item.school.address,
          city: item.school.city,
          state: item.school.state,
          country: item.school.country,
          zipcode: item.school.zipcode,
          website: item.school.website,
          phone: item.admin_user.mobile_no ?? "N/A",
          email: item.admin_user.email,
          status: item.admin_user.is_active ? "active" : "inactive",
          created_at: item.school.created_at,
          admin_id: item.admin_user.id,
          subscription: item.subscription,
        })
      );

      console.log("Transformed schools:", transformedSchools);

      setSchools(transformedSchools);
      setFilteredSchools(transformedSchools);

      // toast({
      //   title: "Success",
      //   description: "Schools loaded successfully!",
      // });
    } catch (err: any) {
      console.error("Error fetching schools:", err);
      setError(err.message ?? "Failed to load schools");

      toast({
        variant: "destructive",
        title: "Error",
        description: err.message ?? "Failed to load schools",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered = schools.filter(
      (school) =>
        school.name.toLowerCase().includes(searchTerm.toLowerCase()) ??
        school.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSchools(filtered);
    setCurrentPage(1);
  }, [searchTerm, schools]);

  const totalPages = Math.ceil(filteredSchools.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSchools = filteredSchools.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdateLoading(true);
    try {
      if (editingSchool) {
        const token = localStorage.getItem("superAdminAccessToken");

        if (!token) {
          throw new Error("Authentication token not found");
        }

        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const formDataObj = new URLSearchParams();
        formDataObj.append("school_name", formData.school_name);
        formDataObj.append("address", formData.address);
        formDataObj.append("city", formData.city);
        formDataObj.append("state", formData.state);
        formDataObj.append("country", formData.country);
        formDataObj.append("zipcode", formData.zipcode);
        formDataObj.append("website", formData.website ?? "");
        formDataObj.append("is_active", formData.is_active ? "true" : "false");

        console.log(
          "Sending update with country:",
          formData.country,
          "and state:",
          formData.state
        );

        const response = await fetch(
          `${API_URL}/api/v1/admin/update-admin?user_id=${editingSchool.admin_id}`,
          {
            method: "PATCH",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/x-www-form-urlencoded",
              "ngrok-skip-browser-warning": "1",
            },
            body: formDataObj,
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("API error response:", errorText);
          throw new Error(`API responded with status ${response.status}`);
        }

        const data = await response.json();

        if (data.status !== 200) {
          throw new Error(data.message ?? "Failed to update school");
        }

        // Update the local state with the updated school
        setSchools(
          schools.map((school) =>
            school.id === editingSchool.id
              ? {
                  ...school,
                  name: formData.school_name,
                  address: formData.address,
                  city: formData.city,
                  state: formData.state,
                  country: formData.country,
                  zipcode: formData.zipcode,
                  website: formData.website,
                  status: formData.is_active ? "active" : "inactive",
                }
              : school
          )
        );

        toast({
          title: "Success",
          description: "School updated successfully!",
        });
      } else {
        // Add new school logic (if needed)
        // ...
      }

      resetForm();
    } catch (err: any) {
      console.error("Error updating school:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message ?? "Failed to update school",
      });
    } finally {
      setIsUpdateLoading(false);
    }
  };

  const handleEdit = (school: School) => {
    setEditingSchool(school);
    setFormData({
      school_name: school.name,
      address: school.address,
      city: school.city,
      state: school.state,
      country: school.country,
      zipcode: school.zipcode,
      website: school.website ?? "",
      mobile_no: school.phone,
      email: school.email,
      is_active: school.status === "active",
    });

    // Find country code from country name
    const countryName = school.country?.trim();
    if (countryName) {
      // Try exact match first
      let countryMatch = allCountries.find(
        (c) => c.name.toLowerCase() === countryName.toLowerCase()
      );

      // If no exact match, try partial match
      if (!countryMatch) {
        countryMatch = allCountries.find(
          (c) =>
            c.name.toLowerCase().includes(countryName.toLowerCase()) ??
            countryName.toLowerCase().includes(c.name.toLowerCase())
        );
      }

      // If still no match, try matching by first word
      if (!countryMatch && countryName.includes(" ")) {
        const firstWord = countryName.split(" ")[0];
        countryMatch = allCountries.find((c) =>
          c.name.toLowerCase().includes(firstWord.toLowerCase())
        );
      }

      if (countryMatch) {
        console.log("Found country match:", countryMatch.name);
        // Set the country code
        setSelectedCountryCode(countryMatch.isoCode);

        // Find state code from state name
        const stateName = school.state?.trim();
        if (stateName) {
          // Get states for this country
          const countryStates = State.getStatesOfCountry(countryMatch.isoCode);

          // Try exact match first
          let stateMatch = countryStates.find(
            (s) => s.name.toLowerCase() === stateName.toLowerCase()
          );

          // If no exact match, try partial match
          if (!stateMatch) {
            stateMatch = countryStates.find(
              (s) =>
                s.name.toLowerCase().includes(stateName.toLowerCase()) ??
                stateName.toLowerCase().includes(s.name.toLowerCase())
            );
          }

          // If still no match, try matching by first word
          if (!stateMatch && stateName.includes(" ")) {
            const firstWord = stateName.split(" ")[0];
            stateMatch = countryStates.find((s) =>
              s.name.toLowerCase().includes(firstWord.toLowerCase())
            );
          }

          if (stateMatch) {
            console.log("Found state match:", stateMatch.name);
            // Set the state code
            setSelectedStateCode(stateMatch.isoCode);
          } else {
            console.log("No state match found for:", stateName);
            setSelectedStateCode("");
          }
        }
      } else {
        console.log("No country match found for:", countryName);
        setSelectedCountryCode("");
      }
    }

    setIsDialogOpen(true);
  };

  const handleDelete = async (schoolId: number | undefined) => {
    if (schoolId === undefined) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Cannot delete: School ID is missing",
      });
      return;
    }

    try {
      const token = localStorage.getItem("superAdminAccessToken");

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      // Make the DELETE request to /api/v1/schools/{schoolId}
      const response = await fetch(`${API_URL}/api/v1/schools/${schoolId}`, {
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
        throw new Error(data.message ?? "Failed to delete school");
      }

      // Update the local state by removing the deleted school
      setSchools(schools.filter((school) => school.id !== schoolId));
      setFilteredSchools(
        filteredSchools.filter((school) => school.id !== schoolId)
      );

      toast({
        title: "Success",
        description: "School deleted successfully!",
      });
    } catch (err: any) {
      console.error("Error deleting school:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message ?? "Failed to delete school",
      });
    } finally {
      setSchoolToDelete(undefined);
    }
  };

  const handleStatusToggle = async (school: School) => {
    try {
      const token = localStorage.getItem("superAdminAccessToken");

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      // Create form data for the update
      const formDataObj = new URLSearchParams();
      formDataObj.append("school_name", school.name);
      formDataObj.append("address", school.address);
      formDataObj.append("city", school.city);
      formDataObj.append("state", school.state);
      formDataObj.append("country", school.country);
      formDataObj.append("zipcode", school.zipcode);
      formDataObj.append("website", school.website ?? "");
      // Toggle the is_active status
      const newStatus = school.status !== "active";
      formDataObj.append("is_active", newStatus ? "true" : "false");

      // Make the PATCH request to update the school
      const response = await fetch(
        `${API_URL}/api/v1/admin/update-admin?user_id=${school.admin_id}`,
        {
          method: "PATCH",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/x-www-form-urlencoded",
            "ngrok-skip-browser-warning": "1",
          },
          body: formDataObj,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API error response:", errorText);
        throw new Error(`API responded with status ${response.status}`);
      }

      const data = await response.json();

      if (data.status !== 200) {
        throw new Error(data.message ?? "Failed to update school status");
      }

      // Update the local state with the updated school status
      setSchools(
        schools.map((s) =>
          s.id === school.id
            ? {
                ...s,
                status: newStatus ? "active" : "inactive",
              }
            : s
        )
      );

      toast({
        title: "Success",
        description: `School status updated to ${
          newStatus ? "active" : "inactive"
        }!`,
      });
    } catch (err: any) {
      console.error("Error updating school status:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message ?? "Failed to update school status",
      });
    }
  };

  // 2. Create separate functions for fetching all vs searching
  const fetchAllSchools = async () => {
    setLoading(true);
    setError("");

    try {
      // Check if token is expired and refresh if needed
      if (isTokenExpired("super-admin")) {
        const refreshed = await refreshAccessToken("super-admin");
        if (!refreshed) {
          throw new Error("Session expired. Please login again.");
        }
      }

      const token = localStorage.getItem("superAdminAccessToken");

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      console.log("Using API URL:", API_URL);

      // Direct fetch with no search parameter
      const response = await fetch(
        `${API_URL}/api/v1/admin/?limit=20&offset=0`,
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

      // Handle "School Not found" response
      if (data.status === 200 && data.message === "School Not found") {
        console.log("No schools found");
        // Set empty schools array
        setSchools([]);
        setFilteredSchools([]);
        return;
      }

      if (data.status !== 200) {
        throw new Error(data.message ?? "Failed to load schools");
      }

      // Make sure we're accessing the correct data structure
      if (!Array.isArray(data.data?.result)) {
        console.error("Unexpected API response structure:", data);
        setSchools([]);
        setFilteredSchools([]);
        return;
      }

      // Transform API data to match our School type
      const transformedSchools: School[] = data.data.result

        .map((item: ApiSchool) => ({
          id: item.school.id,
          name: item.school.school_name,
          address: item.school.address,
          city: item.school.city,
          state: item.school.state,
          country: item.school.country,
          zipcode: item.school.zipcode,
          website: item.school.website,
          phone: item.admin_user.mobile_no ?? "N/A",
          email: item.admin_user.email,
          status: item.admin_user.is_active ? "active" : "inactive",
          created_at: item.school.created_at,
          admin_id: item.admin_user.id,
          subscription: item.subscription,
        }))
        .sort((a: { created_at: any }, b: { created_at: string }) =>
          b.created_at.localeCompare(a.created_at)
        );

      console.log("Transformed schools:", transformedSchools);

      setSchools(transformedSchools);
      setFilteredSchools(transformedSchools);
    } catch (err: any) {
      console.error("Error fetching schools:", err);
      setError(err.message ?? "Failed to load schools");

      toast({
        variant: "destructive",
        title: "Error",
        description: err.message ?? "Failed to load schools",
      });
    } finally {
      setLoading(false);
    }
  };

  const searchSchools = async () => {
    setError("");

    try {
      // Check if token is expired and refresh if needed
      if (isTokenExpired("super-admin")) {
        const refreshed = await refreshAccessToken("super-admin");
        if (!refreshed) {
          throw new Error("Session expired. Please login again.");
        }
      }

      const token = localStorage.getItem("superAdminAccessToken");

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      console.log("Using API URL:", API_URL);

      // Direct fetch with the name parameter
      const response = await fetch(
        `${API_URL}/api/v1/admin/?limit=20&offset=0&name=${encodeURIComponent(
          searchTerm
        )}`,
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

      // Handle "School Not found" response
      if (data.status === 200 && data.message === "School Not found") {
        console.log("No schools found matching search term:", searchTerm);
        // Set empty schools array
        setSchools([]);
        setFilteredSchools([]);
        return;
      }

      if (data.status !== 200) {
        throw new Error(data.message ?? "Failed to load schools");
      }

      // Make sure we're accessing the correct data structure
      if (!Array.isArray(data.data?.result)) {
        console.error("Unexpected API response structure:", data);
        setSchools([]);
        setFilteredSchools([]);
        return;
      }

      // Transform API data to match our School type
      const transformedSchools: School[] = data.data.result.map(
        (item: ApiSchool) => ({
          id: item.school.id,
          name: item.school.school_name,
          address: item.school.address,
          city: item.school.city,
          state: item.school.state,
          country: item.school.country,
          zipcode: item.school.zipcode,
          website: item.school.website,
          phone: item.admin_user.mobile_no ?? "N/A",
          email: item.admin_user.email,
          status: item.admin_user.is_active ? "active" : "inactive",
          created_at: item.school.created_at,
          admin_id: item.admin_user.id,
          subscription: item.subscription,
        })
      );

      console.log("Transformed schools:", transformedSchools);

      setSchools(transformedSchools);
      setFilteredSchools(transformedSchools);

      // toast({
      //   title: "Success",
      //   description: "Schools loaded successfully!",
      // });
    } catch (err: any) {
      console.error("Error fetching schools:", err);
      setError(err.message ?? "Failed to load schools");

      // toast({
      //   variant: "destructive",
      //   title: "Error",
      //   description: err.message ?? "Failed to load schools",
      // });
    }
  };

  useEffect(() => {
    searchSchools();
  }, [searchTerm]);

  // 4. Initialize with all schools
  useEffect(() => {
    fetchAllSchools();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetForm = () => {
    setFormData({
      school_name: "",
      address: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
      website: "",
      mobile_no: "",
      email: "",
      is_active: true,
    });
    setSelectedCountryCode("");
    setSelectedStateCode("");
    setEditingSchool(null);
    setIsDialogOpen(false);
  };

  // Format date to readable format
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
      <div className="">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
            <button className="ml-4 underline" onClick={fetchSchools}>
              Try Again
            </button>
          </div>
        )}

        {loading ? (
          <div className="h-screen w-full flex justify-center items-center ">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <SchoolHeader />
            <Card className="border-none shadow-none   p-0">
              <CardHeader className="py-4">
                <div className="flex justify-between items-start">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="sm:max-w-[525px]">
                      <DialogHeader>
                        <DialogTitle>
                          {editingSchool ? "Edit School" : "Add New School"}
                        </DialogTitle>
                        <DialogDescription>
                          {editingSchool
                            ? "Update school information"
                            : "Enter the details for the new school"}
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="school_name">School Name</Label>
                            <Input
                              id="school_name"
                              value={formData.school_name}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  school_name: e.target.value,
                                })
                              }
                              className="col-span-3"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="address">Address</Label>
                            <Input
                              id="address"
                              value={formData.address}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  address: e.target.value,
                                })
                              }
                              className="col-span-3"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              value={formData.city}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  city: e.target.value,
                                })
                              }
                              className="col-span-3"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="country">Country</Label>
                            <div className="col-span-3">
                              <Select
                                key={`country-select-${selectedCountryCode}`}
                                value={selectedCountryCode ?? undefined}
                                onValueChange={(value) => {
                                  console.log("Country selected:", value);

                                  // Find the country name from the code
                                  const country = allCountries.find(
                                    (c) => c.isoCode === value
                                  );
                                  const countryName = country?.name ?? "";
                                  console.log(
                                    "Found country name:",
                                    countryName,
                                    "for code:",
                                    value
                                  );

                                  // Store the country name in formData
                                  setFormData({
                                    ...formData,
                                    country: countryName,
                                  });

                                  // Update the selected country code
                                  setSelectedCountryCode(value);
                                  console.log(
                                    "Updated selectedCountryCode to:",
                                    value
                                  );

                                  // Reset state selection
                                  setSelectedStateCode("");
                                  setFormData((prev) => ({
                                    ...prev,
                                    state: "",
                                  }));
                                }}
                              >
                                <SelectTrigger id="country">
                                  <SelectValue placeholder="Select country">
                                    {selectedCountryCode ? (
                                      <div className="flex items-center">
                                        <img
                                          src={`https://flagcdn.com/w20/${selectedCountryCode.toLowerCase()}.png`}
                                          alt={formData.country ?? ""}
                                          className="mr-2 h-4 w-auto"
                                          loading="lazy"
                                        />
                                        {formData.country}
                                      </div>
                                    ) : (
                                      "Select country"
                                    )}
                                  </SelectValue>
                                </SelectTrigger>
                                <SelectContent>{countryItems}</SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="state">State</Label>
                            <div className="col-span-3">
                              <Select
                                key={`state-select-${selectedStateCode}-${selectedCountryCode}`}
                                value={selectedStateCode ?? undefined}
                                onValueChange={(value) => {
                                  console.log("State selected:", value);

                                  // Find the state name from the code
                                  const state = states.find(
                                    (s) => s.isoCode === value
                                  );
                                  const stateName = state?.name ?? "";
                                  console.log(
                                    "Found state name:",
                                    stateName,
                                    "for code:",
                                    value
                                  );

                                  // Store the state name in formData
                                  setFormData({
                                    ...formData,
                                    state: stateName,
                                  });

                                  // Update the selected state code
                                  setSelectedStateCode(value);
                                }}
                                disabled={
                                  !selectedCountryCode || states.length === 0
                                }
                              >
                                <SelectTrigger id="state">
                                  <SelectValue
                                    placeholder={
                                      !selectedCountryCode
                                        ? "Select country first"
                                        : states.length === 0
                                        ? "No states available"
                                        : "Select state"
                                    }
                                  >
                                    {formData.state ??
                                      (!selectedCountryCode
                                        ? "Select country first"
                                        : states.length === 0
                                        ? "No states available"
                                        : "Select state")}
                                  </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                  {states.length > 0 ? (
                                    states.map((state) => (
                                      <SelectItem
                                        key={state.isoCode}
                                        value={state.isoCode}
                                      >
                                        {state.name}
                                      </SelectItem>
                                    ))
                                  ) : (
                                    <SelectItem value="none" disabled>
                                      No states available
                                    </SelectItem>
                                  )}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="zipcode">Zipcode</Label>
                            <Input
                              id="zipcode"
                              value={formData.zipcode}
                              onChange={(e) => {
                                // Only allow numeric input for zipcode
                                const numericValue = e.target.value.replace(
                                  /\D/g,
                                  ""
                                );
                                setFormData({
                                  ...formData,
                                  zipcode: numericValue,
                                });
                              }}
                              className="col-span-3"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="website">Website</Label>
                            <Input
                              id="website"
                              value={formData.website ?? ""}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  website: e.target.value,
                                })
                              }
                              className="col-span-3"
                              placeholder="Optional"
                            />
                          </div>

                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  email: e.target.value,
                                })
                              }
                              className="col-span-3"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="is_active">Status</Label>
                            <Switch
                              id="is_active"
                              checked={formData.is_active}
                              onCheckedChange={(checked) =>
                                setFormData({ ...formData, is_active: checked })
                              }
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={resetForm}
                          >
                            Cancel
                          </Button>
                          <Button disabled={isUpdateLoading} type="submit">
                            {editingSchool ? "Update" : "Create"}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="px-6 py-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>School Name</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentSchools.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8">
                            No schools found
                          </TableCell>
                        </TableRow>
                      ) : (
                        currentSchools.map((school: School) => (
                          <TableRow key={school.id}>
                            <TableCell className="font-medium">
                              {school.name}
                            </TableCell>
                            <TableCell className="w-1/4">
                              <div className="text-sm">
                                <div>{school.address}</div>
                                <div className="text-gray-500">
                                  {school.city}, {school.state}
                                </div>
                                <div className="text-gray-500">
                                  {school.country}, {school.zipcode}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <div>{school.phone}</div>
                                <div className="text-gray-500">
                                  {school.email}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Switch
                                  checked={school.status === "active"}
                                  onCheckedChange={() =>
                                    handleStatusToggle(school)
                                  }
                                  aria-label={`Toggle ${school.name} status`}
                                />
                                <span
                                  className={
                                    school.status === "active"
                                      ? "text-green-600"
                                      : "text-gray-500"
                                  }
                                ></span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {school.created_at
                                ? formatDate(school.created_at)
                                : "N/A"}
                            </TableCell>
                            {/* <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    viewSchoolUsers(school.id, school.name)
                                  }
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEdit(school)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                               
                              </div>
                            </TableCell> */}
                            <TableCell>
                              <SchoolActions
                                schoolData={school}
                                onDelete={() => setSchoolToDelete(school.id)}
                              />
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination controls */}

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
              </CardContent>
            </Card>
          </>
        )}
      </div>
      <Toaster />
      <AlertDialog
        open={schoolToDelete !== undefined}
        onOpenChange={(open) => !open && setSchoolToDelete(undefined)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              school and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(schoolToDelete)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

const viewSchoolUsers = (schoolId: number, schoolName: string) => {
  window.location.href = `/super-admin/school-users?schoolId=${schoolId}&schoolName=${encodeURIComponent(
    schoolName
  )}`;
};
