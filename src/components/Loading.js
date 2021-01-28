import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVirus } from "@fortawesome/free-solid-svg-icons";

export const Loading = () => {
  return (
    <div className="loadingContent">
      <FontAwesomeIcon className="icon" icon={faVirus} />

      <p>
        Coronavirus <br />
        <span className="move">TRACKER</span>
      </p>
      <div className="sideStrip"></div>
    </div>
  );
};

// <img src={require("../virus.jpg")} alt="aa" />
