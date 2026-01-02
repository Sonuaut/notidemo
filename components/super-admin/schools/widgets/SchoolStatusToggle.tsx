'use client'
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { updateSchoolStatus } from "@/actions/super-admin/school";
import { errorToast, successToast } from "@/components/hooks/use-toast";

interface SchoolStatusToggleProps {
  schoolData:any
}

const SchoolStatusToggle: React.FC<SchoolStatusToggleProps> = ({ schoolData}:SchoolStatusToggleProps) => {
  const [loading, setLoading] = useState(false);
  const [is_active,setIsActive]=useState<boolean>(schoolData.status)


  const handleToggle = async () => {
    try {
      
    const result=await updateSchoolStatus({userId:schoolData.admin_id,is_active})
    if(result.status){
        successToast("Status Updated Succesfully")
        setIsActive(true)
    }
    } catch (err: any) {
      errorToast("Failed to update status")
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={is_active}
        onCheckedChange={handleToggle}
        aria-label={`Toggle ${schoolData.name} status`}
        disabled={loading}
        className=""
      />
      <span className={is_active ? "text-green-600" : "text-gray-500"}>
        {is_active ? "Active" : "Inactive"}
      </span>
      <div>{schoolData.admin_id}</div>
    </div>
  );
};

export default SchoolStatusToggle; 