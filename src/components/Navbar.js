import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

export default function Navbar({ onLogout }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Student Management System
        </Typography>
        <Button color="inherit" onClick={onLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}