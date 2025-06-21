"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppContextProvider } from "@/context/app-context";
import { Icons } from "@/components/icons";
import { Nav } from "@/components/nav";
import { Button } from "@/components/ui/button";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <AppContextProvider>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="shrink-0" asChild>
                <Link href="/schedule">
                  <Icons.logo className="size-5" />
                  <span className="sr-only">Halliday</span>
                </Link>
              </Button>
              <h1 className="font-headline text-lg font-semibold truncate">Halliday</h1>
              <div className="flex-1" />
              <SidebarTrigger className="shrink-0 md:hidden" />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Nav />
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <div className="flex h-14 items-center gap-2 border-b bg-card/80 backdrop-blur-sm px-4 sticky top-0 z-10 md:hidden">
              <SidebarTrigger className="shrink-0" />
              <div className="flex items-center gap-2">
                 <Icons.logo className="size-5" />
                 <h1 className="font-headline text-lg font-semibold truncate">Halliday</h1>
              </div>
          </div>
          <main className="p-4 md:p-6 lg:p-8">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </AppContextProvider>
  );
}
