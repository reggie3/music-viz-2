import { Container } from "@mui/material";
import { AudioPlayerProvider } from "../../AudioPlayerContext";
import { MicrophoneProvider } from "../../MicrophoneContext";
import { Outlet } from "@tanstack/react-router";

const MusicVisualizations = () => {
  return (
    <AudioPlayerProvider>
      <MicrophoneProvider>
        <Container
          maxWidth={false}
          sx={{ backgroundColor: "black", padding: 0, height: "100dvh" }}
        >
          <Outlet />
        </Container>
      </MicrophoneProvider>
    </AudioPlayerProvider>
  );
};

export default MusicVisualizations;
