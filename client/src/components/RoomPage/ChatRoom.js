import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../GameContext";
import socket from "../../Socket";
import ScrollToBottom from "react-scroll-to-bottom";
import { FcLock, FcOk } from "react-icons/fc";
import { IoIosSend } from "react-icons/io";

import "./Messages.css";
import "./Message.css";

export default function ChatRoom() {
  const { roomId } = useContext(AppContext);

  if (!roomId) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen">
      {" "}
      <PlayerList />
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
    // eslint-disable-next-line
  }, []);

  return (
    <div className="bg-slate-900 text-cyan-400">
      <p className="text-lg text-center font-bold pt-3 pb-2">Let's Chat</p>

      <div className="overflow-none bg-slate-900 h-[12.5rem]">
        {players.map((p, index) => (
          <PlayerItem
            key={index}
            color={colors[p.colorId]}
            selfName={name}
            playerName={p.name}
            isHost={p.id === hostId}
            // isBreaker={p.isBreaker}
            isReady={p.isReady}
          />
        ))}
      </div>
    </div>
  );
}

function PlayerItem({ color, selfName, playerName, isReady, isHost }) {
  const avatarSrc = process.env.PUBLIC_URL + "/assets/wait.png";

  return (
    <div className="flex flex-col pb-2 px-[0.5rem]">
      <div className="flex items-center space-x-2 mb-2 p-2 border-[0.1rem] rounded-[1rem] border-cyan-400">
        <img
          src={
            color
              ? process.env.PUBLIC_URL +
                "../assets/p_" +
                "down" +
                "_" +
                color.toString().substring(1) +
                ".png"
              : avatarSrc
          }
          alt="item"
          className="w-[2rem] h-[2rem] rounded-full object-contain bg-pic-blue"
        />

        <div className="flex flex-row space-x-2 justify-between w-full">
          <div>
            <p
              className={`text-lg font-semibold ${
                playerName === "text-cyan-500"
              }`}
            >
              {playerName === selfName ? (
                <div className="flex items-center">
                  {playerName}
                  <img
                    src="/assets/location.png"
                    alt="Me"
                    className="h-[1.4rem] w-[1.4rem] ml-[0.3rem]"
                  />
                </div>
              ) : (
                playerName
              )}
            </p>
          </div>
          <div className="flex flex-row space-x-2 items-center justify-center">
            {isReady ? (
              <>
                <FcOk />
                <span>Ready</span>
              </>
            ) : (
              <>
                <FcLock />
                <span>Waiting</span>
              </>
            )}
          </div>
        </div>
      </div>
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
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <ScrollToBottom className="messages">
        {/* eslint-disable-next-line */}
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

      <div className="p-4 flex  bg-indigo-950">
        <input
          ref={inputRef}
          className="w-full rounded-[1rem] p-2 mr-2 border-[0.1rem] border-pink-200 focus:outline-none focus:ring focus:ring-pink-300"
          placeholder="Type a message..."
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSendMessage}
          className="bg-pink-300 text-[1.5rem] text-white hover:bg-pink-400 focus:outline-none rounded-[0.8rem] px-5 py-3"
        >
          <IoIosSend />
        </button>
      </div>
    </div>
  );
}
