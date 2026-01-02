import { PlusCircle, Edit2, CheckCircle } from "lucide-react";

const demoActivities = [
  { message: "New school 'Evergreen Academy' added.", time: "2 hours ago", type: "add" },
  { message: "Teacher 'Alice Johnson' updated profile.", time: "4 hours ago", type: "edit" },
  { message: "Admin approved new teacher registration.", time: "Yesterday", type: "approve" },
];

function getIcon(type: string) {
  switch (type) {
    case "add":
      return <PlusCircle className="h-5 w-5 text-blue-500" />;
    case "edit":
      return <Edit2 className="h-5 w-5 text-yellow-500" />;
    case "approve":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    default:
      return null;
  }
}

export default function RecentActivity() {
  return (
    <div className=" rounded-xl shadow p-6 ">
      <div className="text-lg font-semibold mb-4 flex items-center gap-2">
        Recent Activity
      </div>
      <ul className="space-y-4 relative">
        {demoActivities.map((activity, idx) => (
          <li key={idx} className="flex items-start gap-3 relative">
            <div className="flex flex-col items-center">
              <span className="z-10">{getIcon(activity.type)}</span>
              {idx < demoActivities.length - 1 && (
                <span className="block w-px h-8 bg-gray-300 mx-auto"></span>
              )}
            </div>
            <div>
              <div className="text-gray-700 font-medium">{activity.message}</div>
              <div className="text-xs text-gray-400 mt-1">{activity.time}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
} 