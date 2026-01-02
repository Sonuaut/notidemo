"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  Users,
  FileText,
  BookOpen,
  Mail,
  CreditCard,
  BarChart3,
} from "lucide-react";

interface SidebarProps {
  type: "super-admin" | "admin";
}

export function AppSidebar({ type }: SidebarProps) {
  const pathname = usePathname();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // In a real app, this would come from your auth context/API
    if (type === "super-admin") {
      setUserName("Super Admin");
      setUserEmail("superadmin@example.com");
    } else {
      setUserName("Admin User");
      setUserEmail("admin@example.com");
    }
  }, [type]);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const superAdminNavItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/super-admin/dashboard",
    },
    { name: "Schools", icon: BookOpen, path: "/super-admin/schools" },
    { name: "Plans", icon: FileText, path: "/super-admin/plans" },
    { name: "Admin Plans", icon: CreditCard, path: "/super-admin/admin-plans" },
  ];

  const adminNavItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { name: "Teachers", icon: Users, path: "/admin/users" },
    { name: "Templates", icon: FileText, path: "/admin/templates" },
    { name: "User Analytics", icon: BarChart3, path: "/admin/user-analytics" },
  ];

  const navItems = type === "super-admin" ? superAdminNavItems : adminNavItems;

  return (
    <Sidebar variant="floating" className="border-r border-border">
      <Link href="/">
        <SidebarHeader className="p-0">
          <div className="w-full flex items-center justify-center gap-2 font-semibold text-lg  py-4">
            <img className=" h-14 bg-green-200 " src="/Logo.png" />
          </div>
        </SidebarHeader>
      </Link>

      <SidebarContent className="">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.name} className="mx-4">
              <SidebarMenuButton
                asChild
                isActive={isActive(item.path)}
                tooltip={item.name}
                className=""
              >
                <Link href={item.path}>
                  <item.icon className="h-5 w-5" />
                  <span style={{ fontWeight: "bold" }}>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
