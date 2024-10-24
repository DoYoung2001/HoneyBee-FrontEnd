import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PasswordChange.module.css";

const PasswordChange = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 비밀번호 변경 로직을 추가할 수 있습니다.
    console.log(formData);
    // 비밀번호 변경 후 로그인 페이지로 이동
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>비밀번호 변경</h1>
        <form className={styles.signUpForm} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">이름</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="아이디를 입력해주세요"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="currentPassword">휴대폰 번호</label>
            <input
              type="text"
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="휴대폰 번호를 입력해주세요"
              required
            />
            <p className={styles.warningText}>유저 정보가 일치하지 않습니다</p>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="newPassword">새 비밀번호</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="새 비밀번호를 입력해주세요"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="비밀번호 확인"
              required
            />
          </div>
          <button type="submit" className={styles.signUpButton}>
            비밀번호 변경
          </button>
        </form>
      </main>
    </div>
  );
};

export default PasswordChange;
