
import { CloudDownload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/common/Label";

interface SubscriptionData {
  schools: {
    monthly: number;
    yearly: number;
  };
  individuals: {
    monthly: number;
    yearly: number;
  };
}

interface SubscriptionBreakdownProps {
  subscriptions: SubscriptionData;
}

export default function SubscriptionBreakdown({ subscriptions }: SubscriptionBreakdownProps) {
  const plans = ["Monthly", "Yearly"];
  return (
    <Card className="bg-[#F9F9FA] border  shadow-sm border-[#DBDBDB]">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900">Subscription Breakdown</CardTitle>
          <div className="flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 h-8 w-8">
            <CloudDownload className="h-4 w-4" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden space-y-1 ">
          {/* Header Row */}
          <div className=" bg-[#E6F1FD] overflow-hidden rounded-lg">
            <div className="grid grid-cols-3 gap-4 p-4 items-center ">
              <Label size={"sm"} variant={"semibold"} className="pl-2">Plans</Label>
              {plans.map((plan) => (
                <div key={plan} className="text-sm text-gray-600 text-center p-2">
                  <Label size={"sm"} variant={"semibold"} className="">{plan}</Label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Data Rows */}
          <div className="  rounded-lg bg-[#FFFFFF]">
            <div className="grid grid-cols-3 gap-4 p-3">
              <div className="text-sm font-medium text-gray-900 p-2">Schools</div>
              <div className="text-sm text-gray-600 text-center p-2">
                {subscriptions.schools.monthly.toLocaleString()} 
              </div>
              <div className="text-sm text-gray-600 text-center p-2">
                {subscriptions.schools.yearly.toLocaleString()} 
              </div>
            </div>
          </div>
          
          <div className="  rounded-lg bg-[#FFFFFF]">
            <div className="grid grid-cols-3 gap-4 p-3">
              <div className="text-sm font-medium text-gray-900 p-2">Individuals</div>
              <div className="text-sm text-gray-600 text-center p-2">
                    {subscriptions.individuals.monthly.toLocaleString()} 
              </div>
              <div className="text-sm text-gray-600 text-center p-2">
                {subscriptions.individuals.yearly.toLocaleString()} 
              </div>
              </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 