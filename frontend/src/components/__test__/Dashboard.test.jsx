import React from "react";
import { mount, render } from "enzyme";
import renderer from "react-test-renderer";
import axios from "axios";

import Dashboard from "../Dashboard/Dashboard";

test("Dashboard renders properly", () => {
  const wrapper = render(<Dashboard />);
  expect(wrapper.find(".card-body").length).toBe(2);
  expect(wrapper.find(".card-title").first().text()).toBe("Select File");
  expect(wrapper.text()).toMatch("No data yet...");
});

test("Dashboard renders with snapshot", () => {
  const tree = renderer.create(<Dashboard />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Dashboard get file names", async () => {
  const wrapper = mount(<Dashboard />);
  axios.get(`http://localhost:5000/api/get_file_names`).then((response) => {
    expect(wrapper).toMatch(
      `{"data":["test_dataset_1.hdf5","test_dataset_2.hdf5"],"message":"Data files retrieved","status":true}`,
    );
  });
});

test("Dashboard click on first file name", () => {
  const wrapper = mount(<Dashboard />);
  const element = wrapper.find("button").first();
  expect(element).toHaveLength(1);
  element.simulate("click");
  expect(wrapper).toMatchSnapshot();
  wrapper.unmount();
});

test("Dashboard click on clear dashboard", () => {
  const wrapper = mount(<Dashboard />);
  const element = wrapper.find("button").last();
  expect(element).toHaveLength(1);
  element.simulate("click");
  expect(wrapper).toMatchSnapshot();
  wrapper.unmount();
});
