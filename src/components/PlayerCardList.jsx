import React, { Component } from 'react';
import PlayerCard from './PlayerCard';

class PlayerCardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
    };
  }

  addPlayer = () => {
    const { players } = this.state;
    this.setState({ players: [...players, {}] });
  };

  removePlayer = (index) => {
    const { players } = this.state;
    players.splice(index, 1);
    this.setState({ players });
  };

  render() {
    const { players } = this.state;
    return (
      <div>
        <button onClick={this.addPlayer}>Add Player</button>
        {players.map((player, index) => (
          <div key={index}>
            <PlayerCard />
            <button onClick={() => this.removePlayer(index)}>Remove Player</button>
          </div>
        ))}
      </div>
    );
  }
}

export default PlayerCardList;
