// AudioPlayer.tsx

import React, { useEffect, useRef } from "react";
import { useAudioPlayer } from "../AudioPlayerContext";

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { setAudio, pause } = useAudioPlayer();

  useEffect(() => {
    const audioElement = audioRef.current;

    // Set the audio element in the context when the component mounts
    if (audioRef.current) {
      setAudio(audioRef.current);

      // Add an event listener for the 'ended' event
      audioElement?.addEventListener("ended", handleAudioEnd);
    }

    // Clean up when the component unmounts
    return () => {
      setAudio(null);
      audioElement?.removeEventListener("ended", handleAudioEnd);
    };

    // only run this useEffect on mount for now
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAudioEnd = () => {
    // Perform actions when the audio ends (e.g., pause, reset, play the next track)
    pause(); // You can replace this with the desired behavior
  };

  return (
    <audio
      ref={audioRef}
      src={src}
      controls
      style={{ position: "absolute", bottom: 20, display: "none" }}
    />
  );
};

export default AudioPlayer;
