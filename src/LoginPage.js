  import React, { useState } from "react";
  import {
    Box,
    TextField,
    Button,
    Paper,
    Typography
  } from "@mui/material";

  export default function LoginPage({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
      <Box>
        <Paper sx={{ p: 4, width: 350, borderRadius: 3 }} elevation={6}>
          <Typography variant="h6" mb={2} align="center">
            College Login
          </Typography>

          <TextField
            fullWidth
            label="Username"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => onLogin(username, password)}
          >
            Login
          </Button>
        </Paper>
      </Box>
    );
  }