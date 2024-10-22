import React, { useState } from 'react';
import styles from './CounselorList.module.css';

const categories = ['불안', '우울', '가족관계', '연애', '사회생활', '직장', '학업', '자존감', '중독', '트라우마'];

const counselors = [
    { id: 1, name: '김상담', rating: 4.5, reviews: 25, address: '서울시 강남구' , image: 'https://cdn-icons-png.flaticon.com/128/4439/4439988.png' },
    { id: 2, name: '이치료', rating: 4.8, reviews: 30, address: '서울시 송파구' , image: 'https://cdn-icons-png.flaticon.com/128/4439/4439992.png' },
    { id: 3, name: '박상담', rating: 4.7, reviews: 15, address: '서울시 마포구' , image: 'https://cdn-icons-png.flaticon.com/128/4439/4439992.png' },
    { id: 4, name: '최치료', rating: 4.6, reviews: 20, address: '서울시 용산구' , image: 'https://cdn-icons-png.flaticon.com/128/4439/4439992.png' },
    { id: 5, name: '정상담', rating: 4.9, reviews: 40, address: '서울시 서초구' , image: 'https://cdn-icons-png.flaticon.com/128/4439/4439988.png' },
    { id: 6, name: '홍치료', rating: 4.3, reviews: 10, address: '서울시 관악구' , image: 'https://cdn-icons-png.flaticon.com/128/4439/4439988.png' },
    { id: 7, name: '이상담', rating: 4.2, reviews: 5, address: '서울시 중구' , image: 'https://cdn-icons-png.flaticon.com/128/4439/4439992.png' },
    { id: 8, name: '김치료', rating: 4.1, reviews: 12, address: '서울시 성동구' , image: 'https://cdn-icons-png.flaticon.com/128/4439/4439992.png' },
    { id: 9, name: '신상담', rating: 4.0, reviews: 8, address: '서울시 은평구' , image: 'https://cdn-icons-png.flaticon.com/128/4439/4439988.png' },
    { id: 10, name: '배치료', rating: 4.4, reviews: 18, address: '서울시 강서구' , image: 'https://cdn-icons-png.flaticon.com/128/4439/4439992.png' },
    { id: 11, name: '박전문', rating: 4.8, reviews: 33, address: '서울시 강서구' , image: 'https://cdn-icons-png.flaticon.com/128/4439/4439992.png' }
  ];

const CounselorList = () => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [sortBy, setSortBy] = useState('rating');
  const [currentPage, setCurrentPage] = useState(1);
  const counselorsPerPage = 10;

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

  // 정렬된 상담사 목록 가져오기
  const getSortedCounselors = () => {
    return [...counselors].sort((a, b) => {
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      } else {
        return a.name.localeCompare(b.name);
      }
    });
  };

  // 현재 페이지의 상담사 목록 가져오기
  const getCurrentCounselors = () => {
    const sortedCounselors = getSortedCounselors();
    const indexOfLastCounselor = currentPage * counselorsPerPage;
    const indexOfFirstCounselor = indexOfLastCounselor - counselorsPerPage;
    return sortedCounselors.slice(indexOfFirstCounselor, indexOfLastCounselor);
    };

  // 페이지 변경 핸들러
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= pageNumbers.length) {
      setCurrentPage(pageNumber);
    }
  };

  // 총 페이지 수 계산
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(counselors.length / counselorsPerPage); i++) {
    pageNumbers.push(i);
  }

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
        {getCurrentCounselors().map((counselor) => (
          <div key={counselor.id} className={styles.counselorItem}>
            <img src={counselor.image} alt={counselor.name} className={styles.counselorImage} />
            <div className={styles.counselorInfo}>
              <div className={styles.nameAddressContainer}>
                <h3 className={styles.counselorName}>{counselor.name}</h3>
                <p className={styles.address}>{counselor.address}</p>
              </div>
              <div className={styles.ratingContainer}>
                <div className={styles.rating}>
                  {`★`.repeat(Math.floor(counselor.rating))}
                  {counselor.rating % 1 !== 0 && '☆'}
                </div>
                <span className={styles.ratingNumber}>{counselor.rating.toFixed(1)}</span>
                <span className={styles.reviewCount}>(후기 {counselor.reviews}개)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        <button 
          onClick={() => paginate(currentPage - 1)} 
          className={styles.pageArrow}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`${styles.pageButton} ${currentPage === number ? styles.activePage : ''}`}
          >
            {number}
          </button>
        ))}
        <button 
          onClick={() => paginate(currentPage + 1)} 
          className={styles.pageArrow}
          disabled={currentPage === pageNumbers.length}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default CounselorList;