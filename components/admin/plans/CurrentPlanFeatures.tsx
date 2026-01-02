
import type { PlanFeatures } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Hash } from "lucide-react";
import { Label } from "@/components/common/Label";

interface CurrentPlanFeaturesProps {
  features?: PlanFeatures | null;
  title?: string;
}

const NUMERIC_KEYS = [
  "sms_limit",
  "email_limit",
  "preloaded_templates",
  "custom_templates",
  "user_limit",
] as const;

type NumericKey = typeof NUMERIC_KEYS[number];

function toTitle(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

export default function CurrentPlanFeatures({ features, title = "Plan Features" }: CurrentPlanFeaturesProps) {
  if (!features) return null;


const numericItems = {
    sms_limit: features.sms_limit,
    email_limit: features.email_limit,
    user_limit: features.user_limit,
    preloaded_templates: features.preloaded_templates,
    custom_templates: features.custom_templates,
}
  // Boolean features (true) excluding numeric keys and *_detail fields and known meta flags
  const booleanItems = Object.entries(features)
    .filter(([key, value]) =>
      typeof value === "boolean" && value === true &&
      !(NUMERIC_KEYS as readonly string[]).includes(key) &&
      key !== "is_active" && key !== "is_monthly"
    )
    .map(([key]) => ({ key }));


  return (
    <Card className="border-indigo-200">
      <CardHeader >
      <div className="w-full flex items-center gap-2 justify-between">
      <CardTitle className="text-base font-semibold text-gray-900">{title}</CardTitle>
      <Badge className="bg-indigo-100 text-indigo-700">{features.is_monthly ? "Monthly" : "Yearly"}</Badge>
      </div>
      </CardHeader>
      <CardContent className="space-y-4 w-full ">
      <div className="w-full grid grid-cols-5 gap-3">
      {Object.entries(numericItems).map(([key, value]) => (
        <li key={key} className="flex items-start gap-4 justify-between rounded-md border bg-white border-indigo-100 p-3">
                <span className="text-sm text-gray-700">{toTitle(key)}</span>
                <span className="text-sm text-gray-500">{value}</span>
                </li>
       ))}
      </div>

        {/* Boolean true feature tags */}
        {booleanItems.length > 0 && (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {booleanItems.map(({ key }) => (
                <li key={key} className="flex items-start gap-2 rounded-md border bg-white border-indigo-100 p-3">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-700">{toTitle(key)}</span>
                </li>
              ))}
            </ul>

        )}
      </CardContent>
    </Card>
  );
}
