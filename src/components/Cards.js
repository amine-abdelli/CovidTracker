import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import { Card, Row } from "antd";

export const Cards = ({
  dataGb: { confirmed, recovered, deaths, lastUpdate },
  data,
  selected,
  timeLine,
}) => {
  const [globalDataPC, setGlobalDataPC] = useState({});

  useEffect(() => {
    setGlobalDataPC(data);
  }, [data]);

  if (!data) {
    return "loading...";
  }
  let nbDeaths = 0;
  let nbRecovered = 0;
  let nbConfirmed = 0;

  Object.values(globalDataPC).forEach((data) => {
    nbRecovered += data.recovered;
    nbDeaths += data.deaths;
    nbConfirmed += data.confirmed;
  });

  const event = new Date(lastUpdate);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div>
      <div className="paragraph">
        <p>
          {
            <span>
              <CountUp start={0} end={confirmed.value} duration={5} />
            </span>
          }{" "}
          cas de coronavirus dans le monde. <span>191</span> pays sont concernés
          soit <span>78%</span> des pays du monde. Par ailleurs on décompte{" "}
          <CountUp start={0} end={recovered.value} duration={5} /> guérisons et{" "}
          {<CountUp start={0} end={deaths.value} duration={5} />} décés.
        </p>
      </div>

      {/* Yoyoyo */}
      <div className="cards">
        <Row>
          <Card className="card" title={`Guérisons`} style={{ width: 150 }}>
            <p>{<CountUp start={0} end={nbRecovered} duration={4} />}</p>
          </Card>
          <Card className="card" title={`Morts`} style={{ width: 150 }}>
            <p>{<CountUp start={0} end={nbDeaths} duration={4} />}</p>
          </Card>
          <Card className="card" title={`Cas confirmés`} style={{ width: 150 }}>
            <p>{<CountUp start={0} end={nbConfirmed} duration={4} />}</p>
          </Card>
        </Row>
      </div>

      <div>{` Dernière mise à jour ${event.toLocaleDateString(
        "fr-FR",
        options
      )}`}</div>
    </div>
  );
};
