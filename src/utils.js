import _ from "lodash";

export function updateState(component, stateUpdates = {}) {
  component.setState(_.merge(component.state, stateUpdates));
}
