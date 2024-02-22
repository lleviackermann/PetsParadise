import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect } from "react";

const chartSetting = {
  xAxis: [
    {
      label: "Number Of Units Sold",
    },
  ],
  width: 500,
  height: 400,
};

const valueFormatter = (value) => `${value}units`;

export default function BasicBarGraph({ data }) {
  const [d, setD] = React.useState([]);
  useEffect(() => {
    const arr = [];
    for (let i = 0; i < 6; i++) {
      arr.push({ obj: data.xData[i], count: data.yData[i] });
    }
    setD(arr);
  }, []);
  return (
    <>
      {d.length > 0 ? (
        <BarChart
          dataset={d}
          yAxis={[{ scaleType: "band", dataKey: "obj" }]}
          series={[
            {
              dataKey: "count",
              label: "Category Wise Pets Sold",
              valueFormatter,
            },
          ]}
          layout="horizontal"
          {...chartSetting}
        />
      ) : (
        <>Loading...</>
      )}
    </>
  );
}
