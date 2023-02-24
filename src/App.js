import React, {Component} from "react";
import axios from "axios";


class App extends Component {

    constructor (props) {
      super(props)
      this.state = {
        player1Name: null,
        player1Stats: {}
    }
  }

  handleSubmit = (e) => {
      e.preventDefault();
      this.getPlayer1Id()
      console.log(this.state.player1Name)
  }


  // change null to player name submitted
  handleChange = (event) => {
      const replace = event.target.value.split(" ").join("_");
      if(replace.length > -2){
        this.setState({player1Name: replace})
      } else {
        alert("Please enter a valid player name")
      }
  }

  getPlayer1Id = () => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${this.state.player1Name}`)
    .then(async res => {
     // console.log(res.data.data)
      if(res.data.data[0]=== undefined){
        alert("Enter a valid player")
      } else if(res.data.data.length > 1) {
        alert("Please enter correct name!")
      } else {
        await this.getPlayer1Stats(res.data.data[0].id)
      }
      await this.getPlayer1Stats(res.data.data[0].id)
    }).catch(err => {
      console.log(err)
    })
  }

  getPlayer1Stats = (player1Id) => {
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=${player1Id}`)
    .then(async (res) => {
       console.log(res.data.data)
      this.setState({ player1Stats: res.data.data[0]})
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
        Games Played: {this.state.player1Stats["games_played"]}
       <br />
        Points: {this.state.player1Stats["pts"]}
       <br />
        Rebounds: {this.state.player1Stats["reb"]}
       <br />
        Assists: {this.state.player1Stats["ast"]}
       <br />
        Blocks: {this.state.player1Stats["blk"]}
       <br />
        FG%: {this.state.player1Stats["fg_pct"] ? (this.state.player1Stats["fg_pct"]*100).toFixed(2) : ''}
       <br />
        3PT%: {this.state.player1Stats["fg3_pct"] ? (this.state.player1Stats["fg3_pct"]*100).toFixed(2) : ''}
      <br />
        Minutes: {this.state.player1Stats["min"]}
      <br />
        Steals: {this.state.player1Stats["stl"]}
      <br />
        Turnovers: {this.state.player1Stats["turnover"]}
      <br />
        FT%:{this.state.player1Stats["ft_pct"] ? (this.state.player1Stats["ft_pct"]*100).toFixed(2) : ''}
    </div>
    );
  }
}

export default App;
