import { Canvas } from "@react-three/fiber";
import { FullSizeBox } from "../../components/FullSizeBox";
import { RotatingBox } from "../../components/RotatingBox";

function Home() {
  return (
    <FullSizeBox>
      <Canvas>
        <RotatingBox />
        <ambientLight intensity={0.1} />
        <directionalLight />
      </Canvas>
    </FullSizeBox>
  );
}

export default Home;
