import React from "react";
import PlayerCard from "./PlayerCard";
import PlayerCardList from "./PlayerCardList";


function Home () {
  return (
    <div className="home">
      <PlayerCardList />
      <PlayerCard />
    </div>
  );
}

export default Home;

