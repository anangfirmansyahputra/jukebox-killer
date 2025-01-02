import AdminHeader from "@/app/_components/admin-header";
import SetlistTable from "@/app/_components/table/setlist-table";

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

export default function SetlisPage() {
  return (
    <div className="w-full relative">
      <AdminHeader breadcrumb={breadcrumb} />
      <SetlistTable />
    </div>
  );
}
