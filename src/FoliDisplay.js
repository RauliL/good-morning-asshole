import React, { Component } from "react";
import moment from "moment";
import _ from "lodash";
import { updateState } from "./utils";

function fetchArrivalData(stopId) {
  return fetch(`https://data.foli.fi/siri/sm/${stopId}/`)
    .then(response => response.json())
    .then(data => {
      if (data.status !== "OK") {
        return Promise.reject("Föli wasn't able to return any arrivals.");
      }

      return data.result.map(arrival => ({
        id: `${stopId}-${arrival.lineref}-${arrival.expectedarrivaltime}`,
        stop: stopId,
        line: arrival.lineref,
        destination: arrival.destinationdisplay,
        time: moment.unix(arrival.expectedarrivaltime),
      }));
    })
}

class FoliDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      arrivals: [],
      timer: null,
    };
  }

  componentDidMount() {
    const timer = setInterval(() => this.updateArrivals(), 60000);

    updateState(this, { timer });
    this.updateArrivals();
  }

  componentWillUnmount() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
      updateState(this, { timer: null });
    }
  }

  updateArrivals() {
    updateState(this, {
      isLoading: true,
      arrivals: [],
    });
    Promise.all(this.props.stops.map(fetchArrivalData)).then(arrivalArrays => {
      let arrivals = _.union(...arrivalArrays).sort((a, b) => {
        const x = a.time.unix();
        const y = b.time.unix();

        return x > y ? 1 : x < y ? -1 : 0;
      });

      if (this.props.arrivalDisplayLimit) {
        arrivals = _.take(arrivals, this.props.arrivalDisplayLimit);
      }
      updateState(this, {
        isLoading: false,
        arrivals,
      })
    });
  }

  render() {
    return (
      <div className="card">
        <div className="card-block">
          <h4 className="card-title">
            <i className="fa fa-bus"/>
            &nbsp;
            Föli
          </h4>
        </div>
        <table className="table">
          <tbody>
            {
              this.state.isLoading
                ? <tr>
                    <td colSpan="3" className="text-center">
                      <i className="fa fa-spinner fa-spin fa-2x"/>
                    </td>
                  </tr>
                : this.state.arrivals.map(arrival =>
                    <tr key={arrival.id}>
                      <td>{arrival.time.format("HH:mm")}</td>
                      <td>{arrival.stop}</td>
                      <td>{arrival.line} - {arrival.destination}</td>
                    </tr>
                  )
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default FoliDisplay;
