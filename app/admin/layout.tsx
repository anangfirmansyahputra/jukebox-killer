import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

export default function AdminDashboardLayout({
  children,
}: AdminDashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full bg-gray-50">{children}</main>
    </SidebarProvider>
  );
}
