import { IRole } from "@/types";
import {
  Home,
  Users,
  BookOpen,
  Building,
  Grid2X2,
  FileText,
  CreditCard,
  UserCheck,
  UserPlus,
  BarChart3,
} from "lucide-react";
import { SubscriptionNormalized } from "../admin/subscription";

export const sidebarItems = {
  [IRole.SUPER_ADMIN]: [
    {
      href: "/super-admin/dashboard",
      label: "Dashboard",
      icon: <Grid2X2 className="h-5 w-5" />,
    },
    {
      href: "/super-admin/schools",
      label: "Schools",
      icon: <Building className="h-5 w-5" />,
    },
    {
      href: "/super-admin/plans",
      label: "Plans",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      href: "/super-admin/recharges",
      label: "Recharges",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      href: "/super-admin/teachers",
      label: "Teachers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      href: "/super-admin/templates",
      label: "Templates",
      icon: <BookOpen className="h-5 w-5" />,
    },
  ],
  [IRole.ADMIN]: [
    {
      href: "/admin/dashboard",
      label: "Dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      href: "/admin/users",
      label: "Teachers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      href: "/admin/staff",
      label: "Staff",
      icon: <UserCheck className="h-5 w-5" />,
    },
    {
      href: "/admin/parents",
      label: "Parents",
      icon: <UserPlus className="h-5 w-5" />,
    },
    {
      href: "/admin/templates",
      label: "Templates",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      href: "/admin/plans",
      label: "Plan",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      href: "/admin/user-analytics",
      label: "User Analytics",
      icon: <BarChart3 className="h-5 w-5" />,
    },
  ],
};

export function getSidebarItems(
  role: IRole,
  subscription: SubscriptionNormalized
) {
  return sidebarItems[role].map((item) => ({
    ...item,
    href: item.href.replace(
      ":subscriptionId",
      subscription?.subscriptionId?.toString() ?? ""
    ),
  }));
}
