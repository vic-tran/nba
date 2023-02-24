import React, {Component} from "react";
import axios from "axios";


class App extends Component {
    constructor (props) {
      super(props)
      this.state = {
        playerName: null,
        playerStats: {}
    }
  }

  handleSubmit = (e) => {
      e.preventDefault();
      this.getPlayerId()
      console.log(this.state.playerName)
  }


  // change null to player name submitted
  handleChange = (event) => {
      const replace = event.target.value.split(" ").join("_");
      if(replace.length > -2){
        this.setState({playerName: replace})
      } else {
        alert("Please enter a valid player name")
      }
  }

  getPlayerId = () => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${this.state.playerName}`)
    .then(async res => {
     // console.log(res.data.data)
      if(res.data.data[0]=== undefined){
        alert("Enter a valid player")
      } else if(res.data.data.length > 1) {
        alert("Please enter correct name!")
      } else {
        await this.getPlayerStats(res.data.data[0].id)
      }
      await this.getPlayerStats(res.data.data[0].id)
    }).catch(err => {
      console.log(err)
    })
  }

  getPlayerStats = (playerId) => {
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=${playerId}`)
    .then(async (res) => {
       console.log(res.data.data)
      this.setState({ playerStats: res.data.data[0]})
    }).catch(err => {
      console.log(err)
    })
  }



  render () {
  return (
    <div className="App">
       <form onSubmit={this.handleSubmit}>
          <label>
            Name
            <input 
              type="text"
              value = {this.state.value}
              onChange={this.handleChange}
              placeholder="Enter Player Name"
              />
          </label>
          <input type="submit" value="Submit"/>
       </form>
        Games Played: {this.state.playerStats["games_played"]}
       <br />
        Points: {this.state.playerStats["pts"]}
       <br />
        Rebounds: {this.state.playerStats["reb"]}
       <br />
        Assists: {this.state.playerStats["ast"]}
       <br />
        Blocks: {this.state.playerStats["blk"]}
       <br />
        FG%: {this.state.playerStats["fg_pct"] ? (this.state.playerStats["fg_pct"]*100).toFixed(2) : ''}
       <br />
        3PT%: {this.state.playerStats["fg3_pct"] ? (this.state.playerStats["fg3_pct"]*100).toFixed(2) : ''}
      <br />
        Minutes: {this.state.playerStats["min"]}
      <br />
        Steals: {this.state.playerStats["stl"]}
      <br />
        Turnovers: {this.state.playerStats["turnover"]}
      <br />
        FT%:{this.state.playerStats["ft_pct"] ? (this.state.playerStats["ft_pct"]*100).toFixed(2) : ''}
    </div>
  );
}
}

export default App;
