import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { updateState } from "./utils";

export default class ClockDisplay extends Component {
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
    return <h1 className="text-center">{this.state.currentTime.format(this.props.format || "HH:mm:ss")}</h1>;
  }
}

ClockDisplay.propTypes = {
  format: PropTypes.string,
};
