import { getCookie } from "@/actions/cookie";
import { ICookiesKey, IRole } from "@/types";

export async function getPageTitle(pathname: string, ): Promise<string> {
    const role=await getCookie(ICookiesKey.ROLE)
    const userType=role as IRole
    const cleanPath = pathname.toLowerCase();
    // Super Admin pages
    if (userType == IRole.SUPER_ADMIN) {
      if (cleanPath.includes('/super-admin/dashboard')) return 'Super Admin Dashboard';
      if (cleanPath.includes('/super-admin/plans/create')) return 'Create Plan';
      if (cleanPath.includes('/super-admin/plans')) return 'Plans Management';
      if (cleanPath.includes('/super-admin/schools')) return 'Schools Management';
      if (cleanPath.includes('/super-admin/teachers')) return 'Teachers Management';
      if (cleanPath.includes('/super-admin/recharges')) return 'Recharges Management';
      if (cleanPath.includes('/super-admin/admins')) return 'Admins Management';
      if (cleanPath.includes('/super-admin/users')) return 'Users Management';
      if (cleanPath.includes('/super-admin/school-users')) return 'School Users';
      if (cleanPath.includes('/super-admin/profile')) return 'Super Admin Profile';
      if (cleanPath.includes('/super-admin/school')) return 'School Details';
      return 'Super Admin Panel';
    }
    
    // Admin pages
    if (userType == IRole.ADMIN) {
      if (cleanPath.includes('/admin/dashboard')) return 'Admin Dashboard';
      if (cleanPath.includes('/admin/templates')) return 'Templates Management';
      if (cleanPath.includes('/admin/users')) return 'Users Management';
      if (cleanPath.includes('/admin/profile')) return 'Admin Profile';
      return 'Admin Panel';
    }
    
    return 'Dashboard';
  }
  