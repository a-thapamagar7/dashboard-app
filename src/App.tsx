import { AppSidebar } from "@/components/common/AppSidebar";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/shadcn-components/ui/sidebar";
import { navLinks } from "@/utils/constants";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <SidebarProvider className="bg-white min-h-screen flex">
        <div className="sm:hidden">
          <SidebarTrigger />
        </div>
        <div className="flex flex-1">
          <AppSidebar navLinks={navLinks} />
          <main className="flex-1 w-full">
            <Outlet />
          </main>
        </div>
      </SidebarProvider>
    </>
  );
}

export default App;
