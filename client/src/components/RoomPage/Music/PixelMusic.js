import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import pixel from "./pixel.mp3";
import { FcMusic } from "react-icons/fc";

export default function PixelMusic({ autoPlay = false }) {
  const [play, { stop }] = useSound(pixel, { loop: true });
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    if (autoPlay) {
      play();
    }
    return () => stop();
  }, [play, stop, autoPlay]);

  const togglePlay = () => {
    if (isPlaying) {
      stop();
    } else {
      play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={togglePlay}
      className={` bg-pink-200 border-2 border-pink-500 hover:bg-pink-300 rounded-full px-3 py-3 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-opacity-50`}
    >
      {/* {isPlaying ? <FcMusic /> : "Play"} */}
      <FcMusic />
    </button>
  );
}
