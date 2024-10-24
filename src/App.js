import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import NavBar from "./component/Navbar/Navbar";
import Main from "./component/Main/Main";
import Mypage from "./component/Mypage/Mypage";
import PersonalInfo from "./component/PersonalInfo/PersonalInfo";
import Login from "./component/Login/Login";
import SignUp from "./component/SignUp/SignUp";
import Member from "./component/SignUpMember/Member";
import Counselor from "./component/SignUpCounselor/Counselor";
import "./App.css";
import CounselorList from "./component/CounselorList/CounselorList";

import CounselorDetail from "./component/CounselorDetail/CounselorDetail";
import QuestionBoard from "./component/QuestionBoard/QuestionBoard";

import CreatePost from "./component/CreatePost/CreatePost";
import LikeCounselor from "./component/LikeCounselor/LikeCounselor";

// 스크롤 위치를 조정하는 컴포넌트
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지가 변경될 때 스크롤을 맨 위로 이동
  }, [pathname]);

  return null; // 이 컴포넌트는 아무것도 렌더링하지 않음
};

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/personalinfo" element={<PersonalInfo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup/member" element={<Member />} />
          <Route path="/signup/counselor" element={<Counselor />} />
          <Route path="/counselorlist" element={<CounselorList />} />
          <Route
            path="/counselorlist/counselordetail/:id"
            element={<CounselorDetail />}
          />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/questionboard" element={<QuestionBoard />} />
          <Route path="/likecounselor" element={<LikeCounselor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
