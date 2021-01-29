import React, { useState, useEffect } from "react";
import { Col, Row } from "antd";
import { Card } from "./Card";

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
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const updatedDate = event.toLocaleDateString("fr-FR", options);

  return (
    <div>
      <div className="cards">
        <Row justify="space-between" className="rowsb" gutter={[34, 0]}>
          <Col md={{ span: 12 }} lg={{ span: 8 }}>
            <Card
              color={"#6930c3"}
              text={"Nombre de cas confirmés"}
              title={"Confirmés"}
              data={nbConfirmed}
              date={updatedDate}
            />
          </Col>
          <Col md={{ span: 12 }} lg={{ span: 8 }}>
            <Card
              color={"#16c79a"}
              text={"Nombre de guérisons"}
              title={"Guérisons"}
              data={nbRecovered}
              date={updatedDate}
            />
          </Col>
          <Col md={{ span: 12 }} lg={{ span: 8 }}>
            <Card
              color={"#ec4646"}
              text={"Nombre de décés"}
              title={"Décés"}
              data={nbDeaths}
              date={updatedDate}
            />
          </Col>
        </Row>
      </div>

      {/* <div>{` Dernière mise à jour : ${updatedDate}`}</div> */}
    </div>
  );
};
