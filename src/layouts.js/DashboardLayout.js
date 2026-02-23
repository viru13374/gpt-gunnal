import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children, role, activeTab, setActiveTab, onLogout }) {
  return (
    <Box display="flex" height="100vh">
      <Sidebar user={{ role }} activePage={activeTab} setActivePage={setActiveTab} handleLogout={onLogout} />
      <Box flex={1} p={3} bgcolor="#f9f9f9" overflow="auto">
        {children}
      </Box>
    </Box>
  );
}