import React from "react";
import Plot from "react-plotly.js";

import { chartStyling } from "../Helpers/Constants";

function Chart({ firstPlot, secondPlot, HandleClick, lightDarkMode }) {
  return (
    <div className="row">
      {firstPlot.length > 0 && (
        <Plot
          className="col-md-12"
          style={{ width: "100%", height: "35%", marginBottom: "-50px" }}
          data={firstPlot}
          layout={{
            hovermode: "closest",
            autosize: true,
            showlegend: true,
            legend: {
              automargin: true,
              font: {
                family: "sans-serif",
                size: chartStyling.size,
                color: lightDarkMode.legendColor,
              },
            },
            showgrid: true,
            gridcolor: lightDarkMode.gridcolor,
            textColor: lightDarkMode.textColor,
            title: "Glucose Dataset",
            titlefont: {
              size: chartStyling.size,
              color: lightDarkMode.textColor,
            },
            tickfont: {
              size: chartStyling.size,
              color: chartStyling.textColor,
            },
            plot_bgcolor: lightDarkMode.bgColor,
            paper_bgcolor: lightDarkMode.bgColor,
            border_radius: chartStyling.borderRadius,
            displayModeBar: false,
            margin: {
              t: chartStyling.marginTop,
            },
            xaxis: {
              automargin: true,
              showgrid: true,
              gridcolor: lightDarkMode.gridcolor,
              mirror: chartStyling.mirrorTicks,
              showline: true,
              linecolor: lightDarkMode.lcolor,
              tickfont: {
                size: chartStyling.size,
                color: lightDarkMode.textColor,
              },
              title: {
                text: "Data points",
                font: {
                  size: chartStyling.size,
                  color: lightDarkMode.textColor,
                },
              },
            },
            yaxis: {
              showgrid: true,
              automargin: true,
              gridcolor: lightDarkMode.gridcolor,
              mirror: chartStyling.mirrorTicks,
              showline: true,
              linecolor: lightDarkMode.lcolor,
              fixedrange: true,
              tickfont: {
                size: chartStyling.size,
                color: lightDarkMode.textColor,
              },
              title: {
                text: "Glucose Dataset",
                font: {
                  size: chartStyling.size,
                  color: lightDarkMode.textColor,
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
          className="col-md-12"
          style={{ width: "100%", height: "35%", marginTop: "-50px" }}
          data={secondPlot}
          layout={{
            hovermode: "closest",
            autosize: true,
            showlegend: true,
            showgrid: true,
            legend: {
              automargin: true,
              font: {
                family: "sans-serif",
                size: chartStyling.size,
                color: lightDarkMode.legendColor,
              },
            },
            gridcolor: lightDarkMode.gridcolor,
            textColor: lightDarkMode.textColor,
            title: "Spectra",
            titlefont: {
              size: chartStyling.size,
              color: lightDarkMode.textColor,
            },
            tickfont: {
              size: chartStyling.size,
              color: lightDarkMode.textColor,
            },
            plot_bgcolor: lightDarkMode.bgColor,
            paper_bgcolor: lightDarkMode.bgColor,
            border_radius: chartStyling.borderRadius,
            displayModeBar: false,
            margin: {
              t: chartStyling.marginTop,
            },
            xaxis: {
              automargin: true,
              showgrid: true,
              gridcolor: lightDarkMode.gridcolor,
              mirror: chartStyling.mirrorTicks,
              showline: true,
              linecolor: lightDarkMode.lcolor,
              tickfont: {
                size: chartStyling.size,
                color: lightDarkMode.textColor,
              },
              title: {
                text: "Measurement Samples",
                font: {
                  size: chartStyling.size,
                  color: lightDarkMode.textColor,
                },
              },
            },
            yaxis: {
              showgrid: true,
              automargin: true,
              gridcolor: lightDarkMode.gridcolor,
              mirror: chartStyling.mirrorTicks,
              showline: true,
              linecolor: lightDarkMode.lcolor,
              fixedrange: true,
              tickfont: {
                size: chartStyling.size,
                color: lightDarkMode.textColor,
              },
              title: {
                text: "Wavenumber [cm-1]",
                font: {
                  size: chartStyling.size,
                  color: lightDarkMode.textColor,
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
