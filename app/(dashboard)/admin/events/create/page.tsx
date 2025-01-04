import { getEvent } from "@/actions/event";
import AdminHeader from "@/app/_components/admin-header";
import { EventForm } from "@/app/_components/form/event-form";
import { redirect } from "next/navigation";

const breadcrumb = [
  {
    label: "Dashboard",
    href: "/admin/live",
  },
  {
    label: "Events",
    href: "/admin/events",
  },
  {
    label: "Create",
    href: null,
  },
];

export default async function CreateEventPage() {
  const event = await getEvent();

  if (event) redirect("/admin/events");

  return (
    <div>
      <AdminHeader breadcrumb={breadcrumb} />
      <div className="p-6 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Create Event</h2>
          <p className="text-gray-600">
            Fill in the form below to create a new event
          </p>
        </div>

        <div className="w-1/2">
          <EventForm />
        </div>
      </div>
    </div>
  );
}
