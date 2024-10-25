import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CounselorReviews.module.css";

const CounselorReviews = () => {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("rating");
  const [expandedReviews, setExpandedReviews] = useState({});

  const counselor = {
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
    { id: 1, title: "매우 만족스러운 상담", content: "상담사님의 조언이 매우 도움이 되었습니다. 긴 내용입니다. 더 길게 작성합니다.", author: "행복해진사람", rating: 5, date: "2023-05-20" },
    { id: 2, title: "좋은 경험이었습니다", content: "처음에는 걱정했지만 상담 후 마음이 편해졌어요. 긴 내용입니다. 더 길게 작성합니다.", author: "마음편한이", rating: 4, date: "2023-05-18" },
    // ... 더 많은 리뷰 추가
  ];

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    return new Date(b.date) - new Date(a.date);
  });

  const toggleReviewContent = (reviewId) => {
    setExpandedReviews(prev => ({ ...prev, [reviewId]: !prev[reviewId] }));
  };

  const handleGoBack = () => {
    navigate("/counselordetail");
  };

  return (
    <div className={styles.counselorReviews}>
      <div className={styles.counselorHeader}>
        <img src={counselor.image} alt={counselor.name} className={styles.counselorImage} />
        <div className={styles.counselorInfo}>
          <h1>{counselor.name}</h1>
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
        {sortedReviews.map(review => (
          <div key={review.id} className={styles.reviewItem}>
            <h3 className={styles.reviewTitle}>{review.title}</h3>
            <div className={styles.reviewMeta}>
              <span>{review.author}</span>
              <span className={styles.reviewRating}>
                {"★".repeat(review.rating)}
                <span className={styles.ratingNumber}>({review.rating.toFixed(1)})</span>
              </span>
              <span>{review.date}</span>
            </div>
            <p className={expandedReviews[review.id] ? styles.expanded : styles.collapsed}>
              {review.content}
            </p>
            <button onClick={() => toggleReviewContent(review.id)} className={styles.toggleButton}>
              {expandedReviews[review.id] ? "접기" : "자세히 보기"}
            </button>
          </div>
        ))}
      </div>

      <button onClick={handleGoBack} className={styles.backButton}>뒤로가기</button>
    </div>
  );
};

export default CounselorReviews;