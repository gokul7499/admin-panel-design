import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
} from "@mui/material";

const OtpPage = ({ setOtpAuth }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedOtp = localStorage.getItem("otp"); // ✅ get OTP from localStorage

    if (otp === storedOtp) {
      localStorage.removeItem("otp"); // ✅ optional: clear OTP after success
      setOtpAuth(true);               // ✅ update auth
      navigate("/dashboard");         // ✅ go to dashboard
    } else {
      setError("Invalid OTP. Try again.");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        background: "linear-gradient(to right, #1e1e2f, #343a40)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: 3,
          textAlign: "center",
          background: "#000000",
        }}
      >
        <Typography variant="h5" sx={{ color: "white" }} gutterBottom>
          Enter OTP
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: "white" }}>
          We have sent a 6-digit OTP to your email or mobile
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Enter OTP"
            variant="outlined"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            error={!!error}
            helperText={error}
            inputProps={{ maxLength: 6 }}
            sx={{ mb: 2, input: { color: "#fff" } }}
            InputLabelProps={{ style: { color: "#ccc" } }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ bgcolor: "#1976d2", ":hover": { bgcolor: "#1565c0" } }}
          >
            Verify OTP
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default OtpPage;
