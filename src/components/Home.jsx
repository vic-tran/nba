import React from "react";
import PlayerCard from "./PlayerCard";
import PlayerCardList from "./PlayerCardList";


function Home () {
  return (
    <div className="bg-gray-100">
      <PlayerCardList />
      <PlayerCard />
    </div>
  );
}

export default Home;

