import React from "react";
import { useListState } from "@mantine/hooks";
import { useState } from "react";

export const AppContext = React.createContext({
  players: [],
  handlers: null,
  isHost: false,
  setIsHost: (isHost) => {},
  roomId: "",
  setRoomId: (roomId) => {},
  hostId: "",
  setHostId: (hostId) => {},
  name: "",
  setName: (name) => {},
  colors: [],
  setColors: (colors) => {},
  colorStatus: [],
  setColorStatus: (colorStatus) => {},
  config: {
    roomSize: 3,
    // boardSize: 9,
    level: 1,
    roundTime: 60,
    breakTime: 0.0,
  },
  setConfig: (config) => {},
  playing: true,
  toggle: () => {},
  stop: () => {},
});

export function GameContext({ children }) {
  // Manage players in the room
  const [players, handlers] = useListState();

  // Whether the player is a host
  const [isHost, setIsHost] = useState(false);

  // The current room id
  const [roomId, setRoomId] = useState("");

  //player name
  const [name, setName] = useState("");
  //player colors
  const [colors, setColors] = useState([]);

  //player color status
  const [colorStatus, setColorStatus] = useState([]);

  const [hostId, setHostId] = useState("");

  const [config, setConfig] = useState({
    roomSize: 8,
    //boardSize: 9,
    level: 1,
    roundTime: 30,
    breakTime: 0.5,
  });

  const context = {
    players,
    handlers,
    isHost,
    setIsHost,
    roomId,
    setRoomId,
    name,
    setName,
    colors,
    setColors,
    colorStatus,
    setColorStatus,
    hostId,
    setHostId,
    config,
    setConfig,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}
