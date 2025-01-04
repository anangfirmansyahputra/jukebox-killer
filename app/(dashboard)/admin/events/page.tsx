import { getEvent } from "@/actions/event";
import AdminHeader from "@/app/_components/admin-header";
import EventTable from "@/app/_components/table/event-table";
import { Button } from "@/components/ui/button";
import { Calendar, Plus } from "lucide-react";
import Link from "next/link";

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

export default async function EventPage() {
  const event = await getEvent();

  return (
    <div className="h-full">
      <AdminHeader breadcrumb={breadcrumb} />
      <div className="p-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Event</h2>
        {!event && (
          <Link href={`/admin/events/create`}>
            <Button>
              <Plus />
              Create Event
            </Button>
          </Link>
        )}
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
          {!event && (
            <div className="p-8 text-center text-gray-500">No event found</div>
          )}

          {/* Dedications List */}
          {event && <EventTable event={event} />}
        </div>
      </div>
    </div>
  );
}
