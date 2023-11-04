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
});

export function GameContext({ children }){
  // Manage players in the room
  const [players, handlers] = useListState();

  // Whether the player is a host
  const [isHost, setIsHost] = useState(false);

  // The current room id
  const [roomId, setRoomId] = useState("");

  //player name
  const [name, setName] = useState("");

  const context = {
    players,
    handlers,
    isHost,
    setIsHost,
    roomId,
    setRoomId,
    name,
    setName,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}

