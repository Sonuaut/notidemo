"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/components/layout/admin-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { isTokenExpired, refreshAccessToken } from "@/lib/auth";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Country, State } from "country-state-city";
import { ICountry, IState } from "country-state-city/lib/interface";
import { X } from "lucide-react";

// Get all countries for dropdown
const allCountries = Country.getAllCountries();

interface AdminProfile {
  email: string;
  role: string;
  profile_img_url: string | null;
  mobile_no?: string; // Add mobile_no as an optional property
  school_data: {
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
}

const profileSchema = z.object({
  school_name: z.string().min(1, "School name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  zipcode: z
    .string()
    .min(1, "Zipcode is required")
    .regex(/^\d+$/, "Zipcode must contain only numbers"),
  website: z.string().url("Invalid website URL").optional(),
});

// Add a debugging function to help diagnose the issue
const debugCountryStateMatching = (profile: AdminProfile) => {
  console.log("=== DEBUGGING COUNTRY/STATE MATCHING ===");
  console.log("Profile country:", profile.school_data.country);
  console.log("Profile state:", profile.school_data.state);

  // Log all countries to find potential matches
  console.log(
    "All countries:",
    allCountries.map((c) => c.name)
  );

  // Try to find exact and partial matches for the country
  const exactCountryMatch = allCountries.find(
    (c) => c.name.toLowerCase() === profile.school_data.country?.toLowerCase()
  );
  console.log("Exact country match:", exactCountryMatch);

  const partialCountryMatches = allCountries.filter(
    (c) =>
      profile.school_data.country &&
      (c.name
        .toLowerCase()
        .includes(profile.school_data.country.toLowerCase()) ??
        profile.school_data.country
          .toLowerCase()
          .includes(c.name.toLowerCase()))
  );
  console.log("Partial country matches:", partialCountryMatches);

  // If we found a country match, try to find state matches
  if (exactCountryMatch ?? partialCountryMatches.length > 0) {
    const countryCode =
      exactCountryMatch?.isoCode ?? partialCountryMatches[0]?.isoCode;
    const states = State.getStatesOfCountry(countryCode);
    console.log(
      "States for country:",
      states.map((s) => s.name)
    );

    // Try to find exact and partial matches for the state
    const exactStateMatch = states.find(
      (s) => s.name.toLowerCase() === profile.school_data.state?.toLowerCase()
    );
    console.log("Exact state match:", exactStateMatch);

    const partialStateMatches = states.filter(
      (s) =>
        profile.school_data.state &&
        (s.name
          .toLowerCase()
          .includes(profile.school_data.state.toLowerCase()) ??
          profile.school_data.state
            .toLowerCase()
            .includes(s.name.toLowerCase()))
    );
    console.log("Partial state matches:", partialStateMatches);
  }

  console.log("=== END DEBUGGING ===");
};

// Extract country matching logic into a separate function
const findCountryMatch = (countryName: string | undefined): ICountry | null => {
  if (!countryName?.trim()) return null;

  const trimmedName = countryName.trim();

  // Try exact match first
  let match = allCountries.find(
    (c) => c.name.toLowerCase() === trimmedName.toLowerCase()
  );

  // If no exact match, try partial match
  if (!match) {
    match = allCountries.find(
      (c) =>
        c.name.toLowerCase().includes(trimmedName.toLowerCase()) ??
        trimmedName.toLowerCase().includes(c.name.toLowerCase())
    );
  }

  // If still no match, try matching by first word
  if (!match && trimmedName.includes(" ")) {
    const firstWord = trimmedName.split(" ")[0];
    match = allCountries.find((c) =>
      c.name.toLowerCase().includes(firstWord.toLowerCase())
    );
  }

  return match ?? null;
};

// Extract state matching logic into a separate function
const findStateMatch = (
  stateName: string | undefined,
  countryCode: string
): IState | null => {
  if (!stateName?.trim() || !countryCode) return null;

  const trimmedName = stateName.trim();
  const countryStates = State.getStatesOfCountry(countryCode) as IState[];

  // Try exact match first
  let match = countryStates.find(
    (s) => s.name.toLowerCase() === trimmedName.toLowerCase()
  );

  // If no exact match, try partial match
  if (!match) {
    match = countryStates.find(
      (s) =>
        s.name.toLowerCase().includes(trimmedName.toLowerCase()) ??
        trimmedName.toLowerCase().includes(s.name.toLowerCase())
    );
  }

  // If still no match, try matching by first word
  if (!match && trimmedName.includes(" ")) {
    const firstWord = trimmedName.split(" ")[0];
    match = countryStates.find((s) =>
      s.name.toLowerCase().includes(firstWord.toLowerCase())
    );
  }

  return match ?? null;
};

const makeApiRequest = async (
  url: string,
  method: string,
  token: string,
  body?: FormData
) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    "ngrok-skip-browser-warning": "1",
    // ⚠️ DO NOT manually set Content-Type when using FormData
  };

