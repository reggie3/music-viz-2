import { Canvas } from "@react-three/fiber";
import { RotatingBox } from "../../components/RotatingBox";

const ScaleAnimation = () => {
  return (
    <Canvas data-testid="scale">
      <ambientLight intensity={0.1} />
      <directionalLight />
      <RotatingBox />
    </Canvas>
  );
};

export default ScaleAnimation;
