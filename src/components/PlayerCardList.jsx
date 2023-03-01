import React, { Component } from 'react';
import PlayerCard from './PlayerCard';


class PlayerCardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          players: []
        };
      }
    
      addPlayer = () => {
        const newPlayer = <PlayerCard />;
        this.setState(prevState => ({
          players: [...prevState.players, newPlayer]
        }));
      };
    
      removePlayer = () => {
        this.setState(prevState => ({
          players: prevState.players.slice(0, -1)
        }));
      };
    
      render() {
        const { players } = this.state;
        return (
          <div>
            <div>
              <button onClick={this.addPlayer}>Add Player</button>
              <button onClick={this.removePlayer}>Remove Player</button>
            </div>
            <div style={{ display: "flex" }}>
              {players.map((player, index) => (
                <div key={index} style={{ display: "inline-block" }}>
                  {player}
                </div>
              ))}
            </div>
          </div>
        );
      }
    }
export default PlayerCardList;
