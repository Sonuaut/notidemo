"use client";
import { useState, useEffect } from "react";
import CommonButton from "@/components/common/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  createPlanAction,
  createPlanFeaturesAction,
  updatePlanFeaturesAction,
} from "@/actions/super-admin/plans";
import { errorToast, successToast } from "@/components/hooks/use-toast";
import { PlanResponse, FormMode, RoleTypePlan } from "@/types";
import { PlanFeatures } from "@/types";
import { convertApiFeatureToPlanFeatures } from "@/lib/superadmin/plan-utils";
import PlanPriceAndFeatures from "../PlanPriceAndFeatures";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface PlanFormData {
  planName: string;
  roleType: RoleTypePlan;
  monthlyPrice: string;
  yearlyPrice: string;
  monthlyFeatures: PlanFeatures;
  yearlyFeatures: PlanFeatures;
}

interface CreateAndUpdatePlanFormProps {
  mode: FormMode;
  planData?: PlanResponse;
  onSuccess?: () => void;
  className?: string;
}

const DEFAULT_FEATURES: PlanFeatures = {
  sms_limit_detail: " ",
  email_limit_detail: " ",
  user_limit_detail: " ",
  preloaded_templates_detail: " ",
  custom_templates_detail: " ",
  realtime_alerts_detail: " ",
  multi_contact_send_detail: " ",
  dual_mode_detail: " ",
  inapp_upgrade_available_detail: " ",
  downloadable_history_detail: " ",
  message_translation_detail: " ",
  email_support_detail: " ",
  priority_email_support_detail: " ",
  user_analytics_detail: " ",
  sms_limit: " ",
  email_limit: " ",
  user_limit: " ",
  preloaded_templates: " ",
  custom_templates: " ",
  realtime_alerts: false,
  multi_contact_send: false,
  dual_mode: false,
  inapp_upgrade_available: false,
  downloadable_history: false,
  message_translation: false,
  email_support: false,
  priority_email_support: false,
  user_analytics: false,
  push_notifications: false,
  engagement_reports: false,
};

