import { getCookie } from '@/actions/cookie';
import { ICookiesKey, IRole } from '@/types';
import { AdminLayout } from '@/components/layout/admin-layout';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default async function NotFound() {
  const role = await getCookie(ICookiesKey.ROLE);
  let redirectPath = '/';
  if (role === IRole.SUPER_ADMIN) {
    redirectPath = '/super-admin/dashboard';
  } else if (role === IRole.ADMIN) {
    redirectPath = '/admin/dashboard';
  } else 
  redirectPath="/";

  return (
    <AdminLayout type={role as IRole}>
      <div className="max-w-md w-full mx-auto p-6 flex flex-col items-center gap-6 text-center mt-20">
        <AlertTriangle className="w-16 h-16 text-yellow-500" />
        <h1 className="text-3xl font-bold text-gray-800">Oops! Page not found</h1>
        <p className="text-gray-500">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href={redirectPath}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition-all"
        >
          Go to Dashboard
        </Link>
      </div>
    </AdminLayout>
  );
}
