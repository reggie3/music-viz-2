import { useSpring, animated } from "@react-spring/three";
import React, { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

const ScaleAnimation = () => {
  const myMesh = React.useRef();
  const [active, setActive] = useState(false);
  const { scale } = useSpring({ scale: active ? 1.5 : 1 });

  return (
    <Canvas>
      <animated.mesh
        scale={scale}
        onClick={() => setActive(!active)}
        ref={myMesh}
      >
        <boxGeometry />
        <meshPhongMaterial color="royalblue" />
      </animated.mesh>
    </Canvas>
  );
};

export default ScaleAnimation;
