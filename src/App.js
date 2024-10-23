import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./component/Navbar/Navbar";
import Main from "./component/Main/Main";
import Login from "./component/Login/Login";
import SignUp from "./component/SignUp/SignUp";
import Member from "./component/SignUpMember/Member";
import Counselor from "./component/SignUpCounselor/Counselor";
import "./App.css";
import CounselorList from "./component/CounselorList/CounselorList";
import CounselorDetail from "./component/CounselorDetail/CounselorDetail";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup/member" element={<Member />} /> 
          <Route path="/signup/counselor" element={<Counselor />} /> 
          <Route path="/counselorlist" element={<CounselorList />} />
          <Route path="/counselordetail" element={<CounselorDetail />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
