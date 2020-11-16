import React from "react";
import { render } from "enzyme";
import renderer from "react-test-renderer";

import Chart from "../Chart/Chart";

test("Chart renders properly", () => {
  const wrapper = render(<Chart />);
  expect(wrapper.find(".useEffect"));
});

test("Chart renders with snapshot", () => {
  const tree = renderer.create(<Chart />).toJSON();
  expect(tree).toMatchSnapshot();
});
