import React from "react";
import { render, mount, shallow } from "enzyme";
import renderer from "react-test-renderer";
import Plot from "react-plotly.js";

import Chart from "../Chart/Chart";
import { chartBgColor } from "../Helpers/Constants";
const props = {
  x: [0, 1, 2, 3, 4],
  y: [2, 4, 6, 8, 10],
  type: "date",
  mode: "line",
  hoverinfo: "closest",
  name: "Test",
};

test("Chart renders first plot properly", () => {
  const wrapper = mount(
    <Chart
      firstPlot={[props]}
      secondPlot={[]}
      lightDarkMode={chartBgColor.darkMode}
    />,
  );
  const element = wrapper.find(Plot);
  expect(element).toHaveLength(1);
  wrapper.unmount();
});

test("Chart renders 2 plots properly", () => {
  const secondProps = {
    x: [0, 1, 2, 3, 4],
    y: [2, 4, 6, 8, 10],
    type: "date",
    mode: "line",
    hoverinfo: "closest",
    name: "Test2",
  };
  const wrapper = mount(
    <Chart
      firstPlot={[props]}
      secondPlot={[secondProps]}
      lightDarkMode={chartBgColor.darkMode}
    />,
  );
  const element = wrapper.find(Plot);
  expect(element).toHaveLength(2);
  wrapper.unmount();
});

test("Chart renders with snapshot", () => {
  const tree = renderer
    .create(<Chart firstPlot={props} secondPlot={[]} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
  wrapper.unmount();
});
