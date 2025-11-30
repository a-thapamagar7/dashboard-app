import type { NavLinks } from "@/interfaces/sidebar-types";
import { LayoutDashboard, Table } from "lucide-react";

export const navLinks: NavLinks[] = [
  {
    title: "Home",
    url: "/home",
    icon: LayoutDashboard,
  },
  {
    title: "Data",
    url: "/data",
    icon: Table,
  },
];
