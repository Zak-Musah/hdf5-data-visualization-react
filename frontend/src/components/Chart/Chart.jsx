import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

import { chartStyling, Labels } from "../Helpers/Constants";

function Chart({ fileData }) {
  const [dataToPlot, setDataTop] = useState([]);

  useEffect(() => {
    if (Object.keys(fileData).length > 0) {
      const data = fileData;
      const time = data.time;
      const glucose = data.glucose;
      const measurement = data.measurement;
      const chartsObject = [
        { xaxis: time, yaxais: glucose, title: "Glucose Dataset" },
        { xaxis: time, yaxais: measurement, title: "Measurement Dataset" },
      ];
      setDataTop(chartsObject);
    }
  }, [fileData]);

  return (
    <div className="row">
      {dataToPlot.length > 0 &&
        Labels &&
        dataToPlot.map((obj, i) => (
          <div className="col-12">
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
                title: obj.title,
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
                width: 800,
                height: 350,
                xaxis: {
                  automargin: true,
                  showgrid: true,
                  gridcolor: chartStyling.gridcolor,
                  mirror: chartStyling.mirrorTicks,
                  showline: true,
                  linecolor: chartStyling.lcolor,
                  rangeslider: {},
                  rangeselector: Labels[i],
                  tickfont: {
                    size: chartStyling.size,
                    color: chartStyling.textColor,
                  },
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
                  linecolor: chartStyling.lcolor,
                  fixedrange: true,
                  tickfont: {
                    size: chartStyling.size,
                    color: chartStyling.textColor,
                  },

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
          </div>
        ))}
    </div>
  );
}

export default Chart;
