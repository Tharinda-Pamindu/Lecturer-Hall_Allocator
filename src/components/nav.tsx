"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Building2 } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

const links = [
  { href: "/schedule", label: "Schedule", icon: LayoutDashboard },
  { href: "/faculty", label: "Faculty", icon: Users },
  { href: "/halls", label: "Halls", icon: Building2 },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {links.map((link) => (
        <SidebarMenuItem key={link.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === link.href}
            tooltip={link.label}
          >
            <Link href={link.href}>
              <link.icon />
              <span>{link.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
