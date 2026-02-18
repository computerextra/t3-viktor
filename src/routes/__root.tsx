/// <reference types="vite/client" />
import type { ReactNode } from "react";
import type { AuthSession } from "start-authjs";
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { getSession } from "start-authjs";
import { authConfig } from "@/lib/auth";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import appCss from "@/styles/app.css?url";
import type { QueryClient } from "@tanstack/react-query";
import { seo } from "@/lib/seo";
import { DefaultCatchBoundary } from "@/components/DefaultCatchBoundary";
import { NotFound } from "@/components/NotFound";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/side-header";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { useTitle } from "@/hooks/use-title";

const TITLE = "Viktor";

interface RouterContext {
  session: AuthSession | null;
  queryClient: QueryClient;
}

const fetchSession = createServerFn({ method: "GET" }).handler(async () => {
  const request = getRequest();
  const session = await getSession(request, authConfig);
  return session;
});

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async () => {
    const session = await fetchSession();
    return {
      session,
    };
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: TITLE,
        description: "",
      }),
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  useTitle(undefined);
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72",
              "--header-height": "calc(var(--spacing) * 12",
            } as React.CSSProperties
          }
        >
          <Main />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <main>{children}</main>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
        {/* <NavBar /> */}
        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools buttonPosition="top-right" />
        <Scripts />
      </body>
    </html>
  );
}

const data = {
  navMain: [
    { title: "Start", url: "/" },
    { title: "Einkauf", url: "/Einkauf" },
    { title: "Mitarbeiter", url: "/Mitarbeiter" },
    { title: "Lieferanten", url: "/Lieferanten" },
    { title: "Formulare", url: "/Formulare" },
    { title: "CE Archiv", url: "/Archiv" },
    { title: "Kunden", url: "/Kunden" },
    { title: "Warenlieferung", url: "/Warenlieferung" },
    { title: "CMS", url: "/CMS" },
    { title: "SN", url: "/SN" },
    { title: "Info", url: "/Info" },
    { title: "Label", url: "/Label" },
    { title: "Aussteller", url: "/Aussteller" },
    { title: "Versand", url: "/Versand" },
  ],
};

function Main() {
  const routeContext = Route.useRouteContext();

  return (
    <Sidebar collapsible="offcanvas" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link to="/">
                <span className="text-base font-semibold">Viktor</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={routeContext.session?.user} />
      </SidebarFooter>
    </Sidebar>

    // <nav className="p-4 flex gap-4 items-center bg-gray-100">
    //   <Link
    //     to="/"
    //     activeProps={{ className: "font-bold" }}
    //     activeOptions={{ exact: true }}
    //   >
    //     Home
    //   </Link>
    //   <Link to="/protected" activeProps={{ className: "font-bold" }}>
    //     Protected
    //   </Link>
    //   <div className="ml-auto flex items-center gap-4">
    //     {routeContext.session ? (
    //       <>
    //         <span className="text-gray-600">
    //           {routeContext.session?.user?.name ||
    //             routeContext.session?.user?.email}
    //         </span>
    //         <a
    //           href="/api/auth/signout"
    //           className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    //         >
    //           Sign Out
    //         </a>
    //       </>
    //     ) : (
    //       <Link
    //         to="/login"
    //         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    //       >
    //         Sign In
    //       </Link>
    //     )}
    //   </div>
    // </nav>
  );
}
