import React from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ModeToggle } from "@/components/theme/mood-toggle";
import { Toaster } from "@/components/ui/sonner";
import { GridPattern } from "../ui/grid-pattern";
import { Link, useLocation } from "react-router";
import { Particles } from "../ui/particles";
import { useTheme } from "@/hooks/use-theme";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const { theme } = useTheme();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <GridPattern
          width={40}
          height={40}
          x={-1}
          y={-1}
          className="absolute inset-0 h-full w-full dark:opacity-10 opacity-25"
        />
        <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between z-50">
          <div className="flex items-center h-[100%]">
            <SidebarTrigger className="-ml-1 mr-2" />
            <Separator orientation="vertical" className="mr-4 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {pathnames.length > 0 && <BreadcrumbSeparator />}
                {pathnames.map((value, index) => {
                  const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                  const isLast = index === pathnames.length - 1;
                  return (
                    <React.Fragment key={to}>
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage>{value}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link to={to}>{value}</Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {!isLast && <BreadcrumbSeparator />}
                    </React.Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <ModeToggle />
        </header>
        <div className="flex flex-col gap-4 p-4 relative overflow-hidden">
          <Toaster />
          {children}
          <Particles
            className="absolute inset-0 z-0 h-[100vh] w-[100vw] pointer-events-none opacity-30"
            quantity={100}
            ease={80}
            staticity={50}
            refresh
            color={theme === "light" ? "#262626" : "#ffffff"}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AppLayout;
