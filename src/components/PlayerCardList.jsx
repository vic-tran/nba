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

  const MAX_PLAYERS = 4; // set the maximum number of player cards you can add to 3

  return (
    <div>
      <h2 className="flex justify-center text-3xl">
        NBA 2022 Player Stats
        <button className="flex justify-center cursor-pointer mb-10" onClick={handleAddPlayer}>+</button>
      </h2>
       
      <div>
        
      </div>
      <div className="flex justify-center">
        {players.slice(0, MAX_PLAYERS).map((player, index) => (
          <div key={index} className="inline-Block">
            <PlayerCard playerName={player} />
            <button className="cursor-pointer font-semibold" onClick={() => handleDeletePlayer(index)}>
              Delete Player
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;
