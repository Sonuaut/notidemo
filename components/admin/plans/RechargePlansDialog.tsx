"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CommonButton from "@/components/common/Button";
import { Badge } from "@/components/ui/badge";
import { RechargeType } from "@/lib/superadmin/recharge";
import { createRechargeSubscriptionAction } from "@/actions/admin/recharge";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

interface ApiResponse {
  status: boolean;
  data?: any;
}

export default function RechargePlansDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [plans, setPlans] = useState<any[]>([]);
  const [type, setType] = useState<RechargeType>(RechargeType.EMAIL);
  const [rechargeLoading, setRechargeLoading] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const res = await fetch(`/api/recharge?limit=50&offset=0&type=${type}`);
        const data: ApiResponse = await res.json();

        if (!data.status) {
          setError("Failed to fetch recharge plans");
          setPlans([]);
          setLoading(false);
        } else {
          setPlans(
            Array.isArray(data.data) ? data.data : data.data?.result ?? []
          );
          setLoading(false);
        }
      } catch {
        setError("Failed to fetch recharge plans");
        setPlans([]);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    })();
  }, [open, type]);

  const filtered = useMemo(() => plans, [plans]);

  async function handleSelectRecharge(rechargeId: number, price: number) {
    try {
      setRechargeLoading(rechargeId);
      setError(null);
      const res = await createRechargeSubscriptionAction({
        recharge_plan_id: rechargeId,
        is_mobile: false,
      });
      if (!res?.success) {
        setError((res as any)?.error || "Failed to start recharge checkout");
        return;
      }
      console.log("res", res);
      const checkoutUrl = res?.data?.data?.checkout_url;
      console.log("checkoutUrl", checkoutUrl);
      if (price > 0 && checkoutUrl) {
        window.location.href = checkoutUrl as string;
        return;
      }
      // Free recharge: redirect to success page where we'll fetch by session id if provided
      // router.push('/admin/recharge/success');
    } catch {
      setError("Failed to start recharge checkout");
    } finally {
      setRechargeLoading(null);
    }
  }

  const badgeCls = (t: string) =>
    t === "SMS"
      ? "bg-orange-100 text-orange-700"
      : t === "Email"
      ? "bg-blue-100 text-blue-700"
      : "bg-purple-100 text-purple-700";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg max-w-none h-[70vh] flex flex-col ">
        <DialogHeader className="border-none pb-2">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Recharge Credits
          </DialogTitle>
        </DialogHeader>

        {/* Centered toggle directly below header */}
        <div className="w-full flex items-center justify-center mb-2">
          <div className="inline-flex rounded-full border border-gray-200 bg-gray-50 p-1">
            <button
              disabled={loading}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                type === RechargeType.EMAIL
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setType(RechargeType.EMAIL)}
            >
              Email
            </button>
            <button
              disabled={loading}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                type === RechargeType.SMS
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setType(RechargeType.SMS)}
            >
              SMS
            </button>
            <button
              disabled={loading}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                type === RechargeType.EMAIL_AND_SMS
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setType(RechargeType.EMAIL_AND_SMS)}
            >
              Email & SMS
            </button>
          </div>
        </div>

        {error && (
          <div className="text-sm text-red-600 py-2 text-center">{error}</div>
        )}
        {!loading && !error && filtered.length === 0 && (
          <div className="text-sm text-gray-500 py-4 text-center">
            No recharge plans found.
          </div>
        )}

        {/* Cards area starts at top, scrolls if needed */}
        {!loading && !error && filtered.length > 0 && (
          <div className="relative h-full overflow-y-auto">
            <div className="space-y-2 px-2">
              {filtered.map((p) => (
                <div
                  key={p.id}
                  className="w-full rounded-lg border border-gray-200 bg-white p-3 shadow-sm hover:shadow-md transition-all duration-200 hover:border-[#8D8EF5]/30"
                >
                  <div className="flex items-center justify-between">
                    {/* Left side - Title and Subheading */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-gray-900 truncate  capitalize">
                          {p.title}
                        </h3>
                        <Badge
                          className={
                            badgeCls(p.type) +
                            " text-xs font-medium capitalize px-2 py-0.5"
                          }
                        >
                          {p.type.replace("_", " ")}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600">
                        {p.type === RechargeType.EMAIL &&
                          `${p.email_limit} Email Credits`}
                        {p.type === RechargeType.SMS &&
                          `${p.sms_limit} SMS Credits`}
                        {p.type === RechargeType.EMAIL_AND_SMS &&
                          `${p.email_limit} Email + ${p.sms_limit} SMS Credits`}
                      </p>
                    </div>

                    {/* Right side - Price and Button */}
                    <div className="flex items-center gap-3 ml-3">
                      <div className="text-right">
                        <div className="text-sm font-bold text-[#8D8EF5]">
                          ${p.recharge_price}
                        </div>
                      </div>
                      <CommonButton
                        loading={rechargeLoading === p.id}
                        onClick={() =>
                          handleSelectRecharge(p.id, Number(p.recharge_price))
                        }
                        className="h-8 px-3 bg-[#8D8EF5] text-white hover:bg-[#8D8EF5]/90 rounded-md text-xs font-medium transition-colors duration-200"
                      >
                        Select
                      </CommonButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {loading && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <Loader className="animate-spin w-6 h-6 text-gray-600" />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
