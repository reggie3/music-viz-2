import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/three";
import {
  BufferGeometry,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
} from "three";

const RotatingBox = () => {
  const myMesh =
    useRef<
      Mesh<
        BufferGeometry<NormalBufferAttributes>,
        Material | Material[],
        Object3DEventMap
      >
    >(null);
  const [active, setActive] = useState(false);
  const { scale } = useSpring({ scale: active ? 1.5 : 1 });

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    if (myMesh.current) myMesh.current.rotation.x = a;
  });

  return (
    <animated.mesh
      scale={scale}
      onClick={() => setActive(!active)}
      ref={myMesh}
    >
      <boxGeometry />
      <meshPhongMaterial color="royalblue" />
    </animated.mesh>
  );
};

export default RotatingBox;
