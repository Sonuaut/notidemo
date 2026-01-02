'use client'
// import { AdminLayout } from "@/components/layout/admin-layout";
import StatsGrid from "@/components/super-admin/dashboard/StatsGrid";
// import SchoolsList from "@/components/super-admin/dashboard/SchoolsList";
// import TeachersList from "@/components/super-admin/dashboard/TeachersList";
// import RecentActivity from "@/components/super-admin/dashboard/RecentActivity";
// import { getAdminSchoolList,  } from "@/lib/superadmin/dashboard";
// import { IRole } from "@/types";
// import { getSuperAdminDashboardStats } from "@/components/dashboard/dashboard";
import { useEffect, useState } from "react";
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard`;


export default async function SuperAdminDashboard() {
    const [superAdminStats, setSuperAdminStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            setError("");
          
            try {

          
          
              // Step 2: Get the token
              const token = localStorage.getItem("superAdminAccessToken");
              if (!token) {
                throw new Error("Authentication token not found");
              }
          
              // Step 3: Prepare API call
              const API_URL = process.env.NEXT_PUBLIC_API_URL;
              const response = await fetch(`${API_URL}/api/v1/dashboard/`, {
                method: "GET",
                headers: {
                  "Authorization": `Bearer ${token}`,
                  "Content-Type": "application/json",
                  "ngrok-skip-browser-warning": "1",
                },
              });
          
              if (!response.ok) {
                const errorText = await response.text();
                console.error("API error response:", errorText);
                throw new Error(`API responded with status ${response.status}`);
              }
          
              // Step 4: Parse and validate response
              const data = await response.json();
              console.log("Dashboard API Response:", data);
          
              if (data.status !== 200) {
                throw new Error(data.message ?? "Failed to fetch dashboard stats");
              }
          
              if (!data.data || typeof data.data !== "object") {
                throw new Error("Unexpected API response structure");
              }
          
              // Step 5: Set stats
              setSuperAdminStats(data.data);
          
            } catch (err: any) {
              console.error("Error fetching dashboard stats:", err);
              setError(err.message ?? "Failed to load dashboard stats");
          
            } finally {
              setLoading(false);
            }
          };
          
      fetchStats();
    }, []);
  
    if (!superAdminStats) return <p>Loading dashboard...</p>;

// const schoolsData:any=await getAdminSchoolList({role:"admin"});
// const teachersData:any=await getAdminSchoolList({role:"teacher"});
// const schoolList=schoolsData.data.result;
// const teachersList:any=teachersData.data.result;

  return (
    // <AdminLayout type={IRole.SUPER_ADMIN}>
      <div className="   space-y-4 px-2 ">
        <div className="">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
            <span className="px-2 py-1 rounded-xl bg-blue-100 text-blue-700 text-xs font-semibold">Super Admin</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            A high-level overview of platform metrics and recent activities.
          </p>
        </div>
        <StatsGrid 
        total_admins={superAdminStats.data.school_count} 
        total_schools={superAdminStats.data.school_count}
        total_teachers={superAdminStats.data.teacher_count}
        total_students={superAdminStats.data.student_count}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
          {/* <SchoolsList  schoolList={schoolList}/> */}
          {/* <TeachersList teachersList={teachersList} /> */}
        </div>
        <div className="">
          {/* <RecentActivity /> */}
        </div>
      </div>
    // </AdminLayout>
  );
}
