import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";

const Chart = ({
  dataGb: { confirmed, recovered, deaths, lastUpdate },
  data,
  selected,
  timeLine,
}) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    setDailyData(timeLine.data);
  }, [timeLine]);
  // console.log("DATAGB", confirmed, recovered, deaths, lastUpdate);
  // console.log("DATA", data);
  // console.log("TIMELINE", timeLine.data[0].Date);
  // console.log("TIMELINE STATE", dailyData);

  // dailyData
  //   .filter((data) => {
  //     return data.Country === selected && data.Province === "";
  //   })
  //   .map((data) => {
  //     return data.Deaths;
  //   });

  const barChart = (
    <Bar
      data={{
        labels: dailyData
          .filter((data) => {
            return data.Country === selected && data.Province === "";
          })
          .map((data) => {
            return data.Date;
          }),
        datasets: [
          {
            data: dailyData
              .filter((data) => {
                return data.Country === selected && data.Province === "";
              })
              .map((data) => {
                return data.Confirmed;
              }),
            label: "Infected",
            borderColor: "yellow",
            backgroundColor: "yellow",

            fill: true,
          },
          {
            data: dailyData
              .filter((data) => {
                return data.Country === selected && data.Province === "";
              })
              .map((data) => {
                return data.Deaths;
              }),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "red",
            fill: true,
          },
          {
            data: dailyData
              .filter((data) => {
                return data.Country === selected && data.Province === "";
              })
              .map((data) => {
                return data.Recovered;
              }),
            label: "Recovered",
            borderColor: "green",
            backgroundColor: "green",
            fill: true,
          },
          {
            data: dailyData
              .filter((data) => {
                return data.Country === selected && data.Province === "";
              })
              .map((data) => {
                return data.Active;
              }),
            label: "Active",
            borderColor: "pink",
            backgroundColor: "pink",
            fill: true,
          },
        ],
      }}
    />
  );

  return <div className="container">{barChart}</div>;
};

export default Chart;
