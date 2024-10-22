import React, { useState } from 'react';
import styles from './CounselorList.module.css';

const categories = ['불안', '우울', '가족관계', '연애', '사회생활', '직장', '학업', '자존감', '중독', '트라우마'];

const counselors = [
    { id: 1, name: '김상담', rating: 4.5, image: 'https://cdn-icons-png.flaticon.com/128/4439/4439988.png' },
    { id: 2, name: '이치료', rating: 4.8, image: 'https://cdn-icons-png.flaticon.com/128/4439/4439992.png' },
    { id: 3, name: '박상담', rating: 4.7, image: 'https://cdn-icons-png.flaticon.com/128/4439/4439992.png' },
    { id: 4, name: '최치료', rating: 4.6, image: 'https://cdn-icons-png.flaticon.com/128/4439/4439992.png' },
    { id: 5, name: '정상담', rating: 4.9, image: 'https://cdn-icons-png.flaticon.com/128/4439/4439988.png' },
    { id: 6, name: '홍치료', rating: 4.3, image: 'https://cdn-icons-png.flaticon.com/128/4439/4439988.png' },
    { id: 7, name: '이상담', rating: 4.2, image: 'https://cdn-icons-png.flaticon.com/128/4439/4439992.png' },
    { id: 8, name: '김치료', rating: 4.1, image: 'https://cdn-icons-png.flaticon.com/128/4439/4439992.png' },
    { id: 9, name: '신상담', rating: 4.0, image: 'https://cdn-icons-png.flaticon.com/128/4439/4439988.png' },
    { id: 10, name: '배치료', rating: 4.4, image: 'https://cdn-icons-png.flaticon.com/128/4439/4439992.png' },
  ];

const CounselorList = () => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [sortBy, setSortBy] = useState('rating');

  const handleCategoryChange = (direction) => {
    if (direction === 'left') {
      setSelectedCategoryIndex((prevIndex) => 
        prevIndex > 0 ? prevIndex - 1 : categories.length - 1
      );
    } else if (direction === 'right') {
      setSelectedCategoryIndex((prevIndex) => 
        prevIndex < categories.length - 1 ? prevIndex + 1 : 0
      );
    } else {
      setSelectedCategoryIndex(direction); 
    }
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.categoryNavContainer}>
        <button className={styles.navButton} onClick={() => handleCategoryChange('left')}>&lt;</button>
        <div className={styles.categoryNav}>
          {categories.map((category, index) => (
            <button
              key={category}
              className={`${styles.categoryButton} ${index === selectedCategoryIndex ? styles.active : ''}`}
              onClick={() => handleCategoryChange(index)}
            >
              {category}
            </button>
          ))}
        </div>
        <button className={styles.navButton} onClick={() => handleCategoryChange('right')}>&gt;</button>
      </div>

      <div className={styles.sortContainer}>
        <select className={styles.sortSelect} onChange={handleSortChange} value={sortBy}>
          <option value="rating">평점순</option>
          <option value="name">이름순</option>
        </select>
      </div>

      <div className={styles.counselorList}>
        {counselors.map((counselor) => (
          <div key={counselor.id} className={styles.counselorItem}>
            <img src={counselor.image} alt={counselor.name} className={styles.counselorImage} />
            <div className={styles.counselorInfo}>
              <h3>{counselor.name}</h3>
              <div className={styles.rating}>
                {`★`.repeat(Math.floor(counselor.rating))}
                {counselor.rating % 1 !== 0 && '☆'}
                <span>{counselor.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CounselorList;