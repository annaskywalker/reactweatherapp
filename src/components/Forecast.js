import React, { Component } from 'react'
import Daily from "./Daily";
import PropTypes from "prop-types";

import '../sass/_forecasts.scss';

export class Forecast extends Component {
    render() {
        return this.props.data.slice(1).map((daily) => (
          <Daily key={daily.dt} daily={daily}  />
        ));
      }
}

//PropTypes
Forecast.propTypes = {
  daily: PropTypes.object.isRequired,
};

export default Forecast
