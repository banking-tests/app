import "./App.css";
import React from "react";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Index } from "./pages/index";
import { Dashboard } from "./pages/dashboard";
import { Error } from "./pages/error";
import { theme } from "./theme";
import { Layout } from "./template/index";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
