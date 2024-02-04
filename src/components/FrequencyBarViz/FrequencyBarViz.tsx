import { Box } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAudioPlayer } from "../../AudioPlayerContext";
import { useMicrophone } from "../../MicrophoneContext";
import { useAudioAnalyzer } from "../../hooks/useAudioAnalyzer";

const CONTAINER_HEIGHT = 150;
type Props = { isVisible: boolean };

const FrequencyBarViz = ({ isVisible }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const { audioStream: playerStream, isPlaying } = useAudioPlayer();
  const { audioStream: microphoneStream, isRecording } = useMicrophone();
  const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const audioStream = useMemo(() => {
    if (isPlaying) {
      return playerStream;
    }
    if (isRecording) {
      return microphoneStream;
    }
    return null;
  }, [isPlaying, isRecording, microphoneStream, playerStream]);

  const { bufferLength, getCurrentAnalysisData } =
    useAudioAnalyzer(audioStream);

  useEffect(() => {
    if (canvas) {
      canvasContextRef.current = canvas.getContext("2d");
    }
  }, [canvas, getCurrentAnalysisData]);

  useEffect(() => {
    if (animationFrameRef.current && !isPlaying && !isRecording) {
      cancelAnimationFrame(animationFrameRef.current);
    } else if (isPlaying || isRecording) {
      const buffersToWatch = [11];
      const watchedBufferMaxAmplitude: Record<number, number> = {};

      const animate = () => {
        const data = getCurrentAnalysisData({ buffersToWatch });

        if (
          !canvasContextRef.current ||
          !canvas ||
          !bufferLength ||
          !data?.frequencyData
        ) {
          animationFrameRef.current = requestAnimationFrame(animate);
          return;
        }

        const ctx = canvasContextRef.current;

        let x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const barWidth = Math.round(canvas.width / bufferLength);

        for (let i = 0; i < bufferLength; i++) {
          x += barWidth;

          if (buffersToWatch.includes(i)) {
            const amplitudeDifference =
              Math.abs(watchedBufferMaxAmplitude[i] - data.frequencyData[i]) /
              watchedBufferMaxAmplitude[i];
            if (
              !watchedBufferMaxAmplitude[i] ||
              watchedBufferMaxAmplitude[i] < data.frequencyData[i]
            ) {
              watchedBufferMaxAmplitude[i] = data.frequencyData[i];
              console.log("** max hit");
            } else if (amplitudeDifference < 0.15) {
              console.log("-- near hit");
            }

            const barHeight = (data.frequencyData[i] / 255) * canvas.height;
            const red = (i * barHeight) / 10;
            const green = i * 4;
            const blue = barHeight / 4 - 12;
            ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          }
        }

        animationFrameRef.current = requestAnimationFrame(animate);
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [bufferLength, canvas, getCurrentAnalysisData, isPlaying, isRecording]);

  if (!isVisible) return null;

  return (
    <Box
      position={"absolute"}
      bottom={0}
      component="div"
      left={0}
      right={0}
      ref={containerRef}
      height={CONTAINER_HEIGHT}
    >
      <canvas ref={setCanvas} id="frequency-bar-viz-canvas" />
    </Box>
  );
};

export default FrequencyBarViz;
