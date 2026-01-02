"use client";

import { useState, useEffect } from "react";
import CommonButton from "@/components/common/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

import { createRechargeAction, updateRechargeAction } from "@/actions/super-admin/recharge";
import { errorToast, successToast } from "@/components/hooks/use-toast";
import { FormMode, RechargeResponse, RechargeType } from "@/types";

interface CreateAndUpdateRechargeFormProps {
  mode: FormMode;
  rechargeData?: RechargeResponse;
  onSuccess: () => void;
}

interface RechargeFormData {
  title: string;
  type: RechargeType;
  recharge_price: string;
  email_limit: string;
  sms_limit: string;
  email_detail: string;
  sms_detail: string;
  is_active: boolean;
}

export default function CreateAndUpdateRechargeForm({ 
  mode, 
  rechargeData, 
  onSuccess 
}: CreateAndUpdateRechargeFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<RechargeFormData>({
    title: "",
    type: RechargeType.EMAIL,
    recharge_price: "",
    email_limit: "",
    sms_limit: "",
    email_detail: "",
    sms_detail: "",
    is_active: true
  });

  useEffect(() => {
    if (mode === FormMode.UPDATE && rechargeData) {
      setFormData({
        title: rechargeData.title,
        type: rechargeData.type,
        recharge_price: rechargeData.recharge_price.toString(),
        email_limit: rechargeData.email_limit?.toString() || "",
        sms_limit: rechargeData.sms_limit?.toString() || "",
        email_detail: rechargeData.email_detail || "",
        sms_detail: rechargeData.sms_detail || "",
        is_active: rechargeData.is_active
      });
    }
  }, [mode, rechargeData]);

  const handleInputChange = (field: keyof RechargeFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.recharge_price) {
      errorToast("Please fill in all required fields");
      return;
    }

    // Validate based on selected type
    if (formData.type === RechargeType.EMAIL) {
      if (!formData.email_limit || !formData.email_detail) {
        errorToast("Please fill in email limit and email detail");
        return;
      }
    } else if (formData.type === RechargeType.SMS) {
      if (!formData.sms_limit || !formData.sms_detail) {
        errorToast("Please fill in SMS limit and SMS detail");
        return;
      }
    } else if (formData.type === RechargeType.BOTH) {
      if (!formData.email_limit || !formData.email_detail || !formData.sms_limit || !formData.sms_detail) {
        errorToast("Please fill in both email and SMS limits and details");
        return;
      }
    }

    try {
      setIsLoading(true);
      if (mode === FormMode.CREATE) {
        const payload: any = {
          title: formData.title,
          type: formData.type,
          recharge_price: parseFloat(formData.recharge_price),
          is_active: formData.is_active
        };

        // Add fields based on selected type
        if (formData.type === RechargeType.EMAIL) {
          payload.email_limit = parseInt(formData.email_limit) || 0;
          payload.email_detail = formData.email_detail;
          payload.sms_limit = 0;
          payload.sms_detail = "";
        } else if (formData.type === RechargeType.SMS) {
          payload.sms_limit = parseInt(formData.sms_limit) || 0;
          payload.sms_detail = formData.sms_detail;
          payload.email_limit = 0;
          payload.email_detail = "";
        } else if (formData.type === RechargeType.BOTH) {
          payload.email_limit = parseInt(formData.email_limit) || 0;
          payload.email_detail = formData.email_detail;
          payload.sms_limit = parseInt(formData.sms_limit) || 0;
          payload.sms_detail = formData.sms_detail;
        }
        
       const data = await createRechargeAction(payload);
      //  console.log("data", data);
       if(data.success){
        successToast("Recharge created successfully!");
        onSuccess();
       }else{
        errorToast(data.error ??   "Something went wrong");
       }    
        } else if (mode === FormMode.UPDATE && rechargeData) {
                 const payload: any = {
          id: rechargeData.id,
          title: formData.title,
          type: formData.type,
          recharge_price: parseFloat(formData.recharge_price),
          is_active: formData.is_active
        };

         // Add fields based on selected type
         if (formData.type === RechargeType.EMAIL) {
           payload.email_limit = parseInt(formData.email_limit) || 0;
           payload.email_detail = formData.email_detail;
           payload.sms_limit = 0;
           payload.sms_detail = "";
         } else if (formData.type === RechargeType.SMS) {
           payload.sms_limit = parseInt(formData.sms_limit) || 0;
           payload.sms_detail = formData.sms_detail;
           payload.email_limit = 0;
           payload.email_detail = "";
         } else if (formData.type === RechargeType.BOTH) {
           payload.email_limit = parseInt(formData.email_limit) || 0;
           payload.email_detail = formData.email_detail;
           payload.sms_limit = parseInt(formData.sms_limit) || 0;
           payload.sms_detail = formData.sms_detail;
         }
         
         await updateRechargeAction(payload);
        successToast("Recharge updated successfully!");
        onSuccess();
      }
    } catch (error) {
      errorToast(`${mode === FormMode.CREATE ? "Create" : "Update"} recharge failed`);
    } finally {
      setIsLoading(false);
    }
  };

  const isCreateMode = mode === FormMode.CREATE;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          placeholder="Enter recharge title"
          required
        />
      </div>

             {isCreateMode && (
         <div>
           <Label>Type *</Label>
           <div className="grid grid-cols-3 gap-4">
             <button
               type="button"
               onClick={() => handleInputChange("type", RechargeType.EMAIL)}
               className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                 formData.type === RechargeType.EMAIL
                   ? "bg-[#8D8EF5] text-white border-[#8D8EF5]"
                   : "bg-white text-gray-700 border-gray-300 hover:border-[#8D8EF5]"
               }`}
             >
               Email
             </button>
             <button
               type="button"
               onClick={() => handleInputChange("type", RechargeType.SMS)}
               className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                 formData.type === RechargeType.SMS
                   ? "bg-[#8D8EF5] text-white border-[#8D8EF5]"
                   : "bg-white text-gray-700 border-gray-300 hover:border-[#8D8EF5]"
               }`}
             >
               SMS
             </button>
             <button
               type="button"
               onClick={() => handleInputChange("type", RechargeType.BOTH)}
               className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                 formData.type === RechargeType.BOTH
                   ? "bg-[#8D8EF5] text-white border-[#8D8EF5]"
                   : "bg-white text-gray-700 border-gray-300 hover:border-[#8D8EF5]"
               }`}
             >
              Email & SMS
             </button>
           </div>
         </div>
       )}

             <div>
         <Label htmlFor="recharge_price">Price *</Label>
         <Input
           id="recharge_price"
           type="number"
           step="0.01"
           value={formData.recharge_price}
           onChange={(e) => handleInputChange("recharge_price", e.target.value)}
           placeholder="0.00"
           required
         />
       </div>

       <div className="flex items-center justify-between">
         <Label htmlFor="is_active">Active Status</Label>
         <Switch
           id="is_active"
           checked={formData.is_active}
           onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
           className="data-[state=checked]:bg-green-600"
         />
       </div>

             {formData.type === RechargeType.EMAIL && (
         <>
           <div>
             <Label htmlFor="email_limit">Email Limit *</Label>
             <Input
               id="email_limit"
               type="number"
               value={formData.email_limit}
               onChange={(e) => handleInputChange("email_limit", e.target.value)}
               placeholder="Enter email limit"
               required
             />
           </div>

           <div>
             <Label htmlFor="email_detail">Email Detail *</Label>
             <Textarea
               id="email_detail"
               value={formData.email_detail}
               onChange={(e) => handleInputChange("email_detail", e.target.value)}
               placeholder="Enter email recharge detail description"
               className="min-h-[80px]"
               required
             />
           </div>
         </>
       )}

               {formData.type === RechargeType.SMS && (
          <>
            <div>
              <Label htmlFor="sms_limit">SMS Limit *</Label>
              <Input
                id="sms_limit"
                type="number"
                value={formData.sms_limit}
                onChange={(e) => handleInputChange("sms_limit", e.target.value)}
                placeholder="Enter SMS limit"
                required
              />
            </div>

            <div>
              <Label htmlFor="sms_detail">SMS Detail *</Label>
              <Textarea
                id="sms_detail"
                value={formData.sms_detail}
                onChange={(e) => handleInputChange("sms_detail", e.target.value)}
                placeholder="Enter SMS recharge detail description"
                className="min-h-[80px]"
                required
              />
            </div>
          </>
        )}

        {formData.type === RechargeType.BOTH && (
          <>
            <div>
              <Label htmlFor="email_limit">Email Limit *</Label>
              <Input
                id="email_limit"
                type="number"
                value={formData.email_limit}
                onChange={(e) => handleInputChange("email_limit", e.target.value)}
                placeholder="Enter email limit"
                required
              />
            </div>

            <div>
              <Label htmlFor="email_detail">Email Detail *</Label>
              <Textarea
                id="email_detail"
                value={formData.email_detail}
                onChange={(e) => handleInputChange("email_detail", e.target.value)}
                placeholder="Enter email recharge detail description"
                className="min-h-[80px]"
                required
              />
            </div>

            <div>
              <Label htmlFor="sms_limit">SMS Limit *</Label>
              <Input
                id="sms_limit"
                type="number"
                value={formData.sms_limit}
                onChange={(e) => handleInputChange("sms_limit", e.target.value)}
                placeholder="Enter SMS limit"
                required
              />
            </div>

            <div>
              <Label htmlFor="sms_detail">SMS Detail *</Label>
              <Textarea
                id="sms_detail"
                value={formData.sms_detail}
                onChange={(e) => handleInputChange("sms_detail", e.target.value)}
                placeholder="Enter SMS recharge detail description"
                className="min-h-[80px]"
                required
              />
            </div>
          </>
        )}

      <div className="flex justify-end gap-2 pt-4">
        <CommonButton
          type="submit"
          disabled={isLoading}
          loading={isLoading}
          className="bg-[#8D8EF5] text-white hover:bg-[#8D8EF5]/90 rounded-lg h-10 px-5"
        >
          {isCreateMode ? "Create Recharge" : "Update Recharge"}
        </CommonButton>
      </div>
    </form>
  );
} 