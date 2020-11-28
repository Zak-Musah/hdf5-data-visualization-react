import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import axios from "axios";

import { chartStyling, Labels } from "../Helpers/Constants";

function Chart({ fileData, multipleFiles }) {
  const [firstPlot, setFirstPlot] = useState([]);
  const [secondPlot, setSecondPlot] = useState([]);
  const range = (start, end, step) => {
    return Array.from(
      Array.from(Array(Math.ceil((end - start) / step)).keys()),
      (x) => start + x * step,
    );
  };

  const HandleDeletePlotTwo = (index) => {};

  useEffect(() => {
    let chartsObject = [];
    fileData.map((obj, index) => {
      let data = {
        x: range(0, 610, 1),
        y: obj.glucose,
        type: "date",
        mode: "line",

        hoverinfo: "closest",
        name: multipleFiles[index][0],
      };
      chartsObject.push(data);
    });
    // const data = fileData;
    // const time = data.time;
    // const glucose = data.glucose;
    // const chartsObject = [
    //   { xaxis: time, yaxais: glucose, title: "Glucose Dataset" },
    // { xaxis: time, yaxais: measurement, title: "Measurement Dataset" },
    // ];

    setFirstPlot(chartsObject);
  }, [fileData]);

  const HandleClick = (eventData) => {
    let name = eventData.points[0]["data"]["name"];
    let index = eventData.points[0]["pointIndex"];
    let glucoseValue = eventData.points[0]["y"];

    const data = { file_name: name, index };
    axios
      .post(`http://localhost:5000/api/meas`, data)
      .then((response) => {
        if (response.data.status === true) {
          let xaxis = [];
          response.data.data.measurement.map((e, index) => {
            xaxis.push(index);
          });
          console.log(response.data.data.measurement);
          let meas = {
            x: xaxis,
            y: response.data.data.measurement,
            type: "date",
            mode: "line",

            hoverinfo: "closest",
            name: `${name.slice(9, -5)}: ${(glucoseValue * 1e6).toPrecision(
              2,
            )}`,
          };
          setSecondPlot((p) => [...p, meas]);
        } else {
          // setFileData([]);
        }
        // setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  console.log(firstPlot);
  console.log(secondPlot);
  return (
    <div className="row">
      {firstPlot.length > 0 && (
        <Plot
          style={{ width: "100%", height: "35%" }}
          data={firstPlot}
          layout={{
            hovermode: "closest",
            autosize: true,
            showlegend: true,
            showgrid: true,
            gridcolor: chartStyling.gridcolor,
            textColor: chartStyling.textColor,
            // title: obj.title,
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
            // width: 1100,
            // height: 350,
            xaxis: {
              automargin: true,
              showgrid: true,
              gridcolor: chartStyling.gridcolor,
              mirror: chartStyling.mirrorTicks,
              showline: true,
              linecolor: chartStyling.lcolor,
              // rangeslider: {},
              // rangeselector: Labels[i],
              tickfont: {
                size: chartStyling.size,
                color: chartStyling.textColor,
              },
              title: {
                // text: Labels[i]["xLabel"],
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
              linecolor: chartStyling.lcolor,
              fixedrange: true,
              tickfont: {
                size: chartStyling.size,
                color: chartStyling.textColor,
              },

              title: {
                // text: Labels[i]["yLabel"],
                font: {
                  size: chartStyling.size,
                  color: chartStyling.textColor,
                },
              },
            },
          }}
          onClick={HandleClick}
          config={{
            responsive: true,
            useResizeHandler: true,
            displaylogo: false,
            displayModeBar: true,
          }}
        />
      )}
      {secondPlot.length > 0 && (
        <Plot
          style={{ width: "100%", height: "35%" }}
          data={secondPlot}
          layout={{
            hovermode: "closest",
            autosize: true,
            showlegend: true,
            showgrid: true,
            gridcolor: chartStyling.gridcolor,
            textColor: chartStyling.textColor,
            // title: obj.title,
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
            // width: 1100,
            // height: 350,
            xaxis: {
              automargin: true,
              showgrid: true,
              gridcolor: chartStyling.gridcolor,
              mirror: chartStyling.mirrorTicks,
              showline: true,
              linecolor: chartStyling.lcolor,

              tickfont: {
                size: chartStyling.size,
                color: chartStyling.textColor,
              },
              title: {
                // text: Labels[i]["xLabel"],
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
              linecolor: chartStyling.lcolor,
              fixedrange: true,
              tickfont: {
                size: chartStyling.size,
                color: chartStyling.textColor,
              },

              title: {
                // text: Labels[i]["yLabel"],
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
      )}
    </div>
  );
}

export default Chart;
