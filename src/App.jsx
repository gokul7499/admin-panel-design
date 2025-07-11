import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import LoginPage from "./Login/Login";
import OtpPage from "./Login/OtpPage";
import ProtectedRoute from "./components/ProtectedRoute";

import Topbar from "./scenes/global/topBar";
import MySidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoice";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calender/calendar";

function App() {
  const [theme, colorMode] = useMode();

  // ✅ Persist login/OTP state using localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [isOtpVerified, setIsOtpVerified] = useState(() => {
    return localStorage.getItem("isOtpVerified") === "true";
  });

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
      
          <Routes>
            {/* Login Page */}
            <Route
              path="/"
              element={
                !isLoggedIn ? (
                  <LoginPage
                    setAuth={(value) => {
                      setIsLoggedIn(value);
                      localStorage.setItem("isLoggedIn", value);
                    }}
                  />
                ) : (
                  <Navigate to="/otp" />
                )
              }
            />

            {/* OTP Page */}
            <Route
              path="/otp"
              element={
                isLoggedIn && !isOtpVerified ? (
                  <OtpPage
                    setOtpAuth={(value) => {
                      setIsOtpVerified(value);
                      localStorage.setItem("isOtpVerified", value);
                    }}
                  />
                ) : isOtpVerified ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            {/* Protected Routes after OTP Verification */}
            <Route
              path="/*"
              element={
                <ProtectedRoute isAuthenticated={isOtpVerified}>
                  <div
                    style={{
                      display: "flex",
                      height: "100vh",
                      width: "100vw",
                    }}
                  >
                    {/* Sidebar */}
                    <div
                      style={{
                        width: isSidebarCollapsed ? "80px" : "250px",
                        transition: "width 0.3s ease-in-out",
                        backgroundColor: "#1e1e2f",
                        overflow: "hidden",
                      }}
                    >
                      <MySidebar isSidebar={!isSidebarCollapsed} />
                    </div>

                    {/* Main Content */}
                    <div
                      style={{
                        flexGrow: 1,
                        overflowY: "auto",
                        transition: "margin 0.3s",
                      }}
                    >
                      <Topbar setIsSidebar={setIsSidebarCollapsed} />
                      <div style={{ padding: "20px" }}>
                        <Routes>
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/team" element={<Team />} />
                          <Route path="/contacts" element={<Contacts />} />
                          <Route path="/invoices" element={<Invoices />} />
                          <Route path="/form" element={<Form />} />
                          <Route path="/bar" element={<Bar />} />
                          <Route path="/pie" element={<Pie />} />
                          <Route path="/line" element={<Line />} />
                          <Route path="/faq" element={<FAQ />} />
                          <Route path="/calendar" element={<Calendar />} />
                          <Route path="/geography" element={<Geography />} />
                          <Route path="*" element={<Navigate to="/dashboard" />} />
                        </Routes>
                      </div>
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />
          </Routes>
        
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
