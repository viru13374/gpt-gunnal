// src/dashboards/StudentDashboard.js
import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Grid, Snackbar, Alert } from "@mui/material";
import { Bar } from "react-chartjs-2";
import DataTable from "../components/DataTable";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function StudentDashboard({ user, attendanceRecords = [], marksRecords = [], activeTab }) {
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

  // Filter data for this student
  const studentAttendance = attendanceRecords.filter((a) => a.student === user.username);
  const studentMarks = marksRecords.filter((m) => m.student === user.username);

  // Attendance stats
  const presentCount = studentAttendance.filter((a) => a.status === "Present").length;
  const absentCount = studentAttendance.filter((a) => a.status === "Absent").length;

  // Marks stats
  const subjects = ["Math", "Science", "English", "Computer", "History"];
  const marksPerSubject = subjects.map((sub) => {
    const marks = studentMarks.filter((m) => m.subject === sub);
    return marks.length ? marks.reduce((acc, m) => acc + m.marks, 0) / marks.length : 0;
  });

  // Chart data
  const attendanceChart = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        label: "Attendance",
        data: [presentCount, absentCount],
        backgroundColor: ["rgba(76,175,80,0.7)", "rgba(244,67,54,0.7)"],
      },
    ],
  };

  const marksChart = {
    labels: subjects,
    datasets: [
      {
        label: "Marks",
        data: marksPerSubject,
        backgroundColor: "rgba(33,150,243,0.7)",
      },
    ],
  };

  // Alerts
  useEffect(() => {
    if (studentAttendance.length > 0 && absentCount / studentAttendance.length > 0.3) {
      setSnackbar({ open: true, message: "Warning: Low attendance!", severity: "warning" });
    }
    const lowMarks = marksPerSubject.some((m) => m < 40 && m > 0);
    if (lowMarks) {
      setSnackbar({ open: true, message: "Warning: Low marks in some subjects!", severity: "warning" });
    }
  }, [absentCount, marksPerSubject, studentAttendance.length]);

  return (
    <Box>
      <Typography variant="h5" mb={3}>
        Welcome, {user.username}
      </Typography>

      {/* ===================== DASHBOARD TAB ===================== */}
      {activeTab === "Dashboard" && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" mb={1}>
                Attendance Overview
              </Typography>
              <Bar data={attendanceChart} />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" mb={1}>
                Marks per Subject
              </Typography>
              <Bar data={marksChart} />
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* ===================== ATTENDANCE TAB ===================== */}
      {activeTab === "Attendance" && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" mb={1}>
            Your Attendance Records
          </Typography>
          <DataTable data={studentAttendance} columns={["date", "status"]} />
        </Paper>
      )}

      {/* ===================== MARKS TAB ===================== */}
      {activeTab === "Marks" && (
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1" mb={1}>
            Your Marks Records
          </Typography>
          <DataTable data={studentMarks} columns={["subject", "marks"]} />
        </Paper>
      )}

      {/* ===================== SNACKBAR ===================== */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
} 