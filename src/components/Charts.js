import React from "react";
import { Paper, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Charts() {
  const data = {
    labels: ["Rahul", "Priya"],
    datasets: [
      {
        label: "Marks",
        data: [78, 88],
        backgroundColor: "rgba(25,118,210,0.7)",
      },
    ],
  };

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6">Marks Graph</Typography>
      <Bar data={data} />
    </Paper>
  );
}