import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TeacherData } from "@/lib/superadmin/teacher";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Eye, 
  CheckCircle, 
  XCircle, 
  Mail, 
  Phone, 

  UserCheck
} from "lucide-react";

interface TeacherDetailsDialogProps {
  teacher: TeacherData;
}

export default function TeacherDetailsDialog({ teacher }: TeacherDetailsDialogProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAccountType = () => {
    if (teacher.is_super_admin) return "Super Admin";
    if (teacher.is_admin) return "Admin";
    if (teacher.is_individual) return "Individual Teacher";
    return "School Teacher";
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100">
          <Eye className="h-4 w-4 text-[#8D8EF5]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Teacher Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={teacher.profile_img_url || "/placeholder-user.jpg"}
                alt={teacher.name}
              />
              <AvatarFallback className="bg-[#8D8EF5] text-white text-lg">
                {teacher.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{teacher.name}</h3>
                <p className="text-sm text-gray-500">{teacher.role || 'Teacher'}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="text-white" variant={teacher.is_active ? "default" : "secondary"}>
                  {teacher.is_active ? (
                    <><CheckCircle className="h-3 w-3 mr-1 text-white" /> Active</>
                  ) : (
                    <><XCircle className="h-3 w-3 mr-1" /> Inactive</>
                  )}
                </Badge>
                <Badge variant="outline">{getAccountType()}</Badge>
                {teacher.otp_verified && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <UserCheck className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">ID</p>
              <p className="font-mono text-sm">#{teacher.id}</p>
            </div>
          </div>
          <Separator />
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-900">Contact Information</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">Email:</span>
                <span className="text-gray-900">{teacher.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">Phone:</span>
                <span className="text-gray-900">{teacher.mobile_no || 'Not provided'}</span>
              </div>
            </div>
          </div>
          <Separator />
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-900">Account Information</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">School ID:</span>
                <p className="text-gray-900">{teacher.school_id ? `#${teacher.school_id}` : 'Individual Teacher'}</p>
              </div>
              <div>
                <span className="text-gray-600">Account Type:</span>
                <p className="text-gray-900">{getAccountType()}</p>
              </div>
              <div>
                <span className="text-gray-600">Joined:</span>
                <p className="text-gray-900">{formatDate(teacher.created_at)}</p>
              </div>
              <div>
                <span className="text-gray-600">Last Updated:</span>
                <p className="text-gray-900">{formatDate(teacher.updated_at)}</p>
              </div>
            </div>
          </div>

          {teacher.about && (
            <>
              <Separator />
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-900">About</h4>
                <p className="text-sm text-gray-700 leading-relaxed">{teacher.about}</p>
              </div>
            </>
          )}
          <Separator />
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-900">Verification Status</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Email Verified:</span>
                <div className="flex items-center space-x-1 mt-1">
                  {teacher.otp_verified ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className={teacher.otp_verified ? "text-green-600" : "text-red-600"}>
                    {teacher.otp_verified ? 'Verified' : 'Not Verified'}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-gray-600">Last OTP Sent:</span>
                <p className="text-gray-900">{teacher.otp_created_at ? formatDate(teacher.otp_created_at) : 'Never'}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 