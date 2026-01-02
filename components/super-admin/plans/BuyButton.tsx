"use client";
import { useState } from "react";
import CommonButton from "@/components/common/Button";
import { createSubscriptionActionForAdmin, CreateSubscriptionPayloadForAdmin } from "@/actions/admin/subscription";
import { errorToast, successToast } from "@/components/hooks/use-toast";
import {  useRouter } from "next/navigation";

export default function BuyButton (payload: CreateSubscriptionPayloadForAdmin) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleBuySubscription = async () => {
    try {
      setLoading(true);
      const result = await createSubscriptionActionForAdmin(payload);
      if (result.success) {
        successToast("Subscription created successfully");
        router.push(result.data.data.result.checkout_url);
      } else {
        const parsedError=JSON.parse(result.error);
      console.log("parsedError", parsedError);
      errorToast(parsedError.message);
      }
    } catch (error:any) {
      console.log("error in BuyButton" );
      const parsedError=JSON.parse(error.error);
      console.log("parsedError", parsedError);
      errorToast(parsedError.message);
      errorToast("Failed to create subscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CommonButton
      onClick={handleBuySubscription}
      loading={loading}
      className="w-full bg-blue-500 hover:bg-blue-600 h-10"
    >
      {loading ? "Processing..." : "Buy Subscription"}
    </CommonButton>
  );
}
