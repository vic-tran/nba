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
        Players
        <button className="flex justify-center cursor-pointer" onClick={handleAddPlayer}>+</button>
      </h2>
       
      <div>
        
      </div>
      <div className="flex">
        {players.slice(0, MAX_PLAYERS).map((player, index) => (
          <div key={index} className="inline-Block">
            <PlayerCard playerName={player} />
            <button className="cursor-pointer" onClick={() => handleDeletePlayer(index)}>
              Delete Player
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;
