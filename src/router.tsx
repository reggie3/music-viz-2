import {
  NotFoundRoute,
  RootRoute,
  Router,
  Route,
} from "@tanstack/react-router";
import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { RootComponent } from "./pages/RootComponent";
import { BasicViz } from "./pages/MusicVisualizations/BasicViz";
import { MusicVisualizations } from "./pages/MusicVisualizations";

const rootRoute = new RootRoute({
  component: RootComponent,
});

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: NotFound,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const musicVisualizationRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/music-visualizations",
  component: MusicVisualizations,
});
const basicVizRoute = new Route({
  getParentRoute: () => musicVisualizationRoute,
  path: "/basic-visualization",
  component: BasicViz,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  musicVisualizationRoute,
  basicVizRoute,
]);

const router = new Router({ routeTree, notFoundRoute });

export default router;

declare module "@tanstack/react-router" {
  interface Register {
    // This infers the type of our router and registers it across your entire project
    router: typeof router;
  }
}
