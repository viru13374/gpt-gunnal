// src/App.js
import React, { useState, useEffect } from "react";
import LoginPage from "./LoginPage";
import AboutCollege from "./components/AboutCollege";
import AdminDashboard from "./dashboards/AdminDashboard";
import TeacherDashboard from "./dashboards/TeacherDashboard";
import StudentDashboard from "./dashboards/StudentDashboard";
import Sidebar from "./components/Sidebar";
import StatsSection from "./components/StatsSection";
import Footer from "./components/Footer";
import {
  Box,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Dialog
} from "@mui/material";

export default function App() {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    return saved
      ? JSON.parse(saved)
      : [{ username: "admin", password: "admin", role: "admin" }];
  });

  const [attendanceRecords, setAttendanceRecords] = useState(() => {
    const saved = localStorage.getItem("attendanceRecords");
    return saved ? JSON.parse(saved) : [];
  });

  const [marksRecords, setMarksRecords] = useState(() => {
    const saved = localStorage.getItem("marksRecords");
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [openLogin, setOpenLogin] = useState(false);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("attendanceRecords", JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  useEffect(() => {
    localStorage.setItem("marksRecords", JSON.stringify(marksRecords));
  }, [marksRecords]);

  const handleLogin = (username, password) => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      setActiveTab("Dashboard");
      setOpenLogin(false); // close popup
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => setCurrentUser(null);

  // ==============================
  // IF USER LOGGED IN → SHOW DASHBOARD
  // ==============================
  if (currentUser) {
    let dashboardContent = null;

    if (currentUser.role === "admin") {
      dashboardContent = (
        <AdminDashboard
          users={users}
          setUsers={setUsers}
          activeTab={activeTab}
          selectedSemester={selectedSemester}
          setSelectedSemester={setSelectedSemester}
        />
      );
    } else if (currentUser.role === "teacher") {
      dashboardContent = (
        <TeacherDashboard
          users={users}
          setUsers={setUsers}
          attendanceRecords={attendanceRecords}
          setAttendanceRecords={setAttendanceRecords}
          marksRecords={marksRecords}
          setMarksRecords={setMarksRecords}
          activeTab={activeTab}
          selectedSemester={selectedSemester}
          setSelectedSemester={setSelectedSemester}
        />
      );
    } else if (currentUser.role === "student") {
      dashboardContent = (
        <StudentDashboard
          user={currentUser}
          attendanceRecords={attendanceRecords}
          marksRecords={marksRecords}
          activeTab={activeTab}
        />
      );
    }

    return (
      <Box display="flex" height="100vh">
        <Sidebar
          user={currentUser}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleLogout={handleLogout}
        />
        <Box flex={1} p={3} overflow="auto">
          {dashboardContent}
        </Box>
      </Box>
    );
  }

  // ==============================
  // IF NOT LOGGED IN → SHOW HOME PAGE
  // ==============================

  return (
    <>
      {/* Top Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
           GOVERNMENT POLYTECHNIC GUNNAL
          </Typography>

          <Button color="inherit" onClick={() => setOpenLogin(true)}>
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* About College Section */}
      <AboutCollege />

    <div>
      {/* Other components like header, main content, etc. */}

      {/* Footer at the bottom */}
      <Footer />
    </div>
      {/* Login Popup Dialog */}
      <Dialog open={openLogin} onClose={() => setOpenLogin(false)}>
        <LoginPage onLogin={handleLogin} />
      </Dialog>
    </>
  );
}