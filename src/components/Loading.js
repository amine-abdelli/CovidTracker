import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVirus } from "@fortawesome/free-solid-svg-icons";

export const Loading = () => {
  return (
    <div className="loadingContent">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeIn" }}
        className="box"
      >
        <div className="virusicon">
          <FontAwesomeIcon className="icon" icon={faVirus} />
        </div>
        <img
          className="img"
          src={require("../img/Coronavirus.svg").default}
          alt=""
        />
      </motion.div>
      <div
        initial={{ width: 100 }}
        animate={{ width: 1000 }}
        transition={{ duration: 3 }}
        className="sideStrip"
      ></div>
    </div>
  );
};

// <img src={require("../virus.jpg")} alt="aa" />
