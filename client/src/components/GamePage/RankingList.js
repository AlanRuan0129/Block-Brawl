import { useContext } from "react";
import { AppContext } from "../../GameContext";

export function RankingList({ list, myID }) {
  return (
    <div>
      <div className="mt-5 w-96 h-0.5"></div>

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

function RankItem({ player, rank, myID }) {
  const { colors } = useContext(AppContext);
  const color = colors[player.colorId];
  return (
    <div
      className={`flex flex-row bg-sky-100 rounded-lg shadow-3d py-3 my-4 ${
        myID === player.id
          ? "border-[0.2rem] border-white bg-yellow-300 rounded-lg"
          : ""
      }`}
    >
      <div className="flex justify-center items-center w-1/4">
        <p className="text-xl font-medium">{rank}</p>
      </div>
      <div className="flex flex-row justify-center items-center w-1/2">
        <div className="flex flex-col  justify-center items-center w-[1.5rem]">
          <img
            className="rounded-md"
            src={
              "../assets/p_" +
              "down" +
              "_" +
              color.toString().substring(1) +
              ".png"
            }
            alt="Avatar"
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="pl-2">{player.name}</p>
        </div>
      </div>
      <div className="flex flex-row space-x-2 justify-center items-center w-1/4">
        <img className="w-[2rem]" src="../assets/winner.png" alt="Winner" />
        <p className="text-xl font-medium">{player.score}</p>
      </div>
    </div>
  );
}
