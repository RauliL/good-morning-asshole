import React, { Component } from "react";
import ClockDisplay from "./ClockDisplay";
import FoliDisplay from "./FoliDisplay";
import RedditDisplay from "./RedditDisplay";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { config: {} };
  }

  componentDidMount() {
    fetch("config.json")
      .then(response => response.json())
      .then(config => this.setState({ config }));
  }

  render() {
    return (
      <div className="container">
        <ClockDisplay/>
        {this.state.config.foli && <FoliDisplay {...this.state.config.foli}/>}
        {this.state.config.reddit && <RedditDisplay {...this.state.config.reddit}/>}
      </div>
    );
  }
}

export default App;
