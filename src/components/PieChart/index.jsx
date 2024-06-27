import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart(props) {
  const data = props.data;
  const options = {};
  return (
    <>
      <div style={{ padding: "20px", width: "50%" }}>
        <Pie className="" data={data} options={options}></Pie>
      </div>
    </>
  );
}

export default PieChart;
