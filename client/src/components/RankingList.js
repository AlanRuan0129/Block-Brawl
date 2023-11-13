import { useContext } from "react";
import { AppContext } from "../GameContext";

export function RankingList({ list, myID }) {
  return (
    <div>
      <div className="mt-5 w-96 h-0.5"></div>

      {/* Titles */}
      <div className="flex flex-row pt-2">
        <div className="w-1/4">
          <p className="text-xl font-medium text-purple-600">Ranking</p>
        </div>
        <div className="w-1/2 flex justify-center">
          <p className="text-xl font-medium text-purple-600">Player</p>
        </div>
        <div className="w-1/4 flex justify-center">
          <p className="text-xl font-medium text-purple-600">Score</p>
        </div>
      </div>
      <div>
        {list !== undefined ? (
          list.map((p, index) => (
            <RankItem player={p} rank={index + 1} myID={myID} key={p.id} />
          ))
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

// RankItem.js

function RankItem({ player, rank, myID }) {
  const { colors } = useContext(AppContext);
  const color = colors[player.colorId];
  return (
    <div
      className={`flex flex-row py-2 my-3 ${
        myID === player.id ? "border-2 border-blue-500 rounded-lg" : ""
      }`}
    >
      <div className="flex justify-center items-center w-1/4">
        <p className="text-xl font-medium">{rank}.</p>
      </div>
      <div className="flex justify-center items-center w-1/2">
        <img
          className="w-8 h-8 rounded-md"
          src={
            player.isBreaker
              ? "/assets/p_up_e0d1af.png"
              : "/assets/p_up_e0d1af.png"
          }
          alt="Avatar"
          // style={{ backgroundColor: color ?? "white" }}
        />
        <p className="pl-2">{player.name}</p>
      </div>
      <div className="flex justify-center items-center w-1/4">
        <p className="text-xl font-medium">{player.score}</p>
      </div>
    </div>
  );
}
