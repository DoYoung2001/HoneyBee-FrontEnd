import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CreatePost.module.css';

const categories = ['불안', '우울', '가족관계', '연애', '사회생활', '직장', '학업', '자존감', '중독', '트라우마'];

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('게시글 등록:', { title, content, category });
    navigate('/questionboard');
  };

  const handleCancel = () => {
    navigate('/questionboard');
  };

  return (
    <div className={styles.createPostContainer}>
      <h1 className={styles.title}>게시글 작성</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formHeader}>
          <div className={styles.formGroup}>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className={styles.input}
              placeholder="제목을 입력하세요"
            />
          </div>
          <div className={styles.formGroup}>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className={styles.select}
            >
              <option value="">카테고리 선택</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.formGroup}>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className={styles.textarea}
            placeholder="내용을 입력하세요"
          />
        </div>
        <div className={styles.buttonContainer}>
          <button type="button" onClick={handleCancel} className={styles.cancelButton}>
            취소
          </button>
          <button type="submit" className={styles.submitButton}>
            게시글 등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;