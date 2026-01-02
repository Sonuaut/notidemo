import { Label } from "@/components/common/Label";
import { cn } from "@/lib/utils";

export default function PageHeader({
    label,
    className,
    labelClass,
    subheading,
    subHeadingClass,
}: {
    label: string;
    className?: string;
    labelClass?: string;
    subheading?:string
    subHeadingClass?:string
}) {
    return (
        <div
            className={cn(
                " flex flex-col justify-start  ",
                className,
            )}
        >
            <Label
                variant="semibold"
                className={cn(" text-gray-700 text-xl md:text-2xl font-inter", labelClass)}
            >
                {label}
            </Label>
            { <Label
            size={"sm"}
                // variant="semibold"
                className={cn("text-gray-500 pl-0.5 ", subHeadingClass)}
            >
                {subheading}
            </Label>}
        </div>
    );
}
