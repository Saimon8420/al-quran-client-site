import * as React from "react";
import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import SettingDefault from "./features/settings";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTab } from "./redux/slices/metaSlice";
import type { RootState } from "@/app/store";
import { useLocation } from "react-router";

const navItems = [
  {
    title: "Quran",
    items: [
      { title: "Surahs", url: "surahs" },
      { title: "Juzs", url: "juzs" },
      { title: "Manzils", url: "manzils" },
      { title: "Pages", url: "pages" },
      { title: "Rukus", url: "rukus" },
      { title: "Sajdas", url: "sajdas" },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const currentTab = useSelector((state: RootState) => state.meta.currentTab);
  const dispactch = useDispatch();

  const location = useLocation();

  const isVisibleSetting =
    location.pathname.includes("/surah") ||
    location.pathname.includes("/sajda");

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b h-16"></SidebarHeader>
      <SidebarContent className="gap-0">
        <SidebarMenu>
          <SidebarMenuItem>
            {/* isActive={location.pathname === "/"}
            <SidebarMenuButton asChild isActive={location.pathname === "/"}>
              <Link to={"/"}>Home</Link>
            </SidebarMenuButton> */}
          </SidebarMenuItem>
        </SidebarMenu>

        <div className={`${location.pathname === "/" ? "block" : "hidden"}`}>
          {navItems.map((item) => (
            <Collapsible
              key={item.title}
              defaultOpen
              className="group/collapsible"
            >
              <SidebarGroup>
                <SidebarGroupLabel
                  asChild
                  className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
                >
                  <CollapsibleTrigger className="flex w-full items-center">
                    {item.title}
                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu className="px-4 mt-2 cursor-pointer">
                      {item.items.map((subItem) => (
                        <SidebarMenuItem key={subItem.title}>
                          <SidebarMenuButton
                            asChild
                            onClick={() =>
                              dispactch(setCurrentTab(subItem.url))
                            }
                            isActive={subItem.url === currentTab}
                          >
                            <p>{subItem.title}</p>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          ))}
        </div>

        <div className={`${isVisibleSetting ? "block" : "hidden"}`}>
          <Collapsible className="group/collapsible" defaultOpen>
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
              >
                <CollapsibleTrigger className="flex w-full items-center">
                  Setting
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>

              <CollapsibleContent>
                <SidebarGroupContent>
                  <SettingDefault />
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
