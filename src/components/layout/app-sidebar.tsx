import * as React from "react";

// import { SearchForm } from "@/components/search-form"
// import { VersionSwitcher } from "@/components/version-switcher"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { adminRoutes } from "@/routes/adminRoutes";
import { userRoutes } from "@/routes/userRoutes";
import { Route } from "@/types";

// import { VersionSwitcher } from "./version-switcher";
// import { SearchForm } from "./search-form";

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Getting Started",

      items: [
        {
          title: "Admin Dashboard",
          url: "/admin-dashboard",
        },
        {
          title: "User Dashboard",
          url: "/user-dashboard",
        },
      ],
    },
  ],
};

export function AppSidebar({
  user,
  ...props
}: {
  user: { role: string } & React.ComponentProps<typeof Sidebar>;
}) {
  let routes: Route[] = [];
  switch (user.role) {
    case "admin":
      routes = adminRoutes;
      break;

    case "user":
      routes = userRoutes;
      break;

    default:
      routes = [];
      break;
  }

  return (
    <Sidebar {...props}>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