  const response = await fetch(`${API_URL}${url}`, {
    method,
    headers,
    body,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("API error response:", errorText);
    throw new Error(`API responded with status ${response.status}`);
  }

  const data = await response.json();

  if (data.status !== 200 && data.status !== 201) {
    throw new Error(data.message ?? "API request failed");
  }

  return data;
};

export default function AdminProfilePage() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [formData, setFormData] = useState({
    school_name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    website: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [selectedCountryCode, setSelectedCountryCode] = useState<string>("");
  const [selectedStateCode, setSelectedStateCode] = useState<string>("");
  const [states, setStates] = useState<IState[]>([]);

  // Add state for file upload
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Add file input handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
    fetchAdminProfile();
  }, []);

  useEffect(() => {
    if (!profile) return;

    console.log("Setting form data from profile:", profile);

    // Set form data from profile
    setFormData({
      school_name: profile.school_data.school_name ?? "",
      address: profile.school_data.address ?? "",
      city: profile.school_data.city ?? "",
      state: profile.school_data.state ?? "",
      country: profile.school_data.country ?? "",
      zipcode: profile.school_data.zipcode ?? "",
      website: profile.school_data.website ?? "",
    });

    // Run debugging function
    debugCountryStateMatching(profile);

    // Find and set country match
    const countryMatch = findCountryMatch(profile.school_data.country);

    if (countryMatch) {
      console.log("Found country match:", countryMatch.name);
      setSelectedCountryCode(countryMatch.isoCode);
      setFormData((prev) => ({ ...prev, country: countryMatch.name }));

      // Find and set state match
      const stateMatch = findStateMatch(
        profile.school_data.state,
        countryMatch.isoCode
      );

      if (stateMatch) {
        console.log("Found state match:", stateMatch.name);
        setSelectedStateCode(stateMatch.isoCode);
        setFormData((prev) => ({ ...prev, state: stateMatch.name }));
      } else {
        console.log("No state match found for:", profile.school_data.state);
        setSelectedStateCode("");
      }
    } else {
      console.log("No country match found for:", profile.school_data.country);
      setSelectedCountryCode("");
    }
  }, [profile]);

  // Update states when country changes
  useEffect(() => {
    if (selectedCountryCode) {
      console.log("Fetching states for country code:", selectedCountryCode);
      const newStates = State.getStatesOfCountry(
        selectedCountryCode
      ) as IState[];
      console.log("Found states:", newStates.length);
      setStates(newStates);
    } else {
      setStates([]);
    }
  }, [selectedCountryCode]);

  const fetchAdminProfile = async () => {
    setLoading(true);
    try {
      // Check if token is expired and refresh if needed
      if (isTokenExpired("admin")) {
        const refreshed = await refreshAccessToken("admin");
        if (!refreshed) {
          toast({
            variant: "destructive",
            title: "Session Expired",
            description: "Please login again to continue.",
          });
          throw new Error("Session expired. Please login again.");
        }
      }

      const token = localStorage.getItem("adminAccessToken");

      if (!token) {
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "You are not logged in. Please login to continue.",
        });
        throw new Error("Authentication token not found");
      }

