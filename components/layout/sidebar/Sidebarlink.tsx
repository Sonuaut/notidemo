'use client'
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

interface SidebarLinkProps {
    href: string;
    label: string;
    icon: React.ReactNode;
}

export default function SidebarLink({ href, label, icon }: SidebarLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-4 rounded-lg px-4 py-3  transition-all ",
                isActive ? "bg-[#EDEEFC] text-[#9F9FF8] font-semibold border border-[#9F9FF8]":"hover:bg-[#EDEEFC]"
            )}
        >
            {icon}
            <span>{label}</span>
        </Link>
    );
}
