'use client'

import CommonButton from '@/components/common/Button';
import { Label } from '@/components/common/Label';
import { logout } from '@/lib/auth';
import { IRole } from '@/types';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Logout({ role }: { role: IRole }) {
    const router = useRouter();

    const handleLogout = () => {
        logout(role);
        const loginPath = role === IRole.SUPER_ADMIN ? '/super-admin/login' : '/admin/login';
        router.push(loginPath);
    };

    return (
        <CommonButton variant={"outline"} onClick={handleLogout} className="flex items-center gap-2 text-gray-600 hover:text-white  bg-white  hover:bg-gray-200 cursor-pointer ">
            <LogOut size={18} className='w-5 h-5 text-gray-700 cursor-pointer  ' />
            <Label className='text-gray-700 cursor-pointer '>Logout</Label>
        </CommonButton>
    );
}
