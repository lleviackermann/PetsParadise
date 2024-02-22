import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

export default function BasicLineChart({ salesData }) {
  return (
    <LineChart
      xAxis={[
        {
          data: salesData.xData,
          scaleType: "point",
        },
      ]}
      series={[
        {
          data: salesData.yData,
        },
      ]}
      width={700}
      height={340}
    />
  );
}
