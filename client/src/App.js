import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import React, {useEffect} from "react";

const App = () => {

  // useEffect(() => {
  //   if(!localStorage.getItem('token')) {
  //     navigate('/')
  //   }
  // },[navigate])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
