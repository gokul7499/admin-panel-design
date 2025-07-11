import React, { useState } from "react";
import emailjs from "emailjs-com";
import { Box, TextField, Button, Typography } from "@mui/material";

const EmailOtpSender = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  };

  const sendOtp = () => {
    const generatedOtp = generateOtp();
    setOtp(generatedOtp);

    const templateParams = {
      to_email: email,
      otp: generatedOtp,
    };

    emailjs
      .send(
        "service_vj6lmr9",      // 🔁 Replace with your actual service ID
        "template_5tftmqd",     // 🔁 Replace with your template ID
        templateParams,
        "iswTxNtPdNBzKUk-V"       // 🔁 Replace with your public key
      )
      .then(
        (response) => {
          console.log("✅ OTP Sent!", response.status, response.text);
          setMessage("OTP sent successfully to your email.");
        },
        (err) => {
          console.error("❌ Failed to send OTP", err);
          setMessage("Failed to send OTP.");
        }
      );
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5 }}>
      <Typography variant="h5" gutterBottom>Email OTP Login</Typography>
      <TextField
        fullWidth
        label="Enter Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" fullWidth onClick={sendOtp}>
        Send OTP
      </Button>
      {message && (
        <Typography sx={{ mt: 2 }} color="primary">
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default EmailOtpSender;
