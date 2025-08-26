"use client";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Session } from "next-auth";
import { NavUser } from "./nav-user";
import { navMainList } from "./nav-main";
import { usePathname } from "next/navigation";

interface SiteHeaderProps {
  session: Session;
}
export function SiteHeader({ session }: SiteHeaderProps) {
  const user = session?.user;
  const pathname = usePathname();

  if (!user) return null;

  const activeItem = navMainList.find((item) => item.url === pathname);

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-1 px-4 lg:gap-2 lg:px-6 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <SidebarTrigger className="-ml-1" />
      <Separator
        orientation="vertical"
        className="mx-2 data-[orientation=vertical]:h-4"
      />
      <h1 className="text-base font-medium">
        {activeItem?.title ?? "Dashboard"}
      </h1>
      <div className="flex items-center gap-2 ml-auto">
        <NavUser user={session.user} />
      </div>
    </header>
  );
}
