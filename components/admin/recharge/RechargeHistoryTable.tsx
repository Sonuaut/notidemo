import { RechargeHistoryItem } from '@/lib/admin/recharge';

export default function RechargeHistoryTable({ items }: { items: RechargeHistoryItem[] }) {
  return (
    <div className="shadow-xl rounded-xl border border-[#E0E0E0] overflow-hidden transition-opacity duration-500 ease-out opacity-100">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left px-6 py-5 font-semibold text-sm">Title</th>
            <th className="text-left px-4 py-5 font-semibold text-sm">Type</th>
            <th className="text-left px-4 py-5 font-semibold text-sm">Amount</th>
            <th className="text-left px-4 py-5 font-semibold text-sm">Created</th>
            <th className="text-left px-4 py-5 font-semibold text-sm">Status</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center border-t py-4 text-muted-foreground">No recharge history found</td>
            </tr>
          ) : (
            items.map((rec, idx) => (
              <tr key={rec.id} className={`last:border-b-0 ${idx % 2 === 0 ? 'bg-[#F6F6FF]' : 'bg-white'}`}>
                <td className="px-6 py-4 font-medium">{rec.recharge_plans?.title ?? '-'}</td>
                <td className="p-4">{rec.recharge_plans?.type ?? '-'}</td>
                <td className="p-4">${rec.recharge_amount}</td>
                <td className="p-4">{new Date(rec.created_at).toLocaleString()}</td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${rec.recharge_status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {rec.recharge_status ? 'Success' : 'Failed'}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}


