"use client";

import AdminHeader from "@/app/_components/admin-header";
import DedicationTable from "@/app/_components/table/dedication-table";
import { MessageSquare } from "lucide-react";

export default function DedicationPage() {
  const breadcrumb = [
    {
      label: "Dashboard",
      href: "/admin/live",
    },
    {
      label: "Dedication",
      href: null,
    },
  ];

  return (
    <>
      <AdminHeader breadcrumb={breadcrumb} />
      <div className="p-6">
        <h2 className="text-2xl font-bold">Dedication</h2>
      </div>
      <div className="px-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-purple-600 text-white p-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Dedications
            </h2>
          </div>

          {/* Loading State */}
          {/* {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            </div>
          )} */}

          {/* Error State */}
          {/* {error && (
            <div className="p-4 bg-red-50 text-red-600 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              {error}
            </div>
          )} */}

          {/* Empty State */}
          {/* {!loading && !error && dedications.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No pending dedications
            </div>
          )} */}

          {/* Dedications List */}
          <DedicationTable />
        </div>
      </div>
    </>
  );
}
