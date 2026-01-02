"use client";
import { useEffect, useState } from "react";
import { getSidebarItems } from "@/lib/common/sidebar";
import { ICookiesKey, IRole, User } from "@/types";
import SidebarLink from "./sidebar/Sidebarlink";
import Logout from "./sidebar/Logout";
import Image from "next/image";
import { Label } from "../common/Label";
import Setting from "./sidebar/Setting";
import { SubscriptionNormalized } from "@/lib/admin/subscription";
import Link from "next/link";


export default function WebSidebar() {
  const [role, setRole] = useState<IRole | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] =
    useState<SubscriptionNormalized | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem(ICookiesKey.ROLE);
    const userData = localStorage.getItem(ICookiesKey.USER);
    setRole(storedRole as IRole);
    setUser(JSON.parse(userData as any));
    // fetchProfile()
  }, []);
  useEffect(() => {
    async function fetchSubscription() {
      const reponse = await fetch(`/api/subscription`);
      const data = await reponse.json();
      if (data.success) {
        setSubscription(data.data);
      }
    }
    role == IRole.ADMIN && fetchSubscription();
  }, []);

  const links = role
    ? getSidebarItems(role, subscription as SubscriptionNormalized)
    : [];
  const settingsPath =
    role === IRole.SUPER_ADMIN ? "/super-admin/profile" : "/admin/profile";

  return (
    <div className="min-w-64 sticky top-0 flex h-screen w-64 flex-col border-r bg-gray-50">
      <div className="flex flex-1 flex-col justify-between p-4">
        <div className="flex flex-col gap-y-1">
          <Link href={"/"} className="mb-4 flex justify-center">
            <Image
              src={"/notifly-svg.svg"}
              alt="Notifly Logo"
              width={150}
              height={150}
            />
          </Link>

          <nav className="flex flex-col gap-y-2">
            {links.map((link) => (
              <SidebarLink
                key={link.href}
                href={link.href}
                icon={link.icon}
                label={link.label}
              />
            ))}
          </nav>
        </div>
        <div className="bg-white px-4 py-4 space-y-6 shadow-sm border rounded-2xl">
          <div className="flex items-center gap-3">
            <Image
              src={user?.profile_img_url || "/placeholder-user.jpg"}
              alt="User"
              width={45}
              height={45}
              className="rounded-full border w-12 h-12"
            />
            <div className="flex flex-col justify-start">
              <Label size="sm">{user?.name || "Jane Cooper"}</Label>
              <Label size="xs" className="text-gray-500">
                {role === IRole.ADMIN
                  ? "Admin"
                  : role === IRole.SUPER_ADMIN
                  ? "Super Admin"
                  : "User"}
              </Label>
            </div>
          </div>
          <div className="w-full grid grid-cols-2 items-center gap-2">
            <Setting settingsPath={settingsPath} />
            <Logout role={role as IRole} />
          </div>
        </div>
      </div>
    </div>
  );
}
