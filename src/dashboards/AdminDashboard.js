// src/dashboards/AdminDashboard.js
import React, { useState } from "react";
import {
  Box, Typography, TextField, Button,
  Paper, Table, TableHead, TableRow,
  TableCell, TableBody, TableContainer, Grid, MenuItem
} from "@mui/material";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  ArcElement, BarElement, Tooltip, Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, ArcElement, BarElement, Tooltip, Legend);

export default function AdminDashboard({ users = [], setUsers, activeTab }) {
  const safeUsers = Array.isArray(users) ? users : [];

  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("student");
  const [newSemester, setNewSemester] = useState(1);

  const handleAddUser = () => {
    if (!newUsername || !newPassword) return alert("Fill all fields");

    const exists = safeUsers.find(u => u.username === newUsername);
    if (exists) return alert("User already exists");

    const newUser = {
      username: newUsername,
      password: newPassword,
      role: newRole,
      semester: newRole === "student" ? newSemester : null
    };

    const updated = [...safeUsers, newUser];
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));

    setNewUsername("");
    setNewPassword("");
  };

  const handleDeleteUser = (username) => {
    const updated = safeUsers.filter(u => u.username !== username);
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  // Chart Data
  const roleCounts = safeUsers.reduce(
    (acc, u) => {
      acc[u.role] = (acc[u.role] || 0) + 1;
      return acc;
    },
    { admin: 0, teacher: 0, student: 0 }
  );

  const chartData = {
    labels: ["Admins", "Teachers", "Students"],
    datasets: [
      {
        label: "Users",
        data: [roleCounts.admin, roleCounts.teacher, roleCounts.student],
        backgroundColor: ["#3f51b5", "#f50057", "#ff9800"]
      }
    ]
  };

  if (activeTab === "Add User") {
    return (
      <Box>
        <Typography variant="h5" mb={2}>Add User</Typography>

        <Box display="flex" gap={2} mb={3}>
          <TextField label="Username" value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)} />

          <TextField type="password" label="Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)} />

          <TextField select label="Role"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="teacher">Teacher</MenuItem>
            <MenuItem value="student">Student</MenuItem>
          </TextField>

          {newRole === "student" && (
            <TextField select label="Semester"
              value={newSemester}
              onChange={(e) => setNewSemester(Number(e.target.value))}>
              {[1,2,3,4,5,6].map(s =>
                <MenuItem key={s} value={s}>Sem {s}</MenuItem>
              )}
            </TextField>
          )}

          <Button variant="contained" onClick={handleAddUser}>Add</Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Semester</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {safeUsers.map(u => (
                <TableRow key={u.username}>
                  <TableCell>{u.username}</TableCell>
                  <TableCell>{u.role}</TableCell>
                  <TableCell>{u.semester || "-"}</TableCell>
                  <TableCell>
                    <Button color="error" variant="contained"
                      onClick={() => handleDeleteUser(u.username)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }

  if (activeTab === "Manage Users") {
    return (
      <Box>
        <Typography variant="h5" mb={2}>Manage Users</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {safeUsers.map(u => (
                <TableRow key={u.username}>
                  <TableCell>{u.username}</TableCell>
                  <TableCell>{u.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }

  if (activeTab === "Dashboard") {
    return (
      <Box>
        <Typography variant="h5" mb={3}>Admin Dashboard</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p:2 }}>
              <Typography mb={1}>Users Distribution (Pie)</Typography>
              <Pie data={chartData} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p:2 }}>
              <Typography mb={1}>Users Count (Bar)</Typography>
              <Bar data={chartData} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  }
if (activeTab === "Reports") {
  return (
    <Box>
      <Typography variant="h5">Reports</Typography>
      <Typography>Total Users: {safeUsers.length}</Typography>
      <Typography>
        Students: {safeUsers.filter(u => u.role === "student").length}
      </Typography>
      <Typography>
        Teachers: {safeUsers.filter(u => u.role === "teacher").length}
      </Typography>
    </Box>
  );
} 
  return <Typography>Welcome Admin</Typography>;
}