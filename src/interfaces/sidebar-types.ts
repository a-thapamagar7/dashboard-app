import type { Sidebar } from "@/components/shadcn-components/ui/sidebar";
import type { LucideProps } from "lucide-react";

export interface NavLinks {
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

export interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  navLinks: NavLinks[];
}
