// AudioAnalyzerContainer.tsx

import React from "react";
import { Canvas } from "@react-three/fiber";
import { BasicViz } from "../Visualizations/BasicViz";

const AudioAnalyzerContainer: React.FC = () => {
  return (
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

      <BasicViz />
    </Canvas>
  );
};

export default AudioAnalyzerContainer;
