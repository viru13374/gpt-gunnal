import React from "react";
import { Box, Container, Grid, Typography, Divider } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1976d2",
        color: "#fff",
        py: 3, // compact vertical padding
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container alignItems="center" justifyContent="space-between">

          {/* Left: College Info */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" fontWeight="bold">
              Government Polytechnic Gunnal
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
              Empowering students with quality technical education.
            </Typography>
          </Grid>

          {/* Right: Contact Info */}
          <Grid item xs={12} md={6} sx={{ textAlign: { xs: "center", md: "right" } }}>
            <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
               Gunnal near Nandi Petroliums, NH50, Post: Gunnal,<br></br> Tq: Yelburga, District: Koppal, Karnataka <br />
              Phone: +91 12345 67890 <br />
              Email: info@gpolytechnic.edu.in
            </Typography>
          </Grid>
      
        </Grid>

        {/* Divider */}
        <Divider sx={{ my: 2, backgroundColor: "rgba(255,255,255,0.3)" }} />

        {/* Bottom Text */}
        <Typography variant="body2" textAlign="center" sx={{ opacity: 0.8 }}>
         Designed , Developed By CSE Student  © {new Date().getFullYear()} Government Polytechnic Gunnal. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}