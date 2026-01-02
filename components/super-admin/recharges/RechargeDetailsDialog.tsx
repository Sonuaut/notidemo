
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, CreditCard, Calendar, DollarSign, Clock, Type, Award, Power } from "lucide-react";
import { RechargeResponse, RechargeType } from "@/types";
import RechargeStatusSwitcher from "./RechargeStatusSwitcher";

interface RechargeDetailsDialogProps {
  recharge: RechargeResponse;
}

export default function RechargeDetailsDialog({ recharge }: RechargeDetailsDialogProps) {
  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeColor = (type: RechargeType) => {
    return type === RechargeType.EMAIL ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800";
  };

  const getTypeIcon = (type: RechargeType) => {
    return type === RechargeType.EMAIL ? "📧" : "📱";
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
          <Eye className="h-5 w-5 text-[#8D8EF5]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-[#8D8EF5]" />
            Recharge Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Main Info Card */}
          <Card className="border-l-4 border-l-[#8D8EF5] shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl text-gray-800 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-[#8D8EF5]" />
                  {recharge.title}
                </span>
                <Badge className={`${getTypeColor(recharge.type)} border-0 text-sm font-medium px-3 py-1`}>
                  {getTypeIcon(recharge.type)} {recharge.type}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                  <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-green-800 text-sm mb-1">Price</h4>
                  <p className="text-2xl font-bold text-green-900">{formatPrice(recharge.recharge_price)}</p>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                  <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-blue-800 text-sm mb-1">Credits</h4>
                  <p className="text-2xl font-bold text-blue-900">{recharge.email_limit}</p>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                  <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-purple-800 text-sm mb-1">Validity</h4>
                  <p className="text-xl font-bold text-purple-900">{recharge.sms_limit}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Info Card */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#8D8EF5]" />
                Timeline Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <h4 className="font-medium text-gray-700 text-sm">Created At</h4>
                      <p className="text-gray-900 font-medium">{formatDate(recharge.created_at)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <h4 className="font-medium text-gray-700 text-sm">Last Updated</h4>
                      <p className="text-gray-900 font-medium">{formatDate(recharge.updated_at)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status Card */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <Power className="h-5 w-5 text-[#8D8EF5]" />
                Status Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${recharge.is_active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm font-medium text-gray-700">Current Status</span>
                </div>
                <RechargeStatusSwitcher recharge={recharge} />
              </div>
            </CardContent>
          </Card>

          {/* ID Card */}
          <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-medium text-gray-600">Recharge ID:</span>
                <Badge variant="outline" className="font-mono text-sm px-3 py-1">
                  #{recharge.id}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
} 