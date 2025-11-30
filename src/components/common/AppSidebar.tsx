import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/shadcn-components/ui/sidebar";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn-components/ui/avatar";
import type { AppSidebarProps } from "@/interfaces/sidebar-types";

export function AppSidebar({ navLinks, ...props }: AppSidebarProps) {
  return (
    <Sidebar
      variant="sidebar"
      className="top-[--header-height] h-screen"
      {...props}
    >
      <SidebarHeader className="border-b border-gray-300">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex justify-between">
                <div className="flex gap-x-4">
                  <Avatar className="size-9">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Dashboard</span>
                    <span className="truncate text-xs">App</span>
                  </div>
                </div>
                <div className="flex md:hidden">
                  <SidebarTrigger />
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Items</SidebarGroupLabel>
          <SidebarMenu>
            {navLinks.map((item) => (
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
