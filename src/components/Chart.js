import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {} from "react-chartjs-2";

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
            // data.Date.toLocaleDateString();
            const event = new Date(data.Date);
            const options = {
              year: "numeric",
              month: "long",
            };
            return event.toLocaleDateString("fr-FR", options);
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
            label: "Infectés",
            borderColor: "#FBD266",
            backgroundColor: "#FBD266",

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
            label: "Morts",
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
            label: "Guérisons",
            borderColor: "#8FB0A9",
            backgroundColor: "#8FB0A9",
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
            label: "Actif",
            borderColor: "#D76735",
            backgroundColor: "#D76735",
            fill: true,
          },
        ],
      }}
      height={200}
      width={300}
      options={{ maintainAspectRatio: false }}
    />
  );
  console.log("MYDATA", timeLine.data);
  return <div className="chartMain">{barChart}</div>;
};

export default Chart;
