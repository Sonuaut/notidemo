import PageHeader from "@/components/common/PageHeader";
import Link from "next/link";

import { Plus } from "lucide-react";
import CommonButton from "@/components/common/Button";
import { cn } from "@/lib/utils";

export default function PlanHeader({className}:{className?:string}) {
  return (
    <section className={cn("flex justify-between items-center h-16 px-6 border-b border-gray-200",className)}>
      <PageHeader label="Plans" />
      <Link href="/super-admin/plans/create">
        <CommonButton className="bg-[#8D8EF5] text-white hover:bg-[#8D8EF5]/90 rounded-lg h-10 px-5">
          <Plus className="h-4 w-4" />
          Create Plan
        </CommonButton>
      </Link>
    </section>
  );
} 