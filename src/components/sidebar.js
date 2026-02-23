import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Button,
  Divider
} from "@mui/material";

const Sidebar = ({ user, activeTab, setActiveTab, handleLogout }) => {
  if (!user) return null;

  const menuItems = {
    admin: ["Dashboard", "Add User", "Manage Users", "Reports"],
    teacher: ["Dashboard", "Add Student", "Attendance", "Marks"],
    student: ["Dashboard", "Attendance", "Marks"]
  };

  const items = menuItems[user.role?.toLowerCase()] || ["Dashboard"];

  return (
    <Box
      sx={{
        width: 240,
        height: "100vh",
        bgcolor: "#f4f6f8",
        display: "flex",
        flexDirection: "column",
        p: 2
      }}
    >
      <Typography variant="h6" mb={2}>
        {user.role?.toUpperCase()} PANEL
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <List>
        {items.map((item) => (
          <ListItemButton
            key={item}
            selected={activeTab === item}
            onClick={() => setActiveTab(item)}
            sx={{ borderRadius: 2, mb: 1 }}
          >
            <ListItemText primary={item} />
          </ListItemButton>
        ))}
      </List>

      <Button
        variant="contained"
        color="error"
        sx={{ mt: "auto" }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Sidebar;