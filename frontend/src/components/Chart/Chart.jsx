import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import axios from "axios";

import { chartStyling, Labels } from "../Helpers/Constants";

function Chart({ firstPlot, secondPlot, HandleClick }) {
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
