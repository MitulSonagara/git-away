"use client";

import { Activity, BarChart, Calendar, GitBranch, LayoutDashboard } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navMain = [
  { title: "Dashboard", url: "#", icon: LayoutDashboard, isActive: true },
  { title: "Vacation Schedular", url: "#", icon: Calendar },
  { title: "Connected Repos", url: "#", icon: GitBranch },
  { title: "Commit Activity", url: "#", icon: Activity },
  { title: "Analytics", url: "#", icon: BarChart },
];

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {navMain.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                isActive={item.isActive}
                className="data-[active=true]:bg-green-400/10 data-[active=true]:font-bold data-[active=true]:text-green-500 "

              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
