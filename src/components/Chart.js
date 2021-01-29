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
      className="chart"
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
            label: "Confirmés",
            borderColor: "#6930c3",
            backgroundColor: "#6930c3",

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
            borderColor: "#16c79a",
            backgroundColor: "#16c79a",
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
            borderColor: "#ec4646",
            backgroundColor: "#ec4646",
            fill: true,
          },
        ],
      }}
      options={{ maintainAspectRatio: false }}
    />
  );
  console.log("MYDATA", timeLine.data);
  return (
    <>
      <div className="chartMain">{barChart}</div>
    </>
  );
};

export default Chart;
