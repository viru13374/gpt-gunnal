// components/StatsSection.js
import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";

export default function StatsSection() {
  const stats = [
    { value: "97%", label: "Pass Percentage" },
    { value: "300+", label: "Students Enrolled" },
    { value: "10+", label: "Modern Labs" }
  ];

  return (
    <Box sx={{ py: 6, backgroundColor: "#f5f5f5" }}>
      <Grid container spacing={3} justifyContent="center">
        {stats.map((item, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Paper
              elevation={4}
              sx={{
                p: 4,
                textAlign: "center",
                borderRadius: 3,
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-5px)"
                }
              }}
            >
              <Typography variant="h3" fontWeight="bold" color="primary">
                {item.value}
              </Typography>
              <Typography variant="h6" mt={1}>
                {item.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}