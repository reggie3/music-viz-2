// MicrophoneContext.tsx

import {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface MicrophoneContextProps {
  audioStream: MediaStream | null;
  isRecording: boolean;
  startMicrophone: () => void;
  stopMicrophone: () => void;
}

const MicrophoneContext = createContext<MicrophoneContextProps | undefined>(
  undefined
);

export const MicrophoneProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const audioStreamRef = useRef<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const startMicrophone = async () => {
    try {
      const microphoneStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      audioStreamRef.current = microphoneStream;
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopMicrophone = () => {
    if (audioStreamRef.current) {
      const tracks = audioStreamRef.current.getTracks();
      tracks.forEach((track) => track.stop());
      audioStreamRef.current = null;
      setIsRecording(false);
    }
  };

  useEffect(() => {
    return () => {
      // Clean up when the component unmounts
      stopMicrophone();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MicrophoneContext.Provider
      value={{
        audioStream: audioStreamRef.current,
        isRecording,
        startMicrophone,
        stopMicrophone,
      }}
    >
      {children}
    </MicrophoneContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMicrophone = (): MicrophoneContextProps => {
  const context = useContext(MicrophoneContext);

  if (!context) {
    throw new Error("useMicrophone must be used within a MicrophoneProvider");
  }

  return context;
};
