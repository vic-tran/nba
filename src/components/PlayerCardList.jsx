import React, { useState } from "react";
import PlayerCard from "./PlayerCard";
import { v4 as uuidv4 } from "uuid";

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddPlayer = () => {
    const newPlayer = { id: uuidv4(), name: inputValue };
    setPlayers([...players, newPlayer]);
    setInputValue("");
  };

  const handleDeletePlayer = (playerToDelete) => {
    const newPlayers = players.filter((player) => player.id !== playerToDelete.id);
    setPlayers(newPlayers);
  };

  const MAX_PLAYERS = 5;

  return (
    <div>
      <h2 className="flex justify-center text-3xl mt-5">NBA 2022-2023 Player Stats</h2>
      <div>
        <button className="addPlayer" onClick={handleAddPlayer}>
          Add Player
        </button>
        
      </div>

      <div className="flex flex-wrap justify-center">
        {players.slice(0, MAX_PLAYERS).map((player) => (
          <div key={player.id} className="inline-flex items-center flex-col mr-10 space-x-4">
            <PlayerCard playerName={player.name} />
            <button
              className="cursor-pointer font-semibold text-blue-300 mb-5"
              onClick={() => handleDeletePlayer(player)}
            >
              Delete Player
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;