import { Box, Container } from "@mui/material";
import { Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

function RootComponent() {
  return (
    <Container sx={{ backgroundColor: "black" }} maxWidth={false}>
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        component={"div"}
        sx={{
          backgroundColor: "orange",
          position: "absolute",
          top: 0,
          zIndex: 100,
        }}
      >
        <Link to="/" activeOptions={{ exact: true }}>
          Home
        </Link>
        <Link
          to="/music-visualizations/basic-visualization"
          activeOptions={{ exact: true }}
        >
          Basic Visualization
        </Link>
        <Link
          to="/music-visualizations/scale-animation"
          activeOptions={{ exact: true }}
        >
          Scale Animation
        </Link>
      </Box>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </Container>
  );
}

export default RootComponent;
