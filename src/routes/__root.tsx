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
import { TanStackDevtools } from "@tanstack/react-devtools";
import { formDevtoolsPlugin } from "@tanstack/react-form-devtools";
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
import { allowedAdmins } from "@/admin";

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
            <header className="flex h-16 shrink-0 items-center gap-2 border-b print:hidden">
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

        <TanStackDevtools plugins={[formDevtoolsPlugin()]} />
        <TanStackRouterDevtools position="top-left" />
        <ReactQueryDevtools buttonPosition="top-right" />

        <Scripts />
      </body>
    </html>
  );
}

const data = {
  navMain: [
    { title: "Start", url: "/", public: true },
    { title: "Einkauf", url: "/Einkauf", public: true },
    { title: "Mitarbeiter", url: "/Mitarbeiter", public: true },
    { title: "Lieferanten", url: "/Lieferanten", public: true },
    { title: "Formulare", url: "/Formulare", public: true },
    { title: "CE Archiv", url: "/Archiv", public: true },
    { title: "Kunden", url: "/Kunden, public: true" },
    { title: "Warenlieferung", url: "/Warenlieferung", public: true },
    { title: "CMS", url: "/CMS", public: false },
    { title: "SN", url: "/SN", public: true },
    { title: "Info", url: "/Info", public: true },
    { title: "Label", url: "/Label", public: true },
    { title: "Aussteller", url: "/Aussteller", public: true },
    { title: "Versand", url: "/Versand", public: true },
  ],
};

function Main() {
  const routeContext = Route.useRouteContext();
  const location = useRouterState({ select: (s) => s.location });
  const user = routeContext.session?.user;

  return (
    <Sidebar collapsible="offcanvas" variant="inset" className="print:hidden">
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
              {data.navMain.map((items) => {
                if (items.public)
                  return (
                    <SidebarMenuItem key={items.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname == items.url}
                      >
                        <Link to={items.url}>{items.title}</Link>
                        {/* <span>{items.title}</span> */}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                else if (user?.email && allowedAdmins.includes(user.email))
                  return (
                    <SidebarMenuItem key={items.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname == items.url}
                      >
                        <Link to={items.url}>{items.title}</Link>
                        {/* <span>{items.title}</span> */}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
              })}
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
