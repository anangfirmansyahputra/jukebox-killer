"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Calendar,
  Lock,
  LogOut,
  Music,
  PenSquare,
  Settings as SettingsIcon,
  Target,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Menu items.
const items = [
  { id: "live", path: "/admin/live", icon: Target, label: "Live" },
  {
    id: "dedication",
    path: "/admin/dedication",
    icon: PenSquare,
    label: "Dedication",
  },
  { id: "events", path: "/admin/events", icon: Calendar, label: "Events" },
  {
    id: "settings",
    path: "/admin/settings",
    icon: SettingsIcon,
    label: "Settings",
  },
  { id: "setlist", path: "/admin/setlist", icon: Music, label: "Setlist" },
  {
    id: "password",
    path: "/admin/password",
    icon: Lock,
    label: "Password Settings",
  },
  { id: "logout", path: "/", icon: LogOut, label: "Logout" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="">
      <div className="p-4 flex justify-center bg-primary">
        <div className="w-12 h-12 rounded-full bg-white/10 dark:bg-white/5 flex items-center justify-center">
          <Target className="w-8 h-8 text-white" />
        </div>
      </div>
      <SidebarContent className="bg-primary text-primary-foreground">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.path;

                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      className={`transition-colors hover:bg-white/10 hover:text-white ${
                        isActive ? "bg-white/10 text-white" : ""
                      }`}
                    >
                      <Link href={item.path} className="py-5 px-4">
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
