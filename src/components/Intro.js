import React from "react";
import CountUp from "react-countup";

export const Intro = ({
  dataGb: { confirmed, recovered, deaths, lastUpdate },
}) => {
  return (
    <div className="paragraph">
      <p>
        On décompte plus de{" "}
        <span style={{ color: "#6930c3" }}>
          <CountUp start={0} end={confirmed.value} duration={3} />
        </span>{" "}
        personnes qui ont été infectés par le coronavirus dans le monde et{" "}
        <span>191</span> pays sont concernés. Par ailleurs on décompte{" "}
        <span style={{ color: "#16c79a" }}>
          <CountUp start={0} end={recovered.value} duration={3.5} />
        </span>{" "}
        guérisons et{" "}
        <span style={{ color: "#ec4646" }}>
          <CountUp start={0} end={deaths.value} duration={4} />
        </span>{" "}
        décés.
      </p>
    </div>
  );
};
