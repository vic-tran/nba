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
      if(replace.length > 0){
        this.setState({playerName: replace})
      } else {
        alert("Please enter a valid player name")
      }
  }

  getPlayerId = () => {
    axios.get(`https://www.balldontlie.io/api/v1/players?search=${this.state.playerName}`)
    .then(async res => {
      console.log(res.data.data)
      if(res.data.data===undefined){
        alert("This player has not played this season!")
      }
      await this.getPlayerStats(res.data.data[0].id)
    }).catch(err => {
      console.log(err)
    })
  }

  getPlayerStats = (playerID) => {
    axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=${playerID}`)
    .then(async (res) => {
      console.log(res.data.data)
      this.setState({ playerStats: res.data.data[0]})
    }).catch(err => {
      console.log(err)
    })
  }

  componentDidMount(){
    this.getPlayerId()
    this.getPlayerStats()
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
    </div>
  );
}
}

export default App;
