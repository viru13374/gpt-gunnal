import React from "react";
import { Box, Typography } from "@mui/material";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

const DashboardChart = ({ title, labels, data, type }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        backgroundColor: "rgba(63, 81, 181, 0.5)",
        borderColor: "rgba(63, 81, 181, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box mb={3}>
      <Typography variant="subtitle1" mb={1}>{title}</Typography>
      {type === "bar" ? <Bar data={chartData} /> : <Line data={chartData} />}
    </Box>
  );
};

export default DashboardChart;