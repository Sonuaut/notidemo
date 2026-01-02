'use client'
import { BookOpen, Users, Shield, User } from "lucide-react";
import Link from "next/link";

export default function StatsGrid({
  total_admins,
  total_students,
  total_schools,
  total_teachers,
}: {
  total_schools: number ;
  total_teachers: number ;
  total_admins: number ;
  total_students: number ;
}) {
  const stats = [
    {
      label: "Total Schools",
      value: total_schools |0,
      icon: BookOpen,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      link: "/super-admin/schools",
      hoverColor: "hover:border-blue-300 hover:shadow-blue-100",
    },
    {
      label: "Total Teachers",
      value: total_teachers|0,
      icon: Users,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
      link: "/super-admin/teachers",
      hoverColor: "hover:border-purple-300 hover:shadow-purple-100",
    },
    {
      label: "Total Admins",
      value: total_admins |0,
      icon: Shield,
      iconColor: "text-yellow-600",
      iconBg: "bg-yellow-100",
      link: "/super-admin/users?role=admin",
      hoverColor: "hover:border-yellow-300 hover:shadow-yellow-100",
    },
    {
      label: "Total Students",
      value: total_students |0,
      icon: User,
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
      link: "/super-admin/users?role=student",
      hoverColor: "hover:border-green-300 hover:shadow-green-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Link
            key={stat.label}
            href={stat.link}
            className={`flex items-center w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 p-4 min-h-[80px] cursor-pointer group focus:outline-none focus:ring-2 focus:ring-blue-200 ${stat.hoverColor}`}
          >
            <div className={`flex items-center justify-center rounded-lg ${stat.iconBg} ${stat.iconColor} h-12 w-12 shadow-sm group-hover:scale-105 transition-transform mr-4`}>
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium text-gray-500">{stat.label}</span>
              <span className="text-2xl font-extrabold text-gray-900">{stat.value}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
} 