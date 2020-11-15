export const chartStyling = {
  height: 450,
  size: 12,
  mirrorTicks: "ticks",
  marginLeft: 55,
  marginTop: 50,
  marginRight: 40,
  marginBottom: 55,
  borderRadius: 20,
  barGap: 0.125,
  gridcolor: "#ffeb00",
  lineColor: "#ffeb00",
  bgColor: "#1f1e45",
  textColor: "white",
};

export const Labels = [
  {
    xLabel: "Time [s]",
    yLabel: "Glucose",
    title: {
      "test_dataset_1.hdf5": "First DataSet",
      "test_dataset_2.hdf5": "Second DataSet",
    },
    rangeselector: {},
  },
  {
    xLabel: "Time [s]",
    yLabel: "Measurement [W]",
    title: {
      "test_dataset_1.hdf5": "First DataSet",
      "test_dataset_2.hdf5": "Second DataSet",
    },
  },
];
