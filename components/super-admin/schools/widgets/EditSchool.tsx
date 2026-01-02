'use client'
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {  Pencil } from "lucide-react";
import { SelectCountry } from "@/components/common/SelectCountry";
import { SelectState } from "@/components/common/SelectState";
import { Country, State } from "country-state-city";
import CommonButton from "@/components/common/Button";
import { updateSchool } from '@/actions/super-admin/school';
import { errorToast, successToast } from "@/components/hooks/use-toast";
import { useRouter } from "next/navigation";
import GoToSchoolLink from "./GoToSchoolLink";
import TooltipWrapper from "@/components/common/TooltipWrapper";


const EditSchool = ({editingSchool,schoolData}:{editingSchool:boolean,schoolData:any}) => {
  // console.log("schhol data in form :",schoolData)
  const router=useRouter()
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    school_name: schoolData?.name||"",
    address: schoolData?.address ||"",
    city: schoolData?.city||"",
    state: schoolData?.state ||"",
    country: schoolData?.country ||"",
    zipcode: schoolData?.zipcode ||"",
    website: schoolData?.website ||"",
    mobile_no: schoolData?.mobile_no ||"",
    email: schoolData?.email ||"",
    is_active: schoolData?.status,
  });
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>("");
  const [selectedStateCode, setSelectedStateCode] = useState<string>("");

  // Helper function to get country code from country name
  const getCountryCodeFromName = (countryName: string): string => {
    if (!countryName) return "";
    const allCountries = Country.getAllCountries();
    const country = allCountries.find(c => c.name === countryName);
    return country?.isoCode || "";
  };

  // Helper function to get state code from state name and country code
  const getStateCodeFromName = (stateName: string, countryCode: string): string => {
    if (!stateName || !countryCode) return "";
    const states = State.getStatesOfCountry(countryCode);
    const state = states.find(s => s.name === stateName);
    return state?.isoCode || "";
  };

  // Set initial country and state codes when component mounts or schoolData changes
  useEffect(() => {
    if (schoolData?.country) {
      const countryCode = getCountryCodeFromName(schoolData.country);
      setSelectedCountryCode(countryCode);
      
      if (schoolData?.state && countryCode) {
        const stateCode = getStateCodeFromName(schoolData.state, countryCode);
        setSelectedStateCode(stateCode);
      }
    }
  }, [schoolData]);

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
    setOpen(false);
  };

  const handleCountryChange = (countryCode: string, countryName: string) => {
    setSelectedCountryCode(countryCode);
    setFormData({
      ...formData,
      country: countryName,
      state: "", // Reset state when country changes
    });
    setSelectedStateCode(""); // Reset state code
  };

  const handleStateChange = (stateCode: string, stateName: string) => {
    setSelectedStateCode(stateCode);
    setFormData({
      ...formData,
      state: stateName,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdateLoading(true);
    try {
      if (editingSchool) {
       const {status}= await updateSchool({
          userId: schoolData.admin_id,
          school_name: formData.school_name,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          zipcode: formData.zipcode,
          website: formData.website ?? "",
          is_active: formData.is_active,
        });
        if(status){
        successToast("School Updated Successfully");
        setOpen(false)
        router.refresh();
        }else {errorToast(editingSchool?"Failed to update school":"Failed To addSchool") ;setOpen(false)}
        router.refresh()
        
      }
    } catch (err: any) {
      errorToast(editingSchool?"Failed to update school":"Failed To addSchool");
      setOpen(false)

    } finally {
      setIsUpdateLoading(false);
      router.refresh()
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipWrapper label='Edit School'>
      <DialogTrigger asChild className="w-fits">
        <Button asChild variant="ghost" size="icon" aria-label="View School Users" className="p-2 text-gray-700 cursor-pointer">
        <Pencil className="h-8 w-8" />
        </Button>
      </DialogTrigger>
      </TooltipWrapper>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit School</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="school_name">School Name</Label>
              <Input
                id="school_name"
                value={formData.school_name}
                onChange={(e) =>
                  setFormData({ ...formData, school_name: e.target.value })
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
                  setFormData({ ...formData, address: e.target.value })
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
                  setFormData({ ...formData, city: e.target.value })
                }
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="country">Country</Label>
              <div className="col-span-3">
                <SelectCountry
                  onCountryChange={handleCountryChange}
                  defaultValue={selectedCountryCode}
                  placeholder="Select a country"
                  className="w-full"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="state">State</Label>
              <div className="col-span-3">
                <SelectState
                  countryCode={selectedCountryCode}
                  onStateChange={handleStateChange}
                  defaultValue={selectedStateCode}
                  placeholder="Select a state"
                  className="w-full"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="zipcode">Zipcode</Label>
              <Input
                id="zipcode"
                value={formData.zipcode}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/\D/g, "");
                  setFormData({ ...formData, zipcode: numericValue });
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
                  setFormData({ ...formData, website: e.target.value })
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
                  setFormData({ ...formData, email: e.target.value })
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
            <Button type="button" variant="outline" onClick={resetForm}>
              Cancel
            </Button>
            <Button disabled={isUpdateLoading} type="submit">
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditSchool;
