import React from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const ErrorMessage = (props) => {
  const messages = props.messages;
  return (
    <Box
      sx={{
        margin: "1.5rem 0",
        fontWeight: "500",
      }}
    >
      {messages.map((item, idx) => (
        <Typography align="center" key={idx} color="error">
          {item.toUpperCase()}
        </Typography>
      ))}
    </Box>
  );
};
export default ErrorMessage;
