import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SuperAdminProfile {
  id: number;
  email: string;
  role: string;
  name: string;
  mobile_no: string;
  about: string;
  profile_img_url: string | null;
  is_super_admin: boolean;
  is_admin: boolean;
  is_active: boolean;
  otp_verified: boolean;
  school_id: number | null;
  created_at: string;
  updated_at: string;
}

interface SuperAdminProfileInfoProps {
  profile: SuperAdminProfile;
}

export function SuperAdminProfileInfo({ profile }: SuperAdminProfileInfoProps) {
  return (
    <Card className="shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          View your profile information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center flex-col space-y-4 mb-6">
          <Avatar className="rounded-lg h-24 w-24">
            {profile.profile_img_url ? (
              <AvatarImage
                src={profile.profile_img_url}
                alt={profile.name}
              />
            ) : (
              <AvatarFallback className="text-lg">
                {profile.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>

          <div className="text-center">
            <h3 className="text-lg font-medium">{profile.name}</h3>
            <p className="text-sm text-muted-foreground">{profile.email}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Role: {profile.role}
            </p>
            {profile.mobile_no && (
              <p className="text-xs text-muted-foreground">
                Mobile: {profile.mobile_no}
              </p>
            )}
          </div>
        </div>

        {profile.about && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">About</h4>
            <p className="text-sm text-muted-foreground">{profile.about}</p>
          </div>
        )}

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Account Status</h4>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">
              Status: {profile.is_active ? "Active" : "Inactive"}
            </p>
            <p className="text-xs text-muted-foreground">
              Email Verified: {profile.otp_verified ? "Yes" : "No"}
            </p>
            <p className="text-xs text-muted-foreground">
              Member since: {new Date(profile.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 