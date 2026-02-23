import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      gap={2}
    >
      <Typography variant="h3">Welcome to the Dashboard!</Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        Logout
      </Button>
    </Box>
  );
};

export default DashboardPage;