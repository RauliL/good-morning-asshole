import React, { Component } from "react";
import _ from "lodash";
import ClockDisplay from "./ClockDisplay";
import FoliDisplay from "./FoliDisplay";
import RedditDisplay from "./RedditDisplay";

const COMPONENT_MAPPING = {
  clock: ClockDisplay,
  f\u00f6li: FoliDisplay,
  reddit: RedditDisplay,
};

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
    const components = [];

    if (_.isArray(this.state.config.components)) {
      this.state.config.components.forEach((config, index) => {
        config.key = index;
        components.push(React.createElement(COMPONENT_MAPPING[config.type], config.props));
      });
    }

    return <div className="container">{components}</div>;
  }
}

export default App;
