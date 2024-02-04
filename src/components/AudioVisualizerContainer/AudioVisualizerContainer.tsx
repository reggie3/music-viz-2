// AudioAnalyzerContainer.tsx

import { ReactElement } from "react";
import { Canvas } from "@react-three/fiber";
import { Box } from "@mui/material";
import { AudioPlayer } from "../AudioPlayer";
import { Toolbar } from "../../Toolbar";
import FrequencyBarViz from "../FrequencyBarViz/FrequencyBarViz";

const AudioAnalyzerContainer = ({ children }: { children: ReactElement }) => {
  return (
    <Box
      component={"div"}
      sx={{
        height: "100%",
        position: "absolute",
        left: 0,
        right: 0,
      }}
      bottom={0}
      top={0}
    >
      <AudioPlayer src="/Denys_Kyshchuk_Upbeat_Inspiring.mp3" />
      <Toolbar />
      <Canvas>
        <axesHelper />
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        {children}
      </Canvas>
      <FrequencyBarViz isVisible />
    </Box>
  );
};

export default AudioAnalyzerContainer;
