/// <reference types="vite/client" />
import type { ReactNode } from "react";
import type { AuthSession } from "start-authjs";
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouterState,
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
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
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
        <SidebarProvider>
          <Main />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b">
              <div className="flex items-center gap-2 px-3">
                <SidebarTrigger />
              </div>
            </header>

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
  const location = useRouterState({ select: (s) => s.location });

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
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              {data.navMain.map((items) => (
                <SidebarMenuItem key={items.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname == items.url}
                  >
                    <Link to={items.url}>{items.title}</Link>
                    {/* <span>{items.title}</span> */}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={routeContext.session?.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
