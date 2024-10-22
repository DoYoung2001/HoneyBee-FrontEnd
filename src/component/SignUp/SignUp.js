// SignUpType.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignUp.module.css';

const SignUp = () => {
  const navigate = useNavigate();

  const handleTypeSelection = (type) => {
    navigate(`/signup/${type}`);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>SIGN UP</h1>
        <div className={styles.signUpBox}>
          <div className={styles.buttonGroup}>
            <button 
              className={styles.typeButton} 
              onClick={() => handleTypeSelection('member')}
            >
              회원용
            </button>
            <button 
              className={`${styles.typeButton} ${styles.counselorButton}`} 
              onClick={() => handleTypeSelection('counselor')}
            >
              상담사용
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;