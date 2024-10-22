import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css"; // CSS Modules import

function NavBar() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/SignUp"); // Assuming you'll create a register page
  };

  // 임시로 로그인 상태를 확인하는 함수입니다.
  // 실제 구현에서는 상태 관리 라이브러리나 컨텍스트를 사용하여 로그인 상태를 관리해야 합니다.
  const isLoggedIn = () => {
    return localStorage.getItem('isLoggedIn') === 'true';
  };

  const handleLogout = () => {
    // Add logout logic here (e.g., clear token from localStorage)
    localStorage.removeItem('isLoggedIn');
    navigate("/");
  };
  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.navbarLogo}>
        <a href="/">허니핑</a>
      </div>
      <ul className={styles.navbarMenu}>
        <li className={styles.navbarItem}>
          <a href="/">Home</a>
        </li>
        <li className={styles.navbarItem}>
          <a href="/about">About</a>
        </li>
        <li className={styles.navbarItem}>
          <a href="/services">Services</a>
        </li>
        <li className={styles.navbarItem}>
          <a href="/contact">Contact</a>
        </li>
      </ul>
      <div className={styles.buttonContainer}>
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
