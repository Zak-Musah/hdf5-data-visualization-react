import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
function Dashboard({ testData, testName }) {
  const [glucose, setGlucose] = useState([]);
  const [time, seTime] = useState([]);
  const [measurement, seMeasurement] = useState([]);
  console.log(testData);

  useEffect(() => {
    seTime(testData.data.glucose);
    setGlucose(testData.data.glucose);
  }, [testData]);

  return (
    <>
      {glucose && (
        <Plot
          data={{
            x: time,
            y: glucose,
            type: "date",
            mode: "line",
            name,
            line: {
              width: 3,
            },
            hoverinfo: "closest",
          }}
          // layout={}
          config={{
            responsive: true,
            useResizeHandler: true,
            displaylogo: false,
            displayModeBar: true,
          }}
        />
      )}
    </>
  );
}

export default Dashboard;
