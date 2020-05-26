import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-solid-svg-icons";

import "../sass/_error.scss";

export class Error extends Component {
  render() {
    return (
      <div className="error">
        <h2>Oops!</h2>
        <FontAwesomeIcon icon={faFrown} />
        <p>It seems something went wrong. Please try again.</p>
      </div>
    );
  }
}

export default Error;
