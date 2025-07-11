import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import emailjs from "emailjs-com";

const LoginPage = ({ setAuth }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^[6-9]\d{9}$/;

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendOtp = (emailToSend, generatedOtp) => {
    const templateParams = {
      to_email: emailToSend,
      otp: generatedOtp,
    };

    emailjs
      .send(
        "service_vj6lmr9",
        "template_5tftmqd",
        templateParams,
        "iswTxNtPdNBzKUk-V"
      )
      .then(() => {
        localStorage.setItem("otp", generatedOtp);
        localStorage.setItem("email", emailToSend);
        setAuth(true); // ✅ tell App.js that user passed login
        navigate("/otp");
      })
      .catch((err) => {
        console.error("❌ OTP send failed", err);
        setErrors({ username: "Failed to send OTP" });
      });
  };

  const validate = () => {
    const newErrors = {};
    if (!username) {
      newErrors.username = "Email or Mobile is required";
    } else if (!emailRegex.test(username) && !mobileRegex.test(username)) {
      newErrors.username = "Invalid email or mobile";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "At least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // ✅ Remove hardcoded user check for dynamic use
    const generatedOtp = generateOtp();

    if (emailRegex.test(username)) {
      sendOtp(username, generatedOtp);
    } else {
      alert(`Your OTP is: ${generatedOtp}`);
      localStorage.setItem("otp", generatedOtp);
      localStorage.setItem("email", username);
      setAuth(true); // ✅ allow OTP page to load
      navigate("/otp");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        background: "linear-gradient(135deg, #1e1e2f, #343a40)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          maxWidth: 400,
          width: "100%",
          borderRadius: 4,
          backgroundColor: "#000000",
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ bgcolor: "#f1f1f1", mb: 2 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" gutterBottom color="white">
            Sign In
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email or Mobile"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!errors.username}
            helperText={errors.username}
            InputLabelProps={{ style: { color: "#ccc" } }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            InputLabelProps={{ style: { color: "#ccc" } }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, bgcolor: "#067325", ":hover": { bgcolor: "#343a40" } }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage;
