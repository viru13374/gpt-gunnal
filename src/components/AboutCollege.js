  // src/components/AboutCollege.js
  import React from "react";
  import { Box, Typography, Grid, Paper, Button } from "@mui/material";
  import StatsSection from "./StatsSection";

  // Import local images from src/assets
  import csImg from "../assets/cs.jpeg";
  import aetImg from "../assets/aet.jpeg";
  import eeeImg from "../assets/eee.jpeg";
  import logoImg from "../assets/clglogo.jpeg";
  import KEImg from "../assets/KE.png";
   // your college logo

  const AboutCollege = () => {  
    const programs = [
      { name: "Diploma in Computer Science [CSE]", img: csImg },
      { name: "Diploma in Alternative Energy Technology [AET]", img: aetImg },
      { name: "Diploma in Electrical & Electronics Engineering [EEE]", img: eeeImg },
    ];

    return (
      <Box sx={{ py: 8, px: 4, backgroundColor: "#f9f9f9" }}>
        
        {/* About Section */}
        <Grid container spacing={4} alignItems="center">
          {/* Logo */}
          <Grid item xs={12} md={2} sx={{ textAlign: "center" }}>
            <Box
              component="img"
              src={logoImg}
              alt="College Logo"
              sx={{ width: 300, height: "auto", objectFit: "contain" }}
            />
              <Box
              component="img"
              src={KEImg}
              alt="Education Logo"
              sx={{ width: 300, height: "auto", objectFit: "contain" , alignItems: "center" }}
            />
          </Grid>

          {/* About Text */}
          <Grid item xs={12} md={10}>
            <Typography variant="overline" color="primary">
              ABOUT OUR COLLEGE
            </Typography>

            <Typography variant="h4" fontWeight="bold" gutterBottom>
              A few words about the College
            </Typography>

            <Typography variant="body1" color="text.secondary" mb={2} sx={{ lineHeight: 1.6 }}>
              Government Polytechnic Gunnal is one of the leading diploma institutions providing quality technical education.<br></br>
              We focus on innovation, practical learning, and career development. The college provides hands-on training,<br></br>
              exposure to modern labs, and industry interaction to prepare students for future challenges.
            </Typography>

            <Typography variant="body1" color="text.secondary" mb={3} sx={{ lineHeight: 1.6 }}>
              Located in Karnataka, the college offers a modern learning environment with experienced faculty,
              industry exposure, <br></br>  and placement support to help students achieve their professional goals.
            </Typography>

            <Button variant="contained" size="large">
              Learn More
            </Button>
          </Grid>
        </Grid>

        {/* Programs Offered */}
        <Box mt={8}>
          <Typography variant="h5" fontWeight="bold" textAlign="center" mb={4}>
            Programs Offered
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {programs.map((program, index) => (
              <Grid item xs={12} sm={4} md={4} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    textAlign: "center",
                    borderRadius: 3,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    height: 320,
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 6,
                      transition: "0.3s",
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={program.img}
                    alt={program.name}
                    sx={{
                      width: "100%",
                      height: 180,
                      objectFit: "cover",
                    }}
                  />
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      py: 2,
                      px: 1,
                      flexGrow: 1,
                      wordBreak: "break-word",
                    }}
                  >
                    {program.name}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Stats Section */}
        <Box sx={{ mt: 8, textAlign: "center" }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            College Statistics
          </Typography>
          <StatsSection />
        </Box>
      </Box>
    );
  };

  export default AboutCollege;