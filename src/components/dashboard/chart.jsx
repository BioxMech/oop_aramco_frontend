import React from 'react';

import BarChart from './barChart';
import PieChart from './pieChart';

function Chart({ name, type, data }) {

  let chartComponent;

  if (type === "Bar") {
    chartComponent = <BarChart name={name} data={data} />
  } else if (type === "Pie") {
    chartComponent = <PieChart name={name} data={data} />
  }

  return chartComponent
}

export default Chart;