import React, {Component} from "react";
import axios from "axios";




class PlayerCard extends Component {

  // initializes the state with playerName set as null & playerStats as empty object
    constructor (props) {
      super(props)
      this.state = {
        playerName: null,
        playerStats: {},
        playerPicture: null,
    }
  }

   
  // calls playerId and logs playername 
  handleSubmit = (e) => {
      e.preventDefault();
      this.getPlayerId()
      this.getPlayerPic(this.state.playerName, 1)
      console.log(this.state.playerName)
  }



  // change null to player name submitted
  handleChange = (event) => {
      const replace = event.target.value.split(" ").join("_").toLowerCase();
      if(replace.length > -2){
        this.setState({playerName: replace})
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
        this.playerPicture = pic_src;
      }else {
        this.playerPicture = pic_src;
      }
    }
  }


  // makes GET request to balldontlie API to retrieve ID based on name submitted
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



// GET request to balldontlie API to retrieve player stats based on ID
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
    <div className="flex justify-center mt-5">

      <div className="player">
       <form onSubmit={this.handleSubmit}>
          <label className="font-bold">
            Name:
            <input 
              className="font-normal"
              type="text"
              value = {this.state.value}
              onChange={this.handleChange}
              placeholder="Enter Player Name"
              />
          </label>
          <input type="submit" value="Submit" className="cursor-pointer font-semibold mr-5"/>
       </form>
            <img alt="" src={this.playerPicture} />
          <br />
        <div className="flex font-semibold">
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
        </div>
    
        

    </div>
    );
  }
}

export default PlayerCard;
