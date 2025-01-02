import AdminHeader from "@/app/_components/admin-header";

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
    </div>
  );
}
