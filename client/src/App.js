import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import Home from "./pages/Home/Home";
import React from "react";
import Protected from "./components/Protected/Protected";
import NonProtected from "./components/NonProtected/NonProtected";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<NonProtected />}>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Route>
        <Route element={<Protected />}>
          <Route path="/home" element={<Home />} />
          <Route path="/:username" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
