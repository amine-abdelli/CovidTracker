import React, { useState, useEffect } from "react";
import CountUp from "react-countup";

export const Cards = ({
  dataGb: { confirmed, recovered, deaths, lastUpdate },
  data,
  selected,
  timeLine,
}) => {
  const [globalDataPC, setGlobalDataPC] = useState([]);

  useEffect(() => {
    setGlobalDataPC(data);
  }, []);

  const filteredData = globalDataPC.filter((data) => {
    return data.countryRegion === selected && data.provinceState === null;
  });

  console.log("MY ORIGINAL DATA", globalDataPC);
  console.log("MY FILTERED DATA", filteredData);

  return (
    <div>
      <div>
        {
          <CountUp
            start={0}
            end={confirmed.value}
            duration={5}
            onEnd={() => alert("Ended! 👏")}
          />
        }
      </div>
      <div> {<CountUp start={0} end={recovered.value} duration={5} />}</div>
      <div> {<CountUp start={0} end={deaths.value} duration={5} />}</div>

      <div>{lastUpdate}</div>
    </div>
  );
};
