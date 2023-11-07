import { useNavigate } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import { PlayerSelect } from "./PlayerSelect.js";
import { AppContext } from "../GameContext.js";
import socket from "../Socket";
import { MainButton } from "./MainButton.js";
import { CheckIcon, rem } from "@mantine/core";

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
    config,
    setConfig,
  } = useContext(AppContext);

  const [checkedColor, setCheckedColor] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [isReadyFail, setIsReadyFail] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isSuccess2, setSuccess2] = useState(false);
  const [isUpdateResponse, setUpdateResponse] = useState(false);

  const playerReady = () => {
    socket.emit(
      "player-ready",
      { roomId, playerId: socket.id, checkedColor },

      (isReady) => {
        if (isReady) {
          setIsReady(true);
          setIsReadyFail(false);
        } else {
          setIsReadyFail(true);
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
      boardSize: 9,
      roundTime: 60,
      breakTime: 0.0,
    };
    socket.emit("update-config", { roomId, config: Config1 }, (isSuccess) => {
      setUpdateResponse(true);
      setSuccess(isSuccess);
      setSuccess2(false);
    });
  };

  const updateConfigLevel2 = () => {
    const Config2 = {
      boardSize: 9,
      roundTime: 120,
      breakTime: 1.0,
    };
    socket.emit("update-config", { roomId, config: Config2 }, (isSuccess) => {
      setUpdateResponse(true);
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
        navigate("/Layout/game", { state: { game: game } }); ///${roomId}/game
      }
    };
    socket.on("game-update", startGame);

    return () => {
      socket.off("game-update", startGame);
    };
  }, []);

  return (
    <div>
      <h1>
        Hello setting {colors} {isSuccess ? <h1>isSuccess</h1> : <h1>no1</h1>}
        {isSuccess2 ? <h1>isSuccess2</h1> : <h1>no2</h1>}
        {isHost ? <h1>isHost</h1> : <h1>no</h1>}
      </h1>
      <div className="flex flex-row justify-center gap-2 text-2xl font-bold text-black">
        Room Code: {roomId}
        <button onClick={() => navigator.clipboard.writeText(roomId)}>
          copytotextbord
        </button>
      </div>
      <div>{isHost ? "Invite your friends!" : "Wait for host to Start!"}</div>

      {isSuccess ? (
        <p className="text-center text-green-500">
          Successfully updated game Level1
        </p>
      ) : (
        <p className="text-center text-red-500">Failed to update game Level</p>
      )}

      {isSuccess2 ? (
        <p className="text-center text-green-500">
          Successfully updated game Level2
        </p>
      ) : (
        <p className="text-center text-red-500">Failed to update game Level</p>
      )}

      <MainButton
        handleClick={isReady ? playerUnReady : playerReady}
        text={isReady ? "Cancel" : "Ready"}
      />
      {/* {isHost ? (
        <div className="flex flex-col items-center justify-around w-3/5 xl:flex-row gap-y-2">
          <MainButton handleClick={startGame} text="Start Game" />
          <button
            onClick={updateConfigLevel1}
            className="px-5 py-3 mt-5 font-semibold text-white rounded-lg text-l "
          >
            Update ConfigLevel1
          </button>
          <button
            onClick={updateConfigLevel2}
            className="px-5 py-3 mt-5 font-semibold text-white rounded-lg text-l "
          >
            Update ConfigLevel2
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-around w-3/5 xl:flex-row gap-y-2">
          <PlayerSelect colorStrings={["#e0d1af", "#81a9db"]} />
        </div>
      )} */}
      <div className="flex flex-col items-center justify-around w-3/5 xl:flex-row gap-y-2">
        <MainButton handleClick={startGame} text="Start Game" />
        <button
          onClick={updateConfigLevel1}
          className="px-5 py-3 mt-5 font-semibold text-black rounded-lg text-l "
        >
          {isSuccess && (
            <CheckIcon style={{ width: rem(12), height: rem(12) }} />
          )}
          Update ConfigLevel1
        </button>
        <button
          onClick={updateConfigLevel2}
          className="px-5 py-3 mt-5 font-semibold text-black rounded-lg text-l "
        >
          {isSuccess2 && (
            <CheckIcon style={{ width: rem(12), height: rem(12) }} />
          )}
          Update ConfigLevel2
        </button>
      </div>

      <div className="flex flex-col items-center justify-around w-3/5 xl:flex-row gap-y-2">
        {/* <PlayerSelect colorStrings={["#e0d1af", "#81a9db"]} /> */}
        <PlayerSelect
          colorStrings={colors}
          colorStatus={colorStatus}
          colorChecked={checkedColor}
          isReady={isReady}
          handleClick={checkColorBox}
        />
      </div>
    </div>
  );
}
