import * as React from 'react'
import { ChevronRight } from 'lucide-react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
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
} from '@/components/ui/sidebar'
import SettingDefault from './features/settings'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentTab } from './redux/slices/metaSlice'
import type { RootState } from '@/app/store'
import { useLocation, useNavigate } from 'react-router'

import quran from '@/assets/images/quran_bg.png'
import QuickLinks from './features/quick-links'

const navItems = [
  {
    title: 'Quran',
    items: [
      { title: 'Surahs', url: 'surahs' },
      { title: 'Juzs', url: 'juzs' },
      { title: 'Manzils', url: 'manzils' },
      { title: 'Pages', url: 'pages' },
      { title: 'Rukus', url: 'rukus' },
      { title: 'Sajdas', url: 'sajdas' },
      { title: 'HizbQuarters', url: 'hizbQuarters' },
    ],
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const currentTab = useSelector((state: RootState) => state.meta.currentTab)
  const dispactch = useDispatch()

  const location = useLocation()

  const isVisibleHome =
    location.pathname.includes('/home') || location.pathname === '/'

  const userSingleSelect =
    location.pathname.includes('/juz') ||
    location.pathname.includes('/hizb') ||
    location.pathname.includes('/page') ||
    location.pathname.includes('/manzil')

  const navigate = useNavigate()

  return (
    <Sidebar {...props}>
      <SidebarHeader className="border-b h-16">
        <div className="flex items-center gap-2">
          <img
            src={quran}
            alt="quran"
            className="w-10 h-10 my-auto cursor-pointer"
            onClick={() => navigate('/')}
          />
          <p className="text-xl font-bold">Quran Majeed</p>
        </div>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <SidebarMenu>
          <SidebarMenuItem>
            {/* isActive={location.pathname === "/"}
            <SidebarMenuButton asChild isActive={location.pathname === "/"}>
              <Link to={"/"}>Home</Link>
            </SidebarMenuButton> */}
          </SidebarMenuItem>
        </SidebarMenu>

        <div className={`${isVisibleHome ? 'block' : 'hidden'}`}>
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
                    <SidebarMenu className="p-4 mt-2 cursor-pointer border rounded-xl">
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

        <div className={`${!isVisibleHome ? 'block' : 'hidden'}`}>
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
                  <SettingDefault isSingleSelect={userSingleSelect} />
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        </div>

        <div className={`${isVisibleHome ? 'block' : 'hidden'}`}>
          <Collapsible className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
              >
                <CollapsibleTrigger className="flex w-full items-center">
                  Quick Links
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>

              <CollapsibleContent>
                <SidebarGroupContent>
                  <QuickLinks />
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
