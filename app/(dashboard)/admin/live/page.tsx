import AdminHeader from "@/app/_components/admin-header";
import DedicationTable from "@/app/_components/table/dedication-table";
import { MessageSquare } from "lucide-react";

export default async function LivePage() {
  const breadcrumb = [
    {
      label: "Dashboard",
      href: "/admin/live",
    },
    {
      label: "Live",
      href: null,
    },
  ];

  return (
    <div>
      <AdminHeader breadcrumb={breadcrumb} />
      <div className="p-6">
        <h2 className="text-2xl font-bold">Live</h2>
      </div>
      <div className="px-6 space-y-5">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-green-600 text-white p-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Live Dedication
            </h2>
          </div>
          <DedicationTable />
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="bg-purple-600 text-white p-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Waiting Dedication
            </h2>
          </div>

          <DedicationTable />
        </div>
      </div>
    </div>
  );
}
