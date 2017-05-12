import React, { Component } from "react";
import moment from "moment";
import { updateState } from "./utils";

class ClockDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      currentTime: moment(),
    };
  }

  componentDidMount() {
    const timer = setInterval(() => updateState(this, { currentTime: moment() }), 1000);

    updateState(this, { timer });
  }

  componentWillUnmount() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
      updateState(this, { timer: null });
    }
  }

  render() {
    return <h1 className="text-center">{this.state.currentTime.format("HH:mm:ss")}</h1>;
  }
}

export default ClockDisplay;
