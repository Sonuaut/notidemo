import CommonButton from "@/components/common/Button";
import { Label } from "@/components/common/Label";
import { Bell } from "lucide-react";
import RechargePlansDialog from "../plans/RechargePlansDialog";

export default function CreditLimitReached() {
    return (
        <section className='bg-[#EDEEFC] border  shadow-sm border-[#9F9FF8] rounded-[10px] p-[22px] grid grid-cols-1 lg:grid-cols-12 items-center'>
            <div className='lg:col-span-8 space-y-1'>
                <div className="flex items-center gap-2">
                    <Bell size={16} className='text-gray-500' />
                    <Label >Credit Limit Reached</Label>
                </div>
                <span className="text-xs text-gray-500 line-clamp-2">Your recharge is exhausted. Someone has sent a recharge request. Please recharge your credits</span>
            </div>
           <div className="lg:col-span-4 flex justify-end">
           {/* <CommonButton variant="outline" className="bg-[#8D8EF5] text-white h-10 px-4 rounded-full ml-auto">View Plans</CommonButton> */}
           <RechargePlansDialog>
            <CommonButton variant="outline" className="bg-[#8D8EF5] text-white h-10 px-4 rounded-full ml-auto hover:bg-[#8D8EF5]/90 hover:text-white">View Plans</CommonButton>
           </RechargePlansDialog>
           </div>
        </section>
    )
}
