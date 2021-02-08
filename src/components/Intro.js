import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";

export const Intro = ({ dataGb: { confirmed, recovered, deaths } }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5, duration: 1.5 }}
      className="paragraph"
    >
      <p>
        On compte à ce jour plus de{" "}
        <span style={{ color: "#6930c3" }}>
          <CountUp start={0} end={confirmed.value} duration={3} />
        </span>{" "}
        cas de coronavirus dans le monde depuis le <span>1er janvier 2020</span>
        , et ce nombre continue de grandir. Par ailleurs on décompte{" "}
        <span style={{ color: "#16c79a" }}>
          <CountUp start={0} end={recovered.value} duration={3.5} />
        </span>{" "}
        guérisons et{" "}
        <span style={{ color: "#ec4646" }}>
          <CountUp start={0} end={deaths.value} duration={4} />
        </span>{" "}
        décès.
      </p>
    </motion.div>
  );
};