export default function CreateAndUpdatePlanForm({
  mode,
  planData,
  onSuccess,
  className,
}: CreateAndUpdatePlanFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  console.log("mode", mode);
  console.log("planData", planData);

  const [formData, setFormData] = useState<PlanFormData>({
    planName: "",
    roleType: RoleTypePlan.ORGANIZATION,
    monthlyPrice: "0",
    yearlyPrice: "0",
    monthlyFeatures: DEFAULT_FEATURES,
    yearlyFeatures: DEFAULT_FEATURES,
  });

  useEffect(() => {
    if (mode === FormMode.UPDATE && planData) {
      // Parse features from the array structure
      let monthlyFeatures = { ...DEFAULT_FEATURES } as PlanFeatures;
      let yearlyFeatures = { ...DEFAULT_FEATURES } as PlanFeatures;

      if (planData.plan_features && Array.isArray(planData.plan_features)) {
        // Find the monthly feature (is_monthly: true)
        const monthlyFeature = planData.plan_features.find(
          (feature: any) => feature.is_monthly === true
        );
        if (monthlyFeature) {
          monthlyFeatures = convertApiFeatureToPlanFeatures(monthlyFeature);
        }

        // Find the yearly feature: treat anything that is not explicitly true as yearly
        const yearlyFeature = planData.plan_features.find(
          (feature: any) => feature.is_monthly === false
        );

        if (yearlyFeature) {
          yearlyFeatures = convertApiFeatureToPlanFeatures(yearlyFeature);
        }
      }

      setFormData({
        planName: planData.title,
        roleType: planData.role_type_plan,
        monthlyPrice: planData.monthly_amount.toString(),
        yearlyPrice: planData.yearly_amount.toString(),
        monthlyFeatures: monthlyFeatures,
        yearlyFeatures: yearlyFeatures,
      });
    }
  }, [mode, planData]);

  const handleInputChange = (field: keyof PlanFormData, value: any) => {
    if (field === "monthlyPrice" || field === "yearlyPrice") {
      const numericValue = value.replace(/[^0-9.]/g, "");
      const parts = numericValue.split(".");
      if (parts.length > 2) return;

      setFormData((prev) => ({
        ...prev,
        [field]: numericValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleFeaturesChange = (
    type: "monthly" | "yearly",
    features: PlanFeatures
  ) => {
    setFormData((prev) => ({
      ...prev,
      [type === "monthly" ? "monthlyFeatures" : "yearlyFeatures"]: features,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode == FormMode.CREATE) {
        // Validate that both prices are provided and > 0
        const monthly = parseFloat(formData.monthlyPrice);
        const yearly = parseFloat(formData.yearlyPrice);
        const isMonthlyValid = Number.isFinite(monthly) && monthly >= 0;
        const isYearlyValid = Number.isFinite(yearly) && yearly >= 0;
        if (!isMonthlyValid || !isYearlyValid) {
          errorToast(
            "Monthly and Yearly price are required and must be greater than 0"
          );
          setLoading(false);
          return;
        }

        const planPayload = {
          title: formData.planName,
          monthly_amount: monthly,
          yearly_amount: yearly,
          role_type_plan: formData.roleType,
          // is_recharge: false,
        };
        // First create the plan
        const planResult = await createPlanAction(planPayload);
        console.log("planResult :", planResult);
        if (planResult.success) {
          // Set static user_limit value of 100 for both monthly and yearly features
          const monthlyFeaturesWithUserLimit = {
            ...formData.monthlyFeatures,
            user_limit: "100",
          } as PlanFeatures;
          const yearlyFeaturesWithUserLimit = {
            ...formData.yearlyFeatures,
            user_limit: "100",
          } as PlanFeatures;

          const featuresResult = await createPlanFeaturesAction(
            planResult.data.data.result,
            monthlyFeaturesWithUserLimit,
            yearlyFeaturesWithUserLimit
          );
          console.log("featuresResult :", featuresResult);
          if (featuresResult.success) {
            successToast("Plan created successfully!");
            router.push("/super-admin/plans");
            onSuccess?.();
          } else {
            errorToast("Failed to create plan features");
          }
        }
      } else if (mode === FormMode.UPDATE) {
        if (!planData?.id) {
          errorToast("Plan ID is required for update");
          setLoading(false);
          return;
        }

        if (planData.plan_features && planData.plan_features.length == 0) {
          // Set static user_limit value of 100 for both monthly and yearly features
          const monthlyFeaturesWithUserLimit = {
            ...formData.monthlyFeatures,
            user_limit: "100",
          } as PlanFeatures;
          const yearlyFeaturesWithUserLimit = {
            ...formData.yearlyFeatures,
            user_limit: "100",
          } as PlanFeatures;

          const featuresResult = await createPlanFeaturesAction(
            planData.id,
            monthlyFeaturesWithUserLimit,
            yearlyFeaturesWithUserLimit
          );

          if (featuresResult.success) {
            successToast("Plan updated successfully!");
            setLoading(false);
            router.push("/super-admin/plans");
            onSuccess?.();
          } else {
            errorToast("Failed to update plan features");
            setLoading(false);
            return;
          }
        } else {
          // Set static user_limit value of 100 for both monthly and yearly features
          const monthlyFeaturesWithUserLimit = {
            ...formData.monthlyFeatures,
            user_limit: "100",
          } as PlanFeatures;
          const yearlyFeaturesWithUserLimit = {
            ...formData.yearlyFeatures,
            user_limit: "100",
          } as PlanFeatures;

          const featuresUpdateResult = await updatePlanFeaturesAction(
            planData.id,
            monthlyFeaturesWithUserLimit,
            yearlyFeaturesWithUserLimit
          );
          console.log("featuresUpdateResult :", featuresUpdateResult);
          if (featuresUpdateResult.success) {
            successToast("Plan updated successfully!");
            setLoading(false);
            router.push("/super-admin/plans");
            onSuccess?.();
          } else {
            errorToast("Failed to update plan features");
            setLoading(false);
            return;
          }
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      errorToast("Failed to submit form");
    } finally {
      setLoading(false);
    }
  };

  const isUpdateMode = mode === FormMode.UPDATE;

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("space-y-3  sm:pt-4 ", className)}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Plan Name */}
        <div className="space-y-2">
          <Label htmlFor="planName">Plan Name</Label>
          <Input
            id="planName"
            value={formData.planName}
            className="h-9"
            onChange={(e) => handleInputChange("planName", e.target.value)}
            placeholder="Enter plan name"
            required
            disabled={isUpdateMode}
          />
        </div>

        {/* Role Type */}
        <div className="space-y-2">
          <Label>Role Type</Label>
          <div className="grid grid-cols-2 gap-4">
            <CommonButton
              type="button"
              onClick={() =>
                handleInputChange("roleType", RoleTypePlan.ORGANIZATION)
              }
              disabled={isUpdateMode}
              className={`rounded-lg h-9 w-full bg-gray-200 text-gray-500 hover:bg-[#8D8EF5] hover:text-white
                ${
                  formData.roleType === RoleTypePlan.ORGANIZATION &&
                  "w-full bg-[#8D8EF5] text-white"
                }
                ${isUpdateMode && "opacity-50 cursor-not-allowed"}`}
            >
              Organisation
            </CommonButton>
            <CommonButton
              type="button"
              onClick={() =>
                handleInputChange("roleType", RoleTypePlan.INDIVIDUAL)
              }
              disabled={isUpdateMode}
              className={`rounded-lg h-9 w-full bg-gray-200 text-gray-500 hover:bg-[#8D8EF5] hover:text-white
                ${
                  formData.roleType === RoleTypePlan.INDIVIDUAL &&
                  "w-full bg-[#8D8EF5] text-white"
                }
                ${isUpdateMode && "opacity-50 cursor-not-allowed"}`}
            >
              Individual
            </CommonButton>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4  ">
        {/* Monthly Plan */}
        <PlanPriceAndFeatures
          type="monthly"
          price={formData.monthlyPrice}
          features={formData.monthlyFeatures}
          onPriceChange={(value) => handleInputChange("monthlyPrice", value)}
          onFeaturesChange={(features) =>
            handleFeaturesChange("monthly", features)
          }
          isUpdateMode={isUpdateMode}
        />

        {/* Yearly Plan */}
        <PlanPriceAndFeatures
          type="yearly"
          price={formData.yearlyPrice}
          features={formData.yearlyFeatures}
          onPriceChange={(value) => handleInputChange("yearlyPrice", value)}
          onFeaturesChange={(features) =>
            handleFeaturesChange("yearly", features)
          }
          isUpdateMode={isUpdateMode}
        />
      </div>

      <div className="w-1/2 ml-auto flex justify-end gap-2">
        <CommonButton
          loading={loading}
          type="submit"
          className="bg-[#8D8EF5] text-white hover:bg-[#8D8EF5] hover:text-white rounded-lg h-10 px-7"
        >
          {isUpdateMode ? "Update Plan" : "Create Plan"}
        </CommonButton>
      </div>
    </form>
  );
}
