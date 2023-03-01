import React, {Component} from "react";
import axios from "axios";
// import PlayerPics from "../assets/PlayerPics.json";



class Home extends Component {

  // initializes the state with playerName set as null & playerStats as empty object
    constructor (props) {
      super(props)
      this.state = {
        player1Name: null,
        player1Stats: {},
        player1Picture: null,
        player2Name: null,
        player2Stats:{},
        player2Picture: null,
    }
  }

   
  // calls playerId and logs playername 
  handleSubmit1 = (e) => {
      e.preventDefault();
      this.getPlayer1Id()
      this.getPlayerPic(this.state.player1Name, 1)
      console.log(this.state.player1Name)
  }

  handleSubmit2 = (e) => {
    e.preventDefault();
    this.getPlayer2Id()
    this.getPlayerPic(this.state.player2Name, 2)
    console.log(this.state.player2Name)
  }


  // change null to player name submitted
  handleChange1 = (event) => {
      const replace = event.target.value.split(" ").join("_").toLowerCase();
      if(replace.length > -2){
        this.setState({player1Name: replace})
      } else {
        alert("Please enter a valid player name")
      }
  }

  handleChange2 = (event) => {
    const replace = event.target.value.split(" ").join("_").toLowerCase();
    if(replace.length > -2){
      this.setState({player2Name: replace})
    } else {
      alert("Please enter a valid player name")
    }
  }

  getPlayerPic = (playerName, num) => {
    const PlayerPics = require("../assets/PlayerPics.json");
    const player_dict = JSON.parse(JSON.stringify(PlayerPics));
    const pic_src = player_dict[playerName];
    console.log(pic_src);
    if(pic_src !== null) {
      if (num === 1){
        this.player1Picture = pic_src;
      }else {
        this.player2Picture = pic_src;
      }
    }
  }


  // makes GET request to balldontlie API to retrieve ID based on name submitted
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

  getPlayer2Id = () => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${this.state.player2Name}`)
    .then(async res => {
     // console.log(res.data.data)
      if(res.data.data[0]=== undefined){
        alert("Enter a valid player")
      } else if(res.data.data.length > 1) {
        alert("Please enter correct name!")
      } else {
        await this.getPlayer2Stats(res.data.data[0].id)
      }
      await this.getPlayer2Stats(res.data.data[0].id)
    }).catch(err => {
      console.log(err)
    })
  }


// GET request to balldontlie API to retrieve player stats based on ID
  getPlayer1Stats = (player1Id) => {
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=${player1Id}`)
    .then(async (res) => {
       console.log(res.data.data)
      this.setState({ player1Stats: res.data.data[0]})
    }).catch(err => {
      console.log(err)
    })
  }

  getPlayer2Stats = (player2Id) => {
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=${player2Id}`)
    .then(async (res) => {
       console.log(res.data.data)
      this.setState({ player2Stats: res.data.data[0]})
    }).catch(err => {
      console.log(err)
    })
  }


  render () {
  return (
    <div className="App">

      <div className="player1">
       <form onSubmit={this.handleSubmit1}>
          <label>
            Name
            <input 
              type="text"
              value = {this.state.value}
              onChange={this.handleChange1}
              placeholder="Enter Player Name"
              />
          </label>
          <input type="submit" value="Submit"/>
       </form>
            <img alt="" src={this.player1Picture} />
          <br />
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
    
      <div className="player2">
       <form onSubmit={this.handleSubmit2}>
          <label>
            Name
            <input 
              type="text"
              value = {this.state.value}
              onChange={this.handleChange2}
              placeholder="Enter Player Name"
              />
          </label>
          <input type="submit" value="Submit"/>
       </form>
          <img alt="" src={this.player2Picture} />
          <br />
            Games Played: {this.state.player2Stats["games_played"]}
          <br />
            Points: {this.state.player2Stats["pts"]}
          <br />
            Rebounds: {this.state.player2Stats["reb"]}
          <br />
            Assists: {this.state.player2Stats["ast"]}
          <br />
            Blocks: {this.state.player2Stats["blk"]}
          <br />
            FG%: {this.state.player2Stats["fg_pct"] ? (this.state.player2Stats["fg_pct"]*100).toFixed(2) : ''}
          <br />
            3PT%: {this.state.player2Stats["fg3_pct"] ? (this.state.player2Stats["fg3_pct"]*100).toFixed(2) : ''}
          <br />
            Minutes: {this.state.player2Stats["min"]}
          <br />
            Steals: {this.state.player2Stats["stl"]}
          <br />
            Turnovers: {this.state.player2Stats["turnover"]}
          <br />
            FT%:{this.state.player2Stats["ft_pct"] ? (this.state.player2Stats["ft_pct"]*100).toFixed(2) : ''}
        </div>


        

    </div>
    );
  }
}

export default Home;
