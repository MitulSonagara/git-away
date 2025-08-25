"use client";

import {
  Activity,
  BarChart,
  Calendar,
  GitBranch,
  LayoutDashboard,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navMain = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    isActive: true,
  },
  { title: "Vacation Schedular", url: "#", icon: Calendar },
  { title: "Connected Repos", url: "/repo", icon: GitBranch },
  { title: "Commit Activity", url: "#", icon: Activity },
  { title: "Analytics", url: "#", icon: BarChart },
];

export function NavMain() {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {navMain.map((item) => {
            const isActive = pathname === item.url;

            return (
              <SidebarMenuItem key={item.title}>
                <Link href={item.url} className="w-full">
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={isActive}
                    className="data-[active=true]:bg-green-400/10 data-[active=true]:font-bold data-[active=true]:text-green-500"
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