      const data = await makeApiRequest(
        "/api/v1/admin/get-specific",
        "GET",
        token
      );

      setProfile(data.data.result);
    } catch (err: any) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  // Extract error handling logic
  const handleApiError = (err: any) => {
    console.error("API Error:", err);

    toast({
      variant: "destructive",
      title: "Error",
      description: err.message ?? "An error occurred",
    });

    // If unauthorized, redirect to login
    if (err.message.includes("401") ?? err.message.includes("expired")) {
      router.push("/admin/login");
    }
  };

  // Handle input changes with validation
  const handleInputChange = (field: string, value: string) => {
    // For zipcode, only allow numeric input
    if (field === "zipcode") {
      // Replace any non-numeric characters
      value = value.replace(/\D/g, "");
    }

    setFormData((prev) => ({ ...prev, [field]: value }));

    // Mark field as touched
    if (!touched[field]) {
      setTouched((prev) => ({ ...prev, [field]: true }));
    }

    // Validate the field if it's been touched
    if (touched[field]) {
      validateField(field, value);
    }
  };

  // Validate a single field
  const validateField = (field: string, value: string) => {
    try {
      // Create an object with just this field for validation
      const fieldData = { [field]: value };
      const fieldSchema = z.object({
        [field]: profileSchema.shape[field as keyof typeof profileSchema.shape],
      });

      // Validate the field
      fieldSchema.parse(fieldData);

      // Clear error if validation passes
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Set error message for this field
        const fieldError = error.errors.find((err) => err.path[0] === field);
        if (fieldError) {
          setErrors((prev) => ({ ...prev, [field]: fieldError.message }));
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouched(allTouched);

    setUpdating(true);

    try {
      if (isTokenExpired("admin")) {
        const refreshed = await refreshAccessToken("admin");
        if (!refreshed) {
          throw new Error("Session expired. Please login again.");
        }
      }

      const token = localStorage.getItem("adminAccessToken");
      if (!token) throw new Error("Authentication token not found");

      const encodedBody = createFormDataForUpdate();

      await makeApiRequest(
        "/api/v1/admin/update-profile",
        "PATCH",
        token,
        encodedBody
      );

      fetchAdminProfile();

      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
    } catch (err: any) {
      handleApiError(err);
    } finally {
      setUpdating(false);
    }
  };

  const createFormDataForUpdate = () => {
    const formDataObj = new FormData();
    formDataObj.append("school_name", formData.school_name ?? "");
    formDataObj.append("address", formData.address ?? "");
    formDataObj.append("city", formData.city ?? "");
    formDataObj.append("state", formData.state ?? "");
    formDataObj.append("country", formData.country ?? "");
    formDataObj.append("zipcode", formData.zipcode ?? "");
    formDataObj.append("website", formData.website ?? "");

    // Append actual file
    if (profileImage) {
      formDataObj.append("file", profileImage); // this must be a File object (e.g. from <input type="file">)
    }

    return formDataObj;
  };
  const clearSelectedImage = () => {
    setProfileImage(null);
    setImagePreview(null);

    // Reset the file input value
    const fileInput = document.getElementById(
      "profile-image"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <AdminLayout type="admin">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>

        {loading ? (
          <div className="col-span-4 flex justify-center items-center min-h-[16rem]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : profile ? (
          <div className="grid gap-6 md:grid-cols-[30%_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  View and update your profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center flex-col space-y-4 mb-6">
                  <Avatar className="rounded-lg">
                    {imagePreview || profile.profile_img_url ? (
                      <AvatarImage
                        src={
                          imagePreview ||
                          profile.profile_img_url ||
                          "/placeholder-avatar.png"
                        }
                        alt={profile.school_data.school_name}
                      />
                    ) : (
                      <AvatarFallback className="text-lg">
                        {profile.school_data.school_name
                          .substring(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>

                  <div className="text-center">
                    <h3 className="text-lg font-medium">
                      {profile.school_data.school_name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {profile.email}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Role: {profile.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>
                  Update your profile information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="school_name">School Name</Label>
                    <Input
                      id="school_name"
                      value={formData.school_name}
                      onChange={(e) =>
                        handleInputChange("school_name", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Select
                        key={`state-select-${selectedStateCode}-${selectedCountryCode}`}
                        value={selectedStateCode ?? undefined}
                        onValueChange={(value) => {
                          console.log("State selected:", value);
                          // Find the state name from the code and store it
                          const stateName =
                            states.find((s: IState) => s.isoCode === value)
                              ?.name ?? "";
                          // Store the state name in formData instead of the code
                          handleInputChange("state", stateName);
                          // Keep track of the code for UI purposes
                          setSelectedStateCode(value);
                        }}
                        disabled={states.length === 0}
                      >
                        <SelectTrigger
                          className={errors.state ? "border-red-500" : ""}
                          id="state"
                        >
                          <SelectValue placeholder="Select state">
                            {formData.state ?? "Select state"}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state: IState) => (
                            <SelectItem
                              key={state.isoCode}
                              value={state.isoCode}
                            >
                              {state.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.state && (
                        <p className="text-red-500 text-xs">{errors.state}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select
                        key={`country-select-${selectedCountryCode}`}
                        value={selectedCountryCode ?? undefined}
                        onValueChange={(value) => {
                          console.log("Country selected:", value);
                          // Find the country name from the code and store it
                          const countryName =
                            allCountries.find(
                              (c: ICountry) => c.isoCode === value
                            )?.name ?? "";
                          // Store the country name in formData instead of the code
                          handleInputChange("country", countryName);
                          // Keep track of the code for UI purposes
                          setSelectedCountryCode(value);
                          // Reset state when country changes
                          setSelectedStateCode("");
                          handleInputChange("state", "");
                        }}
                      >
                        <SelectTrigger
                          className={errors.country ? "border-red-500" : ""}
                          id="country"
                        >
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
                      {errors.country && (
                        <p className="text-red-500 text-xs">{errors.country}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="zipcode">Zipcode</Label>
                      <Input
                        id="zipcode"
                        value={formData.zipcode}
                        onChange={(e) =>
                          handleInputChange("zipcode", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) =>
                        handleInputChange("website", e.target.value)
                      }
                      placeholder="https://example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profile-image">Profile Image</Label>
                    <div className="flex items-center space-x-4">
                      {(imagePreview || profile?.profile_img_url) && (
                        <div className="relative w-20 h-20 rounded-full border overflow-visible">
                          <img
                            src={
                              imagePreview ||
                              profile?.profile_img_url ||
                              "/placeholder-avatar.png"
                            }
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                          {imagePreview && (
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                              onClick={clearSelectedImage}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      )}
                      <div className="flex-1">
                        <Input
                          id="profile-image"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="cursor-pointer"
                        />
                        {profileImage && imagePreview && (
                          <div className="mt-2">
                            <p className="text-xs text-muted-foreground">
                              {profileImage.size < 1024 * 1024
                                ? `${Math.round(profileImage.size / 1024)} KB`
                                : `${(
                                    profileImage.size /
                                    (1024 * 1024)
                                  ).toFixed(2)} MB`}
                            </p>
                            <button
                              type="button"
                              onClick={clearSelectedImage}
                              className="absolute -top-3 -right-3 z-10 text-red-500 hover:text-red-700 bg-white rounded-full"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          Upload a new profile image (optional)
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={updating}>
                    {updating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Profile"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardContent className="flex justify-center items-center h-32">
              <p className="text-muted-foreground">
                Failed to load profile information
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
