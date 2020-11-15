import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { chartStyling, Labels } from "../Helpers/Constants";
function Dashboard({ testData, testName }) {
  const [dataToPlot, setDataTop] = useState([]);

  useEffect(() => {
    if (Object.keys(testData).length > 0) {
      const data = testData.data;
      console.log(data);
      const time = data.time;
      console.log(time);
      const glucose = data.glucose;
      const measurement = data.measurement;
      const arrayOfObjects = [
        { xaxis: time, yaxais: glucose },
        { xaxis: time, yaxais: measurement },
      ];
      setDataTop(arrayOfObjects);
    }
  }, [testData]);
  return (
    <>
      {dataToPlot.length > 0 &&
        Labels &&
        dataToPlot.map((obj, i) => (
          <Plot
            data={[
              {
                x: obj.xaxis,
                y: obj.yaxais,
                type: "date",
                mode: "line",

                line: {
                  width: 3,
                  color: "#e6347d",
                },
                hoverinfo: "closest",
              },
            ]}
            layout={{
              autosize: true,
              showlegend: false,
              showgrid: true,
              gridcolor: chartStyling.gridcolor,
              textColor: chartStyling.textColor,
              title: Labels[i]["title"][testName],
              height: chartStyling.height,
              titlefont: {
                size: chartStyling.size,
                color: chartStyling.textColor,
              },
              tickfont: {
                size: chartStyling.size,
                color: chartStyling.textColor,
              },

              plot_bgcolor: chartStyling.bgColor,
              paper_bgcolor: chartStyling.bgColor,
              border_radius: chartStyling.borderRadius,
              displayModeBar: false,
              margin: {
                l: chartStyling.marginLeft,
                t: chartStyling.marginTop,
                r: chartStyling.marginRight,
                b: chartStyling.marginBottom,
              },

              xaxis: {
                automargin: true,
                showgrid: true,
                gridcolor: chartStyling.gridcolor,
                mirror: chartStyling.mirrorTicks,
                showline: true,
                linecolor: chartStyling.lineColor,
                rangeslider: {},
                rangeselector: Labels[i],
                tickfont: {
                  size: chartStyling.size,
                  color: chartStyling.textColor,
                },
                showline: true,
                linecolor: chartStyling.lineColor,
                title: {
                  text: Labels[i]["xLabel"],
                  font: {
                    size: chartStyling.size,
                    color: chartStyling.textColor,
                  },
                },
              },
              yaxis: {
                showgrid: true,
                automargin: true,
                gridcolor: chartStyling.gridcolor,
                mirror: chartStyling.mirrorTicks,
                showline: true,
                linecolor: chartStyling.lineColor,
                fixedrange: true,
                tickfont: {
                  size: chartStyling.size,
                  color: chartStyling.textColor,
                },
                showline: true,
                linecolor: chartStyling.lineColor,
                title: {
                  text: Labels[i]["yLabel"],
                  font: {
                    size: chartStyling.size,
                    color: chartStyling.textColor,
                  },
                },
              },
            }}
            config={{
              responsive: true,
              useResizeHandler: true,
              displaylogo: false,
              displayModeBar: true,
            }}
          />
        ))}
    </>
  );
}

export default Dashboard;
