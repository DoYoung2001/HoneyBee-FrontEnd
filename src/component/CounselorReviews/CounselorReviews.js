import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styles from "./CounselorReviews.module.css";

const ReviewItem = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.reviewItem}>
      <h3 className={styles.reviewTitle}>{review.title}</h3>
      <div className={styles.reviewMeta}>
        <span>{review.author}</span>
        <span className={styles.reviewRating}>
          {"★".repeat(review.rating)}
          <span className={styles.ratingNumber}>({review.rating.toFixed(1)})</span>
        </span>
        <span>{review.date}</span>
      </div>
      <p className={styles.reviewContent}>
        {isExpanded ? review.content : `${review.content.slice(0, 40)}${review.content.length > 40 ? '...' : ''}`}
      </p>
      {review.content.length > 40 && (
        <button onClick={() => setIsExpanded(!isExpanded)} className={styles.toggleButton}>
          {isExpanded ? "접기" : "자세히 보기"}
        </button>
      )}
    </div>
  );
};

const CounselorReviews = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [sortBy, setSortBy] = useState("rating");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 10;

  const counselor = location.state?.counselor ||  {
    id: 1,
    name: "김상담",
    rating: 4.5,
    reviews: 25,
    image: "https://cdn-icons-png.flaticon.com/128/4439/4439988.png",
  };

  const reviewStats = {
    5: 15,
    4: 5,
    3: 3,
    2: 1,
    1: 1,
  };

  const reviews = [
    { id: 1, title: "매우 만족스러운 상담", content: "상담사님의 조언이 매우 도움이 되었습니다. 긴 내용입니다. 더 길게 작성한 후기를 보려면 여기를 클릭했징??", author: "행복해진사람", rating: 4.3, date: "2023-05-20" },
    { id: 2, title: "좋은 경험이었습니다", content: "처음에는 걱정했지만 상담 후 마음이 편해졌어요. 긴 내용입니다.", author: "마음편한이", rating: 4.5, date: "2023-05-18" },
    // ... 더 많은 리뷰 추가 (최소 20개 이상)
  ];

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    return new Date(b.date) - new Date(a.date);
  });

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = sortedReviews.slice(indexOfFirstReview, indexOfLastReview);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleGoBack = () => {
    navigate(`/counselorlist/counselordetail/${id}`, { state: { counselor } });
  };

  return (
    <div className={styles.counselorReviews}>
      <button onClick={handleGoBack} className={styles.backButton}>프로필로 돌아가기</button>
      
      <div className={styles.counselorHeader}>
        <img src={counselor.image} alt={counselor.name} className={styles.counselorImage} />
        <div className={styles.counselorInfo}>
          <h1 className={styles.counselorName}>{counselor.name}</h1>
          <div className={styles.rating}>
            <span className={styles.stars}>{"★".repeat(Math.floor(counselor.rating))}</span>
            <span className={styles.ratingNumber}>{counselor.rating.toFixed(1)}</span>
            <span className={styles.reviewCount}>(후기 {counselor.reviews}개)</span>
          </div>
        </div>
      </div>

      <div className={styles.reviewStats}>
        {Object.entries(reviewStats).reverse().map(([rating, count]) => (
          <div key={rating} className={styles.statBar} title={`${rating}점: ${count}개`}>
            <span>{rating}점</span>
            <div className={styles.barContainer}>
              <div className={styles.bar} style={{width: `${(count / counselor.reviews) * 100}%`}}></div>
            </div>
            <span>{count}</span>
          </div>
        ))}
      </div>

      <div className={styles.sortControls}>
        <button onClick={() => setSortBy("rating")} className={sortBy === "rating" ? styles.active : ""}>평점순</button>
        <button onClick={() => setSortBy("latest")} className={sortBy === "latest" ? styles.active : ""}>최신순</button>
      </div>

      <div className={styles.reviewList}>
        {currentReviews.map(review => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>

      <div className={styles.pagination}>
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className={styles.pageArrow}>
          &lt;
        </button>
        {Array.from({ length: Math.ceil(reviews.length / reviewsPerPage) }, (_, i) => (
          <button 
            key={i} 
            onClick={() => paginate(i + 1)} 
            className={`${styles.pageButton} ${currentPage === i + 1 ? styles.activePage : ''}`}
          >
            {i + 1}
          </button>
        ))}
        <button 
          onClick={() => paginate(currentPage + 1)} 
          disabled={currentPage === Math.ceil(reviews.length / reviewsPerPage)} 
          className={styles.pageArrow}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default CounselorReviews;