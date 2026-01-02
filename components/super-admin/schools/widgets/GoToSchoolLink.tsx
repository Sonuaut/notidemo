
import TooltipWrapper from "@/components/common/TooltipWrapper";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";


const GoToSchoolLink = ({ schoolData }: { schoolData: any }) => {
    // console.log("schoolData :", schoolData)
    const href = schoolData?.id && schoolData?.name
        ? `/super-admin/school-users?schoolId=${schoolData.id}&schoolName=${encodeURIComponent(schoolData.name)}`
        : "/";
    return (
        <TooltipWrapper label="View School">
            <Link href={href} >
                <Button asChild variant="ghost" size="icon" aria-label="View School Users" className="p-2 text-gray-700 cursor-pointer">
                    <Eye className="h-8 w-8" />
                </Button>
            </Link>
        </TooltipWrapper>
    );
};

export default GoToSchoolLink; 