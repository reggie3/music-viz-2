import { useFrame } from "@react-three/fiber";
import { useAudioPlayer } from "../../AudioPlayerContext";
import { useAudioAnalyzer } from "../../useAudioAnalyzer";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useMicrophone } from "../../MicrophoneContext";
import { useSliderBlade, useTweakpane } from "react-tweakpane";

const BasicVisualizer = () => {
  const meshRef =
    useRef<
      THREE.Mesh<
        THREE.BufferGeometry<THREE.NormalBufferAttributes>,
        THREE.Material | THREE.Material[],
        THREE.Object3DEventMap
      >
    >(null);

  const colorRef = useRef<number>(1);
  const scaleRef = useRef<number>(1);

  const { audioStream: playerStream, isPlaying } = useAudioPlayer();
  const { audioStream: microphoneStream, isRecording } = useMicrophone();
  const pane = useTweakpane(
    { position: { x: 1, y: 1, z: 0 } },
    {
      title: "Basic Visualization",
    }
  );

  const [amplitudeDecay] = useSliderBlade(pane, {
    label: "Max Amp. Decay Multiplier",
    value: 0.99,
    min: 0.9,
    max: 1,
    step: 0.01,
    format: (value) => value.toFixed(2),
  });
  const [colorDecay] = useSliderBlade(pane, {
    label: "Color Decay Multiplier",
    value: 0.9,
    min: 0.25,
    max: 1,
    step: 0.01,
    format: (value) => value.toFixed(2),
  });
  const [scaleDecay] = useSliderBlade(pane, {
    label: "Scale Decay Multiplier",
    value: 0.8,
    min: 0.75,
    max: 1,
    step: 0.01,
    format: (value) => value.toFixed(2),
  });

  const audioStream = useMemo(() => {
    if (isPlaying) {
      return playerStream;
    }
    if (isRecording) {
      return microphoneStream;
    }
    return null;
  }, [isPlaying, isRecording, microphoneStream, playerStream]);

  const { decayMaxAmplitude, getCurrentAnalysisData } =
    useAudioAnalyzer(audioStream);

  useFrame((_state, delta) => {
    colorRef.current *= colorDecay;
    scaleRef.current *= scaleDecay;

    const data = getCurrentAnalysisData();
    if (data) {
      const { maxAmplitude, currentAverageAmplitude } = data;

      const volumeDiff = Math.abs(1 - maxAmplitude / currentAverageAmplitude);
      colorRef.current = (currentAverageAmplitude / maxAmplitude) * colorDecay;

      if (volumeDiff < 0.05 && meshRef.current) {
        colorRef.current = 1.5;
        scaleRef.current = currentAverageAmplitude / maxAmplitude;
      }

      decayMaxAmplitude(delta, amplitudeDecay);
    }

    // console.log("colorRef.current", colorRef.current);

    if (meshRef.current) {
      const mesh = meshRef.current;
      const material = mesh.material as THREE.MeshStandardMaterial;
      material.color = new THREE.Color(
        colorRef.current,
        colorRef.current * 0.1,
        colorRef.current / 4
      );
      mesh.scale.set(
        scaleRef.current * delta * 100,
        scaleRef.current * delta * 100,
        scaleRef.current * delta * 100
      );
      mesh.rotation.x += delta * 0.8; // Adjust the rotation speed as needed
      mesh.rotation.y += delta; // Adjust the rotation speed as needed
    }
  });

  const onClick = () => {
    if (meshRef.current) {
      const mesh = meshRef.current;
      (mesh.material as THREE.MeshStandardMaterial).color = new THREE.Color(
        "purple"
      );
      const newScale = 0.5;

      mesh.scale.set(newScale, newScale, newScale);
    }
  };

  console.count("render");

  return (
    <mesh ref={meshRef} onClick={onClick}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={
          new THREE.Color(colorRef.current, colorRef.current, colorRef.current)
        }
      />
    </mesh>
  );
};

export default BasicVisualizer;
