import { PlanFeatures as PlanFeaturesType } from "@/types";
import { CheckCircle } from "lucide-react";
import { useMemo } from "react";

interface PlanFeaturesProps {
  features: PlanFeaturesType;
}

export default function PlanFeatures({ features }: PlanFeaturesProps) {
  const numericDetailItems: string[] = useMemo(() => {
    const entries = Object.entries(features) as Array<[
      keyof PlanFeaturesType & string,
      unknown
    ]>;

    const numericKeysWithDetail = entries
      .filter(([key, value]) => {
        if (typeof value === "boolean" || value == null) return false;
        const detailKey = `${key}_detail` as keyof PlanFeaturesType;
        const detailValue = features[detailKey];
        if (typeof detailValue !== "string" || !detailValue?.trim()) return false;
        const numericValue = typeof value === "number" ? value : Number(String(value));
        return Number.isFinite(numericValue) && numericValue > 0;
      })
      .sort(([a], [b]) => a.localeCompare(b));

    return numericKeysWithDetail.map(([key]) => {
      const detailKey = `${key}_detail` as keyof PlanFeaturesType;
      return String(features[detailKey] ?? "").trim();
    });
  }, [features]);

  // Extract boolean-backed details: show <key>_detail only when the boolean is true
  const booleanDetailItems: string[] = useMemo(() => {
    const entries = Object.entries(features) as Array<[
      keyof PlanFeaturesType & string,
      unknown
    ]>;

    const booleanTrueWithDetail = entries
      .filter(([key, value]) => {
        if (value !== true) return false;
        const detailKey = `${key}_detail` as keyof PlanFeaturesType;
        const detailValue = features[detailKey];
        return typeof detailValue === "string" && !!detailValue.trim();
      })
      .sort(([a], [b]) => a.localeCompare(b));

    return booleanTrueWithDetail.map(([key]) => {
      const detailKey = `${key}_detail` as keyof PlanFeaturesType;
      return String(features[detailKey] ?? "").trim();
    });
  }, [features]);


  return (
    <ul 
      className="space-y-2 h-fit overflow-y-auto no-scrollbar "
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
    >
      {numericDetailItems.map((detail, idx) => (
        <li key={`num-${idx}`} className="w-full
         flex items-start gap-2 line-clamp-2">
          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
          <span className="text-sm text-gray-700 line-clamp-2">{detail}</span>
        </li>
      ))}
      {booleanDetailItems.map((detail, idx) => (
        <li key={`bool-${idx}`} className="w-full
         flex items-start gap-2 line-clamp-2">
          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
          <span className="text-sm text-gray-700 line-clamp-2">{detail}</span>
        </li>
      ))}
    </ul>
  );
}
