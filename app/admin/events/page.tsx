import AdminHeader from "@/app/_components/admin-header";
import { EventForm } from "@/app/_components/form/event-form";
import DedicationTable from "@/app/_components/table/dedication-table";
import EventTable from "@/app/_components/table/event-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, MessageSquare } from "lucide-react";

const breadcrumb = [
  {
    label: "Dashboard",
    href: "/admin/live",
  },
  {
    label: "Events",
    href: null,
  },
];

export default function EventPage() {
  return (
    <div className="h-full">
      <AdminHeader breadcrumb={breadcrumb} />
      <div className="p-6">
        <h2 className="text-2xl font-bold">Event</h2>
      </div>

      <div className="px-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-purple-600 text-white p-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Events
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
          <EventTable />
        </div>
      </div>
    </div>
  );
}
