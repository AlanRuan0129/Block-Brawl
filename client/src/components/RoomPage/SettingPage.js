import { useNavigate } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import { PlayerSelect } from "./PlayerSelect.js";
import { HostSelect } from "./HostSelect.js";
import { AppContext } from "../../GameContext.js";
import socket from "../../Socket.js";
import { MainButton } from "../MainButton/MainButton.js";
import { CheckIcon } from "@mantine/core";
import PixelMusic from "./Music/PixelMusic.js";

export default function SettingPage() {
  const navigate = useNavigate();
  const {
    setIsHost,
    setHostId,
    isHost,
    colors,
    colorStatus,
    setColorStatus,
    roomId,
    handlers,
    setConfig,
  } = useContext(AppContext);

  const [checkedColor, setCheckedColor] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const [isSuccess, setSuccess] = useState(false);
  const [isSuccess2, setSuccess2] = useState(false);

  const playerReady = () => {
    socket.emit(
      "player-ready",
      { roomId, playerId: socket.id, checkedColor },

      (isReady) => {
        if (isReady) {
          setIsReady(true);
        }
      }
    );
  };

  const playerUnReady = () => {
    setIsReady(false);
    socket.emit("player-unready", { roomId, playerId: socket.id });
  };

  const startGame = () => {
    console.log("Attempting to start game...");
    socket.emit("start-game", { roomId }, (isSuccess) => {
      if (!isSuccess) {
        alert("Not everyone is ready");
      }
    });
  };

  const checkColorBox = (index) => {
    if (index === checkedColor) {
      setCheckedColor(null);
    } else {
      setCheckedColor(index);
    }
  };

  const updateConfigLevel1 = () => {
    const Config1 = {
      level: 1,
      roundTime: 60,
      breakTime: 0.0,
    };
    socket.emit("update-config", { roomId, config: Config1 }, (isSuccess) => {
      setSuccess(isSuccess);
      setSuccess2(false);
    });
  };

  const updateConfigLevel2 = () => {
    const Config2 = {
      level: 2,
      roundTime: 120,
      breakTime: 1.0,
    };
    socket.emit("update-config", { roomId, config: Config2 }, (isSuccess) => {
      setSuccess2(isSuccess);
      setSuccess(false);
    });
  };

  useEffect(() => {
    socket.emit("room-information", { roomId }, (room) => {
      handlers.setState(room.players);
      setColorStatus(room.colorStatus);
      setHostId(room.hostId);
    });

    const startGame = (game) => {
      if (game.hostId === socket.id) {
        setIsHost(true);
      } else {
        setIsHost(false);
      }
      if (game.config) {
        setConfig(game.config);
      }
      if (game.colorStatus) {
        setColorStatus(game.colorStatus);
      }
      if (game.board) {
        navigate("/game", { state: { game: game } });
      }
    };
    socket.on("game-update", startGame);

    return () => {
      socket.off("game-update", startGame);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="overflow-hidden">
      <div className="flex flex-col h-screen bg-room bg-center bg-cover">
        <div className="flex flex-row relative justify-center gap-2 text-2xl font-bold text-pink-300">
          Room Code: {roomId}
          <button onClick={() => navigator.clipboard.writeText(roomId)}>
            <svg
              class="w-6 h-6 text-pink-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                d="m7.708 2.292.706-.706A2 2 0 0 1 9.828 1h6.239A.97.97 0 0 1 17 2v12a.97.97 0 0 1-.933 1H15M6 5v4a1 1 0 0 1-1 1H1m11-4v12a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V9.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 5h5.239A.97.97 0 0 1 12 6Z"
              />
            </svg>
          </button>
        </div>
        <div className="absolute top-0 right-0 pr-2 pt-2">
          <PixelMusic />
        </div>

        <div className="flex flex-col items-center justify-center gap-2 text-black">
          <div className="text-2xl font-bold text-pink-300 mt-[0.5rem]">
            {isHost ? "Invite your friends!" : "Wait for host to Start!"}
          </div>

          <div className="text-lg font-bold h-[1rem]">
            {isSuccess && (
              <p className="text-center text-green-500">
                Successfully Updated Normal Game
              </p>
            )}
            {isSuccess2 && (
              <p className="text-center text-green-500">
                Successfully Updated Hard Game
              </p>
            )}
          </div>
        </div>

        {isHost ? (
          <div className="flex flex-col items-center justify-center mt-[2rem]">
            <HostSelect
              colorStrings={colors}
              colorStatus={colorStatus}
              colorChecked={checkedColor}
              isReady={isReady}
              handleClick={checkColorBox}
              isHost={isHost}
            />
          </div>
        ) : (
          <div className="flex flex-row items-center justify-center mt-[8rem]">
            <PlayerSelect
              colorStrings={colors}
              colorStatus={colorStatus}
              colorChecked={checkedColor}
              isReady={isReady}
              handleClick={checkColorBox}
              isHost={isHost}
            />
          </div>
        )}
        {isHost && (
          <div class="flex items-center justify-center space-x-10 mt-[1rem]">
            <div class="relative flex flex-col items-center">
              <p className="text-xl font-bold text-pink-300 mb-5">
                Normal Game
              </p>
              <button
                onClick={updateConfigLevel1}
                className="relative overflow-hidden"
                style={{ left: "50%", transform: "translateX(-50%)" }}
              >
                <img
                  src={process.env.PUBLIC_URL + "/assets/left.jpg"}
                  alt="Normal Game"
                  className="w-[15rem] h-[8rem] rounded-2xl"
                />

                {isSuccess && (
                  <CheckIcon
                    style={{
                      width: "2rem",
                      height: "2rem",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                )}
              </button>
            </div>

            <div class="relative flex flex-col items-center">
              <p className="text-xl font-bold text-pink-300 mb-5">Hard Game</p>
              <button
                onClick={updateConfigLevel2}
                className="relative overflow-hidden"
                style={{ left: "50%", transform: "translateX(-50%)" }}
              >
                <img
                  src={process.env.PUBLIC_URL + "/assets/right.jpg"}
                  alt="Hard Game"
                  className="w-[15rem] h-[8rem] rounded-2xl"
                />
                {isSuccess2 && (
                  <CheckIcon
                    style={{
                      width: "2rem",
                      height: "2rem",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                )}
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:h-[12rem] h-[9rem] mt-[2rem] space-y-6 justify-end items-center">
          <div className="flex flex-row items-center justify-center">
            <MainButton
              handleClick={isReady ? playerUnReady : playerReady}
              text={isReady ? "Cancel" : "Ready"}
            />
          </div>

          {isHost && (
            <div className="flex flex-row items-center justify-center">
              <MainButton handleClick={startGame} text="Start Game" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
