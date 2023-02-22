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

  getPlayerId = () => {
    axios.get("https://www.balldontlie.io/api/v1/players?search=kyrie")
    .then(async res => {
      console.log(res.data.data)
      await this.getPlayerStats(res.data.data[0].id)
    }).catch(err => {
      console.log(err)
    })
  }

  getPlayerStats = (playerID) => {
    axios.get("https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=228")
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
      
    </div>
  );
}
}

export default App;
