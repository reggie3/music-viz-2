import { ThemeProvider } from "@emotion/react";
import hackerTheme from "./hackerTheme";
import { Container, CssBaseline } from "@mui/material";
import { Toolbar } from "./Toolbar";
import { AudioPlayer } from "./AudioPlayer";
import { AudioPlayerProvider } from "./AudioPlayerContext";
import { MicrophoneProvider } from "./MicrophoneContext";
import { AudioVisualizerContainer } from "./AudioVisualizerContainer";
import "./global.css";

function App() {
  return (
    <ThemeProvider theme={hackerTheme}>
      <CssBaseline />

      <AudioPlayerProvider>
        <MicrophoneProvider>
          <Container
            maxWidth={false}
            sx={{ backgroundColor: "black", padding: 0, height: "100dvh" }}
          >
            <AudioPlayer src="Denys_Kyshchuk_Upbeat_Inspiring.mp3" />
            <Toolbar />
            <AudioVisualizerContainer />
          </Container>
        </MicrophoneProvider>
      </AudioPlayerProvider>
    </ThemeProvider>
  );
}

export default App;
