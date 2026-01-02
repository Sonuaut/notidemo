"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { z } from "zod"
import { Country, State } from "country-state-city"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Upload, X } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

const signupSchema = z.object({
  schoolName: z.string().min(2, "School name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City is required"),
  state: z.string().optional(),
  country: z.string().min(2, "Country is required"),
  zipcode: z.string()
    .min(4, "Zipcode is required")
    .regex(/^\d+$/, "Zipcode must contain only numbers"),
  phone: z.string()
    .min(4, "Phone number must be at least 4 digits")
    .max(15, "Phone number cannot exceed 15 digits")
    .regex(/^\d+$/, "Phone number must contain only numbers"),
  email: z.string().email("Please enter a valid email"),
  password: z.string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/\d/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  logo: z.any().refine(
    (file) => {
      if (typeof window === "undefined") return true; // Skip check during SSR
      return file instanceof File && file.size > 0;
    },
    { message: "School logo is required" }
  ),
});

const allCountries = Country.getAllCountries();

export default function AdminSignup() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    schoolName: "",
    address: "",
    city: "",
    state: "", // Will store the state name directly
    country: "", // Will store the country name directly
    zipcode: "",
    phone: "",
    email: "",
    password: "",
    website: "",
    logo: null as File | null,
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [states, setStates] = useState<any[]>([])
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  
  // Add state to track the selected country/state codes for UI purposes
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [selectedStateCode, setSelectedStateCode] = useState("");

  const router = useRouter()
  const countryItems = useMemo(() => {
    return allCountries.map((country) => (
      <SelectItem key={country.isoCode} value={country.isoCode}>
        <div className="  truncate flex items-center">
          <img
            src={`https://flagcdn.com/w20/${country.isoCode.toLowerCase()}.png`}
            alt={country.name}
            className="mr-2 w-6 h-4  rounded-sm"
            loading="lazy"

          />
          {country.name}
        </div>
      </SelectItem>
    ))
  }, [])

  useEffect(() => {
    if (selectedCountryCode) {
      const updateStates = () => {
        const newStates = State.getStatesOfCountry(selectedCountryCode);
        setStates(newStates);
      }
      
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(updateStates);
      } else {
        updateStates();
      }
    } else {
      setStates([]);
    }
  }, [selectedCountryCode]);

  const handleInputChange = (field: string, value: string | File | null) => {
    // For zipcode and phone, only allow numeric input
    if ((field === "zipcode" || field === "phone") && typeof value === "string") {
      // Replace any non-numeric characters
      value = value.replace(/\D/g, '');
      
      // For phone, enforce max length of 15
      if (field === "phone" && value.length > 15) {
        value = value.slice(0, 15);
      }
    }
    
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error for this field when user types
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      handleInputChange('logo', file)
      
      // Create preview
      const reader = new FileReader()
      reader.onload = (event) => {
        setLogoPreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = () => {
    try {
      signupSchema.parse(formData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach(err => {
          const field = err.path[0] as string
          newErrors[field] = err.message
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    
    try {
      const submitData = new FormData()
   
      submitData.append('school_name', formData.schoolName)
      submitData.append('address', formData.address)
      submitData.append('city', formData.city)
      submitData.append('state', formData.state || '') // Already contains the state name
      submitData.append('country', formData.country || '') // Already contains the country name
      submitData.append('zipcode', formData.zipcode)
      submitData.append('phone_no', formData.phone) 
      submitData.append('email', formData.email)
      submitData.append('password', formData.password)
      submitData.append('website', formData.website || '')
      

      if (formData.logo) {
        submitData.append('school_logo', formData.logo)
      } else {
        throw new Error("School logo is required")
      }

      console.log("Form data being sent:", {
        school_name: formData.schoolName,
        phone_no: formData.phone,
        has_logo: formData.logo !== null
      })
      
      const API_URL = process.env.NEXT_PUBLIC_API_URL
      console.log("Using API URL:", API_URL)
      
      const response = await fetch(`${API_URL}/api/v1/admin/`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
        },
        body: submitData
      })
      
      // Log the raw response for debugging
      const responseText = await response.text()
      console.log("Raw API response:", responseText)
      
      // Parse the response as JSON
      const data = JSON.parse(responseText)
      
      if (data.status !== 201) {
        throw new Error(data.message || "Signup failed")
      }
      
      // Show success toast
      toast({
        title: "Registration Successful",
        description: "Please check your email for OTP verification.",
      })
      
      // Store email in localStorage for OTP verification
      localStorage.setItem("signupEmail", formData.email)
      router.push("/admin/verify-signup-otp")
    } catch (error: any) {
      console.error("Signup error:", error)
      
      // Show error toast
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error.message || "Signup failed. Please try again.",
      })
      
      setErrors({ form: error.message || "Signup failed. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-green-600">School Admin Sign Up</CardTitle>
          <CardDescription>Create your school admin account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.form && (
              <Alert variant="destructive">
                <AlertDescription>{errors.form}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* School Name */}
              <div className="space-y-2">
                <Label htmlFor="schoolName">School Name *</Label>
                <Input
                  id="schoolName"
                  value={formData.schoolName}
                  onChange={(e) => handleInputChange("schoolName", e.target.value)}
                  placeholder="Enter school name"
                  className={errors.schoolName ? "border-red-500" : ""}
                />
                {errors.schoolName && (
                  <p className="text-red-500 text-xs">{errors.schoolName}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter email address"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>

              {/* Address */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter address"
                  className={errors.address ? "border-red-500" : ""}
                />
                {errors.address && (
                  <p className="text-red-500 text-xs">{errors.address}</p>
                )}
              </div>

              {/* City */}
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="Enter city"
                  className={errors.city ? "border-red-500" : ""}
                />
                {errors.city && (
                  <p className="text-red-500 text-xs">{errors.city}</p>
                )}
              </div>

              {/* Country */}
              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Select 
                  value={selectedCountryCode} 
                  onValueChange={(value) => {
                    console.log("Country selected:", value);
                    // Find the country name from the code and store it
                    const countryName = allCountries.find(c => c.isoCode === value)?.name ?? "";
                    // Store the country name in formData instead of the code
                    handleInputChange("country", countryName);
                    // Keep track of the code for UI purposes
                    setSelectedCountryCode(value);
                    // Reset state selection when country changes
                    setSelectedStateCode("");
                    handleInputChange("state", "");
                  }}
                  onOpenChange={setIsSelectOpen}
                >
                  <SelectTrigger className={errors.country ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select country">
                      {selectedCountryCode ? (
                        <div className="truncate flex items-center  ">
                          <img
                            src={`https://flagcdn.com/w20/${selectedCountryCode.toLowerCase()}.png`}
                            alt={formData.country || ""}
                            className="mr-2 h-4 rounded-sm w-6 "
                            loading="lazy"
                          />
                          {formData.country}
                        </div>
                      ) : "Select country"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="max-w-sm">
                    {countryItems}
                  </SelectContent>
                </Select>
                {errors.country && (
                  <p className="text-red-500 text-xs">{errors.country}</p>
                )}
              </div>

              {/* State */}
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select 
                  value={selectedStateCode} 
                  onValueChange={(value) => {
                    // Find the state name from the code and store it
                    const stateName = states.find(s => s.isoCode === value)?.name || "";
                    // Store the state name in formData instead of the code
                    handleInputChange("state", stateName);
                    // Keep track of the code for UI purposes
                    setSelectedStateCode(value);
                  }}
                  disabled={states.length === 0}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select state">
                      {formData.state}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Zipcode */}
              <div className="space-y-2">
                <Label htmlFor="zipcode">Zipcode *</Label>
                <Input
                  id="zipcode"
                  value={formData.zipcode}
                  onChange={(e) => handleInputChange("zipcode", e.target.value)}
                  placeholder="Enter zipcode"
                  className={errors.zipcode ? "border-red-500" : ""}
                />
                {errors.zipcode && (
                  <p className="text-red-500 text-xs">{errors.zipcode}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter phone number"
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs">{errors.phone}</p>
                )}
              </div>

              {/* Website */}
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="Enter website URL (optional)"
                  className={errors.website ? "border-red-500" : ""}
                />
                {errors.website && (
                  <p className="text-red-500 text-xs">{errors.website}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="Create a password"
                    className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Eye className="h-4 w-4" /> :  <EyeOff className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs">{errors.password}</p>
                )}
              </div>

              {/* School Logo */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="logo">School Logo *</Label>
                <div className="flex items-center space-x-4">
                  {!logoPreview ? (
                    <div className="flex-1">
                      <Label 
                        htmlFor="logo-upload" 
                        className={`flex items-center justify-center border-2 border-dashed rounded-md p-4 cursor-pointer ${
                          errors.logo ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <div className="text-center">
                          <Upload className="mx-auto h-6 w-6 text-gray-400" />
                          <span className="mt-2 block text-sm font-medium text-gray-600">
                            Click to upload logo
                          </span>
                        </div>
                        <input
                          id="logo-upload"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleLogoChange}
                        />
                      </Label>
                      {errors.logo && (
                        <p className="text-red-500 text-xs mt-1">{errors.logo}</p>
                      )}
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center">
                      <div className="relative mr-4">
                        <div className="h-20 w-20 relative">
                          <img
                            src={logoPreview}
                            alt="Logo preview"
                            className="h-full w-full object-contain rounded-md border border-gray-200"
                          />
                        </div>
                        <Button 
                          type="button" 
                          variant="destructive" 
                          size="sm" 
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                          onClick={() => {
                            setFormData({...formData, logo: null});
                            setLogoPreview(null);
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{formData.logo?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {formData.logo && (formData.logo.size / 1024 < 1024 
                            ? `${Math.round(formData.logo.size / 1024)} KB` 
                            : `${(formData.logo.size / (1024 * 1024)).toFixed(2)} MB`)}
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => {
                            document.getElementById('logo-upload')?.click();
                          }}
                        >
                          Change Logo
                        </Button>
                        <input
                          id="logo-upload"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleLogoChange}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 mt-6" disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>

            <div className="text-center">
              <Link href="/admin/login" className="text-sm text-green-600 hover:underline">
                Already have an account? Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  )
}


