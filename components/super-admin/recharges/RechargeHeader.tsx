import PageHeader from "@/components/common/PageHeader";
import CreateAndUpdateRechargeDialog from "./CreateAndUpdateRechargeDialog";
import { FormMode } from "@/types";
import CommonButton from "@/components/common/Button";
import { Plus } from "lucide-react";

export default function RechargeHeader() {
  return (
    <section className="flex justify-between items-center h-16 px-6 border-b border-gray-200">
      <PageHeader label="Recharges" />
      <CreateAndUpdateRechargeDialog mode={FormMode.CREATE}>
        <CommonButton className="bg-[#8D8EF5] text-white hover:bg-[#8D8EF5]/90 rounded-lg h-10 px-5">
          <Plus className="h-4 w-4" />
          Create Recharge 
        </CommonButton>
      </CreateAndUpdateRechargeDialog>
    </section>
  );
} 