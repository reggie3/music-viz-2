// useAudioAnalyzer.ts

import { useEffect, useRef } from "react";
import { useAudioPlayer } from "../AudioPlayerContext";
import { useMicrophone } from "../MicrophoneContext";

interface AudioAnalyzerData {
  frequencyData: Uint8Array | null;
  timeDomainData: Uint8Array | null;
  currentAverageAmplitude: number;
  maxAmplitude: number;
}

const useAudioAnalyzer = (audioStream: MediaStream | null) => {
  const analyser = useRef<AnalyserNode | null>(null);
  const freqDataRef = useRef<Uint8Array | null>(null);
  const timeDomainDataRef = useRef<Uint8Array | null>(null);
  const maxAmplitudeRef = useRef<number>(0);

  const { isPlaying } = useAudioPlayer();
  const { isRecording } = useMicrophone();

  useEffect(() => {
    if (!audioStream || (!isPlaying && !isRecording)) return;

    const audioContext = new window.AudioContext();
    analyser.current = audioContext.createAnalyser();
    analyser.current.fftSize = 256; // You can adjust this value based on your needs
    const bufferLength = analyser.current.frequencyBinCount;
    freqDataRef.current = new Uint8Array(bufferLength);
    timeDomainDataRef.current = new Uint8Array(analyser.current.fftSize);

    const source = audioContext.createMediaStreamSource(audioStream);
    source.connect(analyser.current);

    analyser.current.connect(audioContext.destination);

    return () => {
      if (analyser.current) {
        analyser.current.disconnect();
      }
      audioContext.close();
    };
  }, [audioStream, isPlaying, isRecording]);

  /**
   * decayMaxAmplitude: lower the max amplitude a little each frame so that it doesn't get stuck
   * */
  const decayMaxAmplitude = (delta: number, decay = 0.99) => {
    maxAmplitudeRef.current *= decay * delta;
  };

  const getCurrentAnalysisData = (): AudioAnalyzerData | null => {
    if (
      !analyser.current ||
      !freqDataRef.current ||
      !timeDomainDataRef.current ||
      (!isPlaying && !isRecording)
    )
      return null;

    analyser.current.getByteFrequencyData(freqDataRef.current);
    analyser.current.getByteTimeDomainData(timeDomainDataRef.current);

    // Calculate average amplitude
    const sumAmplitude = timeDomainDataRef.current.reduce(
      (sum, value) => sum + value,
      0
    );
    const currentAverageAmplitude =
      sumAmplitude / timeDomainDataRef.current.length;
    if (currentAverageAmplitude > maxAmplitudeRef.current) {
      maxAmplitudeRef.current = currentAverageAmplitude;
    }

    return {
      frequencyData: freqDataRef.current,
      timeDomainData: timeDomainDataRef.current,
      currentAverageAmplitude,
      maxAmplitude: maxAmplitudeRef.current,
    };
  };

  return { getCurrentAnalysisData, decayMaxAmplitude };
};

export default useAudioAnalyzer;
