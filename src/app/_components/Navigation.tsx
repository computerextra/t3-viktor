"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Kbd } from "@/components/ui/kbd";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { formatForDisplay, useHotkey } from "@tanstack/react-hotkeys";
import { ChevronRight, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const TITLE = "Viktor";

const MAIN_NAV = [
  { title: "Start", url: "/" },
  { title: "Einkauf", url: "/Einkauf" },
  { title: "Mitarbeiter", url: "/Mitarbeiter" },
  { title: "Lieferanten", url: "/Lieferanten" },
  { title: "Formulare", url: "/Formulare" },
  { title: "CE Archiv", url: "/Archiv" },
  { title: "Kunden", url: "/Kunden" },
  {
    title: "CMS",
    url: "/CMS",
    items: [
      { title: "Abteilungen", url: "/CMS/Abteilung" },
      { title: "Angebote", url: "/CMS/Angebot" },
      { title: "Jobs", url: "/CMS/Job" },
      { title: "Mitarbeiter", url: "/Mitarbeiter" },
      { title: "Partner", url: "/CMS/Partner" },
      { title: "Referenzen", url: "/CMS/Referenz" },
    ],
  },
  { title: "SN", url: "/SN" },
  { title: "Info", url: "/Info" },
  { title: "Aussteller", url: "/Aussteller" },
  {
    title: "Intrexx (Nur Lesen)",
    url: "/Intrexx",
    items: [
      { title: "Kundensuche", url: "/Intrexx" },
      { title: "Wiki", url: "/Intrexx/Wiki" },
    ],
  },
];

export default function MainSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { setTheme } = useTheme();

  const [open, setOpen] = useState(true);

  useHotkey("Mod+B", () => setOpen((prev) => !prev));

  return (
    <SidebarProvider open={open}>
      <Sidebar collapsible="offcanvas" variant="inset" className="print:hidden">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="data-[slot=sidebar-menu-button]:p-1.5!"
              >
                <Link href="/">
                  <span className="text-base font-semibold">{TITLE}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
              {MAIN_NAV.map((item) => {
                if (item.items && item.items.length > 0) {
                  return (
                    <Collapsible
                      key={item.title}
                      asChild
                      defaultOpen={pathname.includes(item.url)}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton>
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname == subItem.url}
                                >
                                  <Link href={subItem.url}>
                                    {subItem.title}
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname == item.url}>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b print:hidden">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger
              size={"default"}
              className="w-fit"
              onClick={() => setOpen((prev) => !prev)}
              shortCut={<Kbd>{formatForDisplay("Mod+B")}</Kbd>}
            />
          </div>
          <div className="ml-auto" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="me-2">
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Hell
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dunkel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <main>{children}</main>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
