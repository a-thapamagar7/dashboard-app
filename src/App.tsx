import { AppSidebar } from "@/components/common/AppSidebar";
import { SidebarProvider } from "@/components/shadcn-components/ui/sidebar";
import { navLinks } from "@/utils/constants";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <SidebarProvider className="bg-sidebar-accent">
        <AppSidebar navLinks={navLinks} />
        <main className="flex">
          <Outlet />
        </main>
      </SidebarProvider>
    </>
  );
}

export default App;
