import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import DataTable from "../components/DataTable";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function TeacherDashboard({
  users = [],
  setUsers,
  attendanceRecords = [],
  setAttendanceRecords,
  marksRecords = [],
  setMarksRecords,
  activeTab,
  selectedSemester,
  setSelectedSemester
}) {
  // ===== SAFE DATA =====
  const safeUsers = Array.isArray(users) ? users : [];
  const safeAttendance = Array.isArray(attendanceRecords) ? attendanceRecords : [];
  const safeMarks = Array.isArray(marksRecords) ? marksRecords : [];

  // ===== STATE =====
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentPassword, setNewStudentPassword] = useState("");

  const [attendanceStudent, setAttendanceStudent] = useState("");
  const [attendanceStatus, setAttendanceStatus] = useState("Present");

  const [openMarksDialog, setOpenMarksDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [marksData, setMarksData] = useState({
    Math: "",
    Science: "",
    English: "",
    Computer: "",
    History: ""
  });

  const subjects = ["Math", "Science", "English", "Computer", "History"];

  // ===== FILTER STUDENTS =====
  const students = safeUsers.filter(
    (u) => u.role === "student" && u.semester === selectedSemester
  );

  // ===== ADD STUDENT =====
  const handleAddStudent = () => {
    if (!newStudentName.trim() || !newStudentPassword.trim()) {
      alert("Please fill all fields!");
      return;
    }

    const newUser = {
      username: newStudentName.trim(),
      password: newStudentPassword,
      role: "student",
      semester: selectedSemester
    };

    const updated = [...safeUsers, newUser];
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));

    setNewStudentName("");
    setNewStudentPassword("");
  };

  // ===== ADD ATTENDANCE =====
  const handleAddAttendance = () => {
    if (!attendanceStudent) return;

    const newRecord = {
      student: attendanceStudent,
      status: attendanceStatus,
      date: new Date().toISOString().slice(0, 10),
      semester: selectedSemester
    };

    const updated = [...safeAttendance, newRecord];
    setAttendanceRecords(updated);
    localStorage.setItem("attendanceRecords", JSON.stringify(updated));

    setAttendanceStudent("");
    setAttendanceStatus("Present");
  };

  // ===== OPEN MARKS =====
  const handleOpenMarks = (student) => {
    setSelectedStudent(student);

    const studentMarks = safeMarks.filter(
      (m) => m.student === student && m.semester === selectedSemester
    );

    const newMarksData = {
      Math: "",
      Science: "",
      English: "",
      Computer: "",
      History: ""
    };

    studentMarks.forEach((m) => {
      newMarksData[m.subject] = m.marks;
    });

    setMarksData(newMarksData);
    setOpenMarksDialog(true);
  };

  // ===== SAVE MARKS =====
  const handleSaveMarks = () => {
    const filtered = safeMarks.filter(
      (m) => !(m.student === selectedStudent && m.semester === selectedSemester)
    );

    const newMarksArr = subjects.map((sub) => ({
      student: selectedStudent,
      semester: selectedSemester,
      subject: sub,
      marks: Number(marksData[sub] || 0)
    }));

    const updated = [...filtered, ...newMarksArr];

    setMarksRecords(updated);
    localStorage.setItem("marksRecords", JSON.stringify(updated));

    setOpenMarksDialog(false);
  };

  // ====================== CHART DATA ======================

  const filteredAttendance = safeAttendance.filter(
    (a) => a.semester === selectedSemester
  );

  const filteredMarks = safeMarks.filter(
    (m) => m.semester === selectedSemester
  );

  const attendanceChart = {
    labels: students.map((s) => s.username),
    datasets: [
      {
        label: "Present",
        data: students.map(
          (s) =>
            filteredAttendance.filter(
              (a) => a.student === s.username && a.status === "Present"
            ).length
        ),
        backgroundColor: "rgba(76,175,80,0.7)"
      },
      {
        label: "Absent",
        data: students.map(
          (s) =>
            filteredAttendance.filter(
              (a) => a.student === s.username && a.status === "Absent"
            ).length
        ),
        backgroundColor: "rgba(244,67,54,0.7)"
      }
    ]
  };

  const marksChart = {
    labels: subjects,
    datasets: [
      {
        label: "Average Marks",
        data: subjects.map((sub) => {
          const subjectMarks = filteredMarks.filter(
            (m) => m.subject === sub
          );
          return subjectMarks.length
            ? subjectMarks.reduce((acc, m) => acc + m.marks, 0) /
                subjectMarks.length
            : 0;
        }),
        backgroundColor: "rgba(33,150,243,0.7)"
      }
    ]
  };

  if (activeTab === "Dashboard") {
  return (
    <Box>
      {/* HEADER WITH SEMESTER SELECT */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5">
          Teacher Dashboard
        </Typography>

        <Select
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          {[1, 2, 3, 4, 5, 6].map((sem) => (
            <MenuItem key={sem} value={sem}>
              Semester {sem}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* CHARTS */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 350 }}>
            <Typography mb={2}>Attendance Overview</Typography>
            <Bar data={attendanceChart} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 350 }}>
            <Typography mb={2}>Marks Overview</Typography>
            <Bar data={marksChart} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

  // ===== ADD STUDENT TAB =====
  if (activeTab === "Add Student") {
    return (
      <Box>
        <Typography variant="h6" mb={2}>Add Student</Typography>

        <Box display="flex" gap={2} mb={3}>
          <TextField
            label="Student Username"
            value={newStudentName}
            onChange={(e) => setNewStudentName(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            value={newStudentPassword}
            onChange={(e) => setNewStudentPassword(e.target.value)}
          />
          <Button variant="contained" onClick={handleAddStudent}>
            Add
          </Button>
        </Box>

        <DataTable
          data={students}
          columns={["username"]}
          actionColumn={{ label: "Add Marks", onClick: handleOpenMarks }}
        />
      </Box>
    );
  }

// ===== ATTENDANCE TAB =====
if (activeTab === "Attendance") {

  const semesterAttendance = safeAttendance.filter(
    (a) => a.semester === selectedSemester
  );

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Attendance
      </Typography>

      {/* ADD FORM */}
      <Box display="flex" gap={2} mb={3}>
        <Select
          value={attendanceStudent}
          onChange={(e) => setAttendanceStudent(e.target.value)}
          displayEmpty
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">Select Student</MenuItem>
          {students.map((s) => (
            <MenuItem key={s.username} value={s.username}>
              {s.username}
            </MenuItem>
          ))}
        </Select>

        <Select
          value={attendanceStatus}
          onChange={(e) => setAttendanceStatus(e.target.value)}
        >
          <MenuItem value="Present">Present</MenuItem>
          <MenuItem value="Absent">Absent</MenuItem>
        </Select>

        <Button variant="contained" onClick={handleAddAttendance}>
          Add
        </Button>
      </Box>

      {/* ATTENDANCE TABLE */}
      <Paper sx={{ p: 2 }}>
        <DataTable
          data={semesterAttendance}
          columns={["student", "date", "status"]}
        />
      </Paper>
    </Box>
  );
}

  // ===== MARKS TAB =====
  if (activeTab === "Marks") {
    return (
      <Box>
        <Typography variant="h6" mb={2}>Manage Marks</Typography>

        <DataTable
          data={students}
          columns={["username"]}
          actionColumn={{
            label: "Add / Edit Marks",
            onClick: handleOpenMarks
          }}
        />

        <Dialog open={openMarksDialog} onClose={() => setOpenMarksDialog(false)}>
          <DialogTitle>Add / Update Marks</DialogTitle>
          <DialogContent>
            {subjects.map((sub) => (
              <TextField
                key={sub}
                label={sub}
                type="number"
                fullWidth
                sx={{ mb: 1 }}
                value={marksData[sub]}
                onChange={(e) =>
                  setMarksData({ ...marksData, [sub]: e.target.value })
                }
              />
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenMarksDialog(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSaveMarks}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }

  return <Typography>Invalid Tab</Typography>;
}