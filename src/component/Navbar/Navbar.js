import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css"; // CSS Modules import

function NavBar() {
  const navigate = useNavigate();
  const [showConsultDropdown, setShowConsultDropdown] = useState(false);
  const [showHospitalDropdown, setShowHospitalDropdown] = useState(false);
  const [showBoardDropdown, setShowBoardDropdown] = useState(false);

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/SignUp");
  };

  const isLoggedIn = () => {
    return localStorage.getItem("isLoggedIn") === "true";
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  // 상담 메뉴 hover 상태 관리
  const handleConsultMouseEnter = () => {
    setShowConsultDropdown(true);
    setShowHospitalDropdown(false);
    setShowBoardDropdown(false);
  };

  const handleConsultMouseLeave = () => {
    setShowConsultDropdown(false);
  };

  // 병원 메뉴 hover 상태 관리
  const handleHospitalMouseEnter = () => {
    setShowHospitalDropdown(true);
    setShowConsultDropdown(false);
    setShowBoardDropdown(false);
  };

  const handleHospitalMouseLeave = () => {
    setShowHospitalDropdown(false);
  };

  // 게시판 메뉴 hover 상태 관리
  const handleBoardMouseEnter = () => {
    setShowBoardDropdown(true);
    setShowConsultDropdown(false);
    setShowHospitalDropdown(false);
  };

  const handleQuestionBoardClick = () => {
    navigate("/questionboard");
  };

  const handleBoardMouseLeave = () => {
    setShowBoardDropdown(false);
  };

  // 상담 카테고리 클릭 핸들러
  const handleConsultCategoryClick = () => {
    navigate("/consult-category"); // 상담 카테고리 페이지로 이동
  };

  // 상담사 목록 클릭 핸들러
  const handleConsultListClick = () => {
    navigate("/consult-list"); // 상담사 목록 페이지로 이동
  };

  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.navbarLogo}>
        <a href="/">허니핑</a>
      </div>
      <ul className={styles.navbarMenu}>
        <li
          className={styles.navbarItem}
          onMouseEnter={handleConsultMouseEnter}
        >
          <a href="#">상담</a>
          {showConsultDropdown && (
            <div
              className={styles.dropdownMenu}
              onMouseLeave={handleConsultMouseLeave}
            >
              <ul>
                <li
                  className={`${styles.dropdownItem} ${styles.categoryItem}`}
                  onClick={handleConsultCategoryClick}
                >
                  상담 카테고리
                </li>
                <li
                  className={`${styles.dropdownItem} ${styles.consultListItem}`}
                  onClick={handleConsultListClick}
                >
                  상담사 목록
                </li>
              </ul>
            </div>
          )}
        </li>
        <li
          className={styles.navbarItem}
          onMouseEnter={handleHospitalMouseEnter}
        >
          <a href="#">병원</a>
          {showHospitalDropdown && (
            <div
              className={styles.dropdownMenu}
              onMouseLeave={handleHospitalMouseLeave}
            >
              <ul>
                <li className={`${styles.dropdownItem} ${styles.hospitalItem}`}>
                  병원 목록
                </li>{" "}
              </ul>
            </div>
          )}
        </li>
        <li className={styles.navbarItem} onMouseEnter={handleBoardMouseEnter}
          onClick={handleQuestionBoardClick}
        >
          <a href="#">게시판</a>
          {showBoardDropdown && (
            <div
              className={styles.dropdownMenu}
              onMouseLeave={handleBoardMouseLeave}
            >
              <ul>
                <li className={`${styles.dropdownItem} ${styles.boardItem}`}>
                  질문 게시판
                </li>{" "}
              </ul>
            </div>
          )}
        </li>
      </ul>
      <div className={styles.buttonContainer}>
        {/* {isLoggedIn() ? (
          <button
            className={styles.mypageButton}
            onClick={() => navigate("/mypage")}
          >
            마이페이지
          </button>
        ) : (
          // 버튼 자체를 숨기고 공간을 유지하려면 visibility: hidden 사용
          <button
            className={styles.mypageButton}
            style={{ visibility: "hidden" }}
          >
            마이페이지
          </button>
        )} */}
        <button
          className={styles.mypageButton}
          onClick={() => navigate("/mypage")}
        >
          마이페이지
        </button>
        {isLoggedIn() ? (
          <button className={styles.signButton} onClick={handleLogout}>
            Sign Out
          </button>
        ) : (
          <>
            <button className={styles.signButton} onClick={handleSignIn}>
              Sign In
            </button>
            <button className={styles.register} onClick={handleRegister}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
