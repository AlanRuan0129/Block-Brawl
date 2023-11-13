import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../GameContext";
import { Outlet } from "react-router-dom";
import socket from "../Socket";
import ScrollToBottom from "react-scroll-to-bottom";
import { FcLock, FcLikePlaceholder, FcOk } from "react-icons/fc";
import PixelMusic from "./PixelMusic";

import "./Messages.css";
import "./Message.css";

export default function Layout() {
  const { roomId } = useContext(AppContext);

  if (!roomId) {
    return null;
  }

  return (
    // <div>
    //   {/* <div>
    //     <Outlet />
    //   </div> */}

    //   <div>
    //     <PlayerList />
    //     <PixelMusic autoPlay={false} />
    //     <MessageList />
    //   </div>
    // </div>

    <div className="flex flex-col h-screen">
      {" "}
      {/* 设置为 flex 容器并填充整个视口高度 */}
      {/* 其他组件 */}
      <PlayerList />
      {/* <PixelMusic autoPlay={false} /> */}
      {/* MessageList 组件将填充剩余空间并可滚动 */}
      <div className="flex-grow overflow-hidden">
        <MessageList />
      </div>
    </div>
  );
}

// Player list component
function PlayerList() {
  const { handlers, hostId, name, players, colors } = useContext(AppContext);
  const updateGame = (data) => {
    handlers.setState(data.players);
  };

  useEffect(() => {
    socket.on("game-update", updateGame);
    return () => {
      socket.off("game-update", updateGame);
    };
  }, []);

  return (
    <div className="bg-gray-800 p-4 text-white">
      <p className="text-lg pb-2">Players ({players.length})</p>
      <div className="overflow-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-300 h-40">
        {players.map((p, index) => (
          <PlayerItem
            key={index}
            color={colors[p.colorId]}
            selfName={name}
            playerName={p.name}
            isHost={p.id === hostId}
            isBreaker={p.isBreaker}
            isReady={p.isReady}
          />
        ))}
      </div>
    </div>
  );
}

function PlayerItem({ color, selfName, playerName, isReady }) {
  // Use Tailwind CSS for the avatar image based on isBreaker state
  const avatarSrc = process.env.PUBLIC_URL + "/assets/p_down_ffd11a.png";

  return (
    <div className="flex items-center space-x-2 mb-2">
      <img
        src={avatarSrc}
        alt="item"
        className={`w-10 h-10 rounded-full ${
          color ? "bg-[color]" : "bg-white"
        }`}
        style={{ backgroundColor: color || "white" }}
      />
      {/* Player name text */}
      <p
        className={`text-lg font-semibold ${
          playerName === selfName ? "text-blue-500" : "text-white"
        }`}
      >
        {playerName === selfName ? (
          <div class="flex items-center">
            {playerName}
            <FcLikePlaceholder />
          </div>
        ) : (
          playerName
        )}
      </p>
      {isReady ? (
        <>
          <FcOk />
          Ready...
        </>
      ) : (
        <>
          <FcLock />
          Waiting for the player to be ready...
        </>
      )}
    </div>
  );
}

function MessageItem({ value, CurrentPlayer, playerName }) {
  return CurrentPlayer ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{playerName}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{value}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{value}</p>
      </div>
      <p className="sentText pl-10 ">{playerName}</p>
    </div>
  );
}

function MessageList() {
  const [messageList, setMessageList] = useState([]);
  const { roomId, name } = useContext(AppContext);
  const { players, colors } = useContext(AppContext);
  const inputRef = useRef(null);

  const receiveMessage = (message) => {
    setMessageList((currentMessages) => [...currentMessages, message]);
  };

  useEffect(() => {
    socket.on("message-to-chat", receiveMessage);
    return () => {
      socket.off("message-to-chat", receiveMessage);
    };
  }, []);

  const sendMessage = (message) => {
    socket.emit("send-message", {
      roomID: roomId,
      name: name,
      chatMessage: message,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage(e.target.value);
      e.target.value = "";
    } else {
    }
  };

  const handleSendMessage = () => {
    if (inputRef.current) {
      sendMessage(inputRef.current.value);
      inputRef.current.value = ""; // Clear the input field
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <ScrollToBottom className="messages">
        {messageList.map((m, index) => {
          if (m.type === "chat") {
            const playerName = m.name;
            const playerColor = players.find(
              (player) => player.name === playerName
            )?.colorId;

            return (
              <MessageItem
                key={index}
                value={m.value}
                colors={colors}
                colorId={playerColor}
                CurrentPlayer={name === playerName}
                playerName={playerName}
              />
            );
          }
        })}
      </ScrollToBottom>

      <div className="p-4 flex">
        <input
          ref={inputRef}
          className="w-full rounded p-2 mr-2 border border-pink-200 focus:outline-none focus:ring focus:ring-pink-300"
          placeholder="Type a message..."
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSendMessage}
          className="bg-pink-300 text-white hover:bg-pink-400 focus:outline-none rounded px-4 py-2"
        >
          Send
        </button>
      </div>
    </div>
  );
}
