import React, { useState } from "react";
import PlayerCard from "./PlayerCard";

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddPlayer = () => {
    setPlayers([...players, inputValue]);
    setInputValue("");
  };

  const handleDeletePlayer = (index) => {
    const newPlayers = [...players];
    newPlayers.splice(index, 1);
    setPlayers(newPlayers);
  };

  const MAX_PLAYERS = 5; // set the maximum number of player cards you can add to 3

  return (
    <div>
      <h2 className="flex justify-center text-3xl mt-5" >
        NBA 2022 Player Stats
      </h2>
      <div>
      <button className="addPlayer" onClick={handleAddPlayer}>+</button>
      </div>
      
      <div className="flex flex-wrap justify-center">
        {players.slice(0, MAX_PLAYERS).map((player, index) => (
          <div key={index} className="inline-flex items-center flex-col mr-10 space-x-4">
            <PlayerCard playerName={player} />
            <button className="cursor-pointer font-semibold text-blue-300" 
                onClick={() => handleDeletePlayer(index)}>
                    Delete Player
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;
