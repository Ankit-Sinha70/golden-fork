import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const CircularLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 1;
        } else {
          clearInterval(interval);
          return 100;
        }
      });
    }, 15);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 200px)",
      }}
    >
      <CircularProgress
        variant="determinate"
        value={progress}
        sx={{
          color: "#C29671",
          marginBottom: 2,
        }}
        size={80}
        thickness={5}
      />
      <Typography variant="h6" color="#fff">
        {progress}%
      </Typography>
    </Box>
  );
};

export default CircularLoader;
