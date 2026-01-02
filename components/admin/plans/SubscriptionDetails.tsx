"use client";
import { useState } from "react";
import { SubscriptionNormalized } from "@/lib/admin/subscription";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CommonButton from "@/components/common/Button";
import { PlanResponse } from "@/types";
import { CalendarDays, CreditCard } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import CancelSubscriptionDialog from "./CancelSubscriptionDialog";

export default function SubscriptionDetails({
  sub,
  toggle_isMonthly,
  allPlansData,
}: {
  sub: SubscriptionNormalized;
  toggle_isMonthly: boolean;
  allPlansData: PlanResponse[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  function handleUpgradeClick() {
    const params = new URLSearchParams(searchParams?.toString());
    params.set("updateplan", "true");
    router.push(`${pathname}?${params.toString()}`);
  }

  function handleCancelClick() {
    setCancelDialogOpen(true);
  }

  function handleCancelSuccess() {
    // Refresh the page or update the subscription data
    window.location.reload();
  }
  return (
    <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 to-white">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base font-semibold text-gray-900">
              Your Current Plan
            </CardTitle>
            <div className="mt-1 text-sm text-gray-600">
              Enjoy uninterrupted access to premium features
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              className={`${
                sub.isActive
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {sub.isActive ? "Active" : "Inactive"}
            </Badge>
            <Badge className="bg-blue-100 text-blue-800">{sub.cycle}</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 text-sm">
        {/* Plan summary */}
        <div className="rounded-lg border border-indigo-100 bg-white p-4 shadow-sm">
          <div className="text-gray-500">Plan</div>
          <div className="mt-1 text-lg font-semibold text-gray-900">
            {sub.planTitle}
          </div>
          <div className="text-xs text-indigo-700 font-medium px-2 py-1 inline-block rounded bg-indigo-50 mt-2">
            {sub.roleTypePlan}
          </div>
        </div>

        {/* Billing summary */}
        <div className="rounded-lg border border-indigo-100 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-gray-500">Billing</div>
            <CreditCard className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="mt-1 text-lg font-semibold text-gray-900">
            ${sub?.total_amount || sub.amount}{" "}
            <span className="text-sm text-gray-600">
              / {sub.cycle.toLowerCase()}
            </span>
          </div>
          <div className="mt-1 text-xs text-gray-600">
            Auto Pay: {sub.isAutoPay ? "On" : "Off"}
          </div>
        </div>

        {/* Period summary */}
        <div className="rounded-lg border border-indigo-100 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-gray-500">Period</div>
            <CalendarDays className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="mt-1 text-sm font-medium text-gray-900">
            {new Date(sub.startDate).toLocaleDateString()} —{" "}
            {new Date(sub.endDate).toLocaleDateString()}
          </div>
          <div className="mt-1 text-xs text-gray-600">
            Renews automatically unless cancelled
          </div>
        </div>

        {/* Renewal Date - Highlighted */}
        <div className="rounded-lg border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-orange-700 font-medium">Next Renewal</div>
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
          </div>
          <div className="mt-2 text-lg font-bold text-orange-800">
            {new Date(sub.endDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="mt-1 text-xs text-orange-600">
            {(() => {
              const daysUntilRenewal = Math.ceil(
                (new Date(sub.endDate).getTime() - new Date().getTime()) /
                  (1000 * 60 * 60 * 24)
              );
              if (daysUntilRenewal > 0) {
                return `${daysUntilRenewal} day${
                  daysUntilRenewal === 1 ? "" : "s"
                } until renewal`;
              } else if (daysUntilRenewal === 0) {
                return "Renews today!";
              } else {
                return "Renewal overdue";
              }
            })()}
          </div>
        </div>

        {/* Upgrade CTA */}
        <div className="lg:col-span-2 xl:col-span-4 flex items-center justify-between rounded-lg border border-indigo-100 bg-white p-4 shadow-sm">
          <div className="text-sm text-gray-700">
            Want more? Explore higher limits and premium support with an
            upgrade.
          </div>
          {/* <UpgradePlanDialog plansData={allPlansData} is_monthly={toggle_isMonthly}> */}
          <div className="flex items-center gap-2">
            <CommonButton
              onClick={handleUpgradeClick}
              className="w-fit bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg h-9 px-5"
            >
              Upgrade Plan
            </CommonButton>

            <button
              onClick={handleCancelClick}
              className="w-fit bg-red-600 text-white hover:bg-red-700 rounded-lg h-9 px-5"
            >
              Cancel Subscription
            </button>
          </div>
          {/* </UpgradePlanDialog> */}
        </div>
      </CardContent>

      {/* Cancel Subscription Dialog */}
      <CancelSubscriptionDialog
        open={cancelDialogOpen}
        onOpenChange={setCancelDialogOpen}
        onCancelSuccess={handleCancelSuccess}
      />
    </Card>
  );
}
