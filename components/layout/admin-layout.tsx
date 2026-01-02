"use client";
import type React from "react";
import { AuthGuard } from "@/components/auth/auth-guard";
import { cn } from "@/lib/utils";
import WebSidebar from "./WebSidebar";
import PlansSelectionDialog from "@/components/admin/plans/PlansSelectionDialog";
import { useEffect, useState } from "react";
import { SubscriptionNormalized } from "@/lib/admin/subscription";
import { IRole } from "@/types";
import { useInactivityLogout } from "@/hooks/use-inactivity-logout";

interface AdminLayoutProps {
  children: React.ReactNode;
  type: "super-admin" | "admin";
  className?: string;
}

export function AdminLayout({ children, type, className }: AdminLayoutProps) {
  const [showDialog, setShowDialog] = useState(false);

  // Auto-logout after 20 seconds of inactivity
  useInactivityLogout({
    inactivityTime: 900000, // 20 seconds in milliseconds
    type: type === "super-admin" ? "super-admin" : "admin",
  });

  useEffect(() => {
    async function fetchSubscription() {
      const reponse = await fetch(`/api/subscription`);

      const data = await reponse.json();
      console.log("reponse", data);
      if (data.success) {
        if (data.data == undefined) {
          setShowDialog(true);
        } else {
          setShowDialog(false);
        }
      }
    }
    if (type == IRole.ADMIN) {
      fetchSubscription();
    }
  }, []);

  return (
    <AuthGuard type={type}>
      <div className="w-full flex min-h-screen flex-col ">
        <div className="flex flex-1">
          <WebSidebar />
          <div className="flex flex-1 flex-col">
            <main className="flex-1 overflow-auto bg-muted/20">
              <div className={cn(" px-4 md:px-6 py-4 md:py-6", className)}>
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
