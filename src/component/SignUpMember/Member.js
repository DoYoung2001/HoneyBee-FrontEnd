// Member.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Member.module.css';

const Member = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 회원가입 로직을 추가할 수 있습니다.
    // 지금은 단순히 로그인 페이지로 이동합니다.
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>SIGN UP</h1>
        <form className={styles.signUpForm} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">name</label>
            <input type="text" id="name" placeholder="이름을 입력해주세요" required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">email</label>
            <input type="email" id="email" placeholder="이메일 주소를 입력해주세요" required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="address">address</label>
            <input type="text" id="address" placeholder="주소를 입력해주세요" required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">password</label>
            <input type="password" id="password" placeholder="비밀번호를 입력해 주세요" required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">confirmPassword</label>
            <input type="password" id="confirmPassword" placeholder="비밀번호를 다시 입력해 주세요" required />
          </div>
          <button type="submit" className={styles.signUpButton}>가입하기</button>
        </form>
      </main>
    </div>
  );
};

export default Member;