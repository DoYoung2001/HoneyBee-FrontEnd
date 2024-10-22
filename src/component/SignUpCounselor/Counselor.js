import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Counselor.module.css';

const Counselor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: '',
    license: '',
    experience: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 회원가입 로직을 추가할 수 있습니다.
    console.log(formData);
    // 회원가입 후 로그인 페이지로 이동
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>SIGN UP</h1>
        <h2 className={styles.subtitle}>Counselor</h2>
        <form className={styles.signUpForm} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">이름</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="이름을 입력해주세요" required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">이메일</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="이메일 주소를 입력해주세요" required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="address">주소</label>
            <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} placeholder="주소를 입력해주세요" required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">비밀번호</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="비밀번호를 입력해 주세요" required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="비밀번호를 다시 입력해 주세요" required />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="license">자격증</label>
            <select id="license" name="license" value={formData.license} onChange={handleChange} required>
              <option value="">자격증을 선택해주세요</option>
              <option value="psychologist">심리상담사</option>
              <option value="socialWorker">사회복지사</option>
              <option value="counselor">전문상담사</option>
              <option value="other">기타</option>
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="experience">경력</label>
            <input type="number" id="experience" name="experience" value={formData.experience} onChange={handleChange} placeholder="경력 연수를 입력해주세요" required />
          </div>
          <button type="submit" className={styles.signUpButton}>가입하기</button>
        </form>
      </main>
    </div>
  );
};

export default Counselor;