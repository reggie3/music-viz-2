import {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface AudioPlayerContextProps {
  audioStream: MediaStream | null;
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  togglePlayPause: () => void;
  setAudio: (audioElement: HTMLAudioElement | null) => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextProps | undefined>(
  undefined
);

export const AudioPlayerProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const audioStreamRef = useRef<MediaStream | null>(null);
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setPlaying] = useState(false);

  const play = () => {
    if (audioPlayer) {
      audioPlayer.play();
      setPlaying(true);
    }
  };

  const pause = () => {
    if (audioPlayer) {
      audioPlayer.pause();
      setPlaying(false);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const setAudio = (audioElement: HTMLAudioElement | null) => {
    setAudioPlayer(audioElement);
    if (audioElement) {
      //@ts-expect-error Property 'captureStream' does not exist on type 'HTMLAudioElement'
      const audioStream = audioElement.captureStream();
      audioStreamRef.current = audioStream;
    } else {
      audioStreamRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      audioStreamRef.current = null;
    };
  }, []);

  return (
    <AudioPlayerContext.Provider
      value={{
        audioStream: audioStreamRef.current,
        isPlaying,
        play,
        pause,
        togglePlayPause,
        setAudio,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAudioPlayer = (): AudioPlayerContextProps => {
  const context = useContext(AudioPlayerContext);

  if (!context) {
    throw new Error(
      "useAudioPlayer must be used within an AudioPlayerProvider"
    );
  }

  return context;
};
