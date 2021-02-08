import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
// import {} from "react-chartjs-2";

const Chart = ({ selected, timeLine }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    setDailyData(timeLine.data);
  }, [timeLine]);

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
            borderColor: "rgba(105, 48, 195, 1)",
            backgroundColor: "rgba(105, 48, 195, 1)",
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
            borderColor: "rgba(22, 199, 154, 1)",
            backgroundColor: "rgba(22, 199, 154, 1)",
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
            borderColor: "rgba(236, 70, 70, 1)",
            backgroundColor: "rgba(236, 70, 70, 1)",
            fill: true,
          },
        ],
      }}
      options={{
        maintainAspectRatio: false,
        legend: {
          onHover: function (e) {
            e.target.style.cursor = "pointer";
          },
        },
        hover: {
          onHover: function (e) {
            var point = this.getElementAtEvent(e);
            if (point.length) e.target.style.cursor = "pointer";
            else e.target.style.cursor = "default";
          },
        },
        tooltips: {
          mode: "dataset",
        },
      }}
    />
  );
  return (
    <>
      <div className="chartMain">{barChart}</div>
    </>
  );
};

export default Chart;
