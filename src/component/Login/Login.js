import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !userType) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    // 여기에 실제 로그인 로직을 추가할 수 있습니다.
    // 지금은 단순히 userType에 따라 페이지를 이동합니다.
    if (userType === "customer") {
      navigate("/customer");
    } else if (userType === "consultant") {
      navigate("/consultant");
    }
  };
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>LOGIN</h1>
        <div className={styles.loginContainer}>
          <div className={styles.userTypeSelection}>
            <button
              type="button"
              className={`${styles.userTypeButton} ${
                userType === "customer" ? styles.selectedCustomer : ""
              }`}
              onClick={() => setUserType("customer")}
            >
              고객
            </button>
            <button
              type="button"
              className={`${styles.userTypeButton} ${
                userType === "consultant" ? styles.selectedConsultant : ""
              }`}
              onClick={() => setUserType("consultant")}
            >
              상담사
            </button>
          </div>
          <form
            className={`${styles.loginForm} ${
              userType === "consultant" ? styles.consultantForm : ""
            }`}
            onSubmit={handleSubmit}
          >
            <div className={styles.inputGroup}>
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일 주소를 입력해주세요"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력해 주세요"
              />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button
              type="submit"
              className={`${styles.signInButton} ${
                userType === "consultant" ? styles.consultantSignIn : ""
              }`}
            >
              Sign In
            </button>
            <a href="#forgot-password" className={styles.forgotPassword}>
              Forgot password?
            </a>
          </form>
        </div>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerLogo}>ꗃ</div>
        <div className={styles.footerColumns}>
          <div className={styles.footerColumn}>
            <h3>Use cases</h3>
            <ul>
              <li>UI design</li>
              <li>UX design</li>
              <li>Wireframing</li>
              <li>Diagramming</li>
              <li>Brainstorming</li>
              <li>Online whiteboard</li>
              <li>Team collaboration</li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h3>Explore</h3>
            <ul>
              <li>Design</li>
              <li>Prototyping</li>
              <li>Development features</li>
              <li>Design systems</li>
              <li>Collaboration features</li>
              <li>Design process</li>
              <li>FigJam</li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h3>Resources</h3>
            <ul>
              <li>Blog</li>
              <li>Best practices</li>
              <li>Colors</li>
              <li>Color wheel</li>
              <li>Support</li>
              <li>Developers</li>
              <li>Resource library</li>
            </ul>
          </div>
        </div>
        <div className={styles.socialLinks}>
          <a href="#twitter">Twitter</a>
          <a href="#youtube">YouTube</a>
          <a href="#instagram">Instagram</a>
          <a href="#facebook">Facebook</a>
        </div>
      </footer>
    </div>
  );
};

export default Login;
