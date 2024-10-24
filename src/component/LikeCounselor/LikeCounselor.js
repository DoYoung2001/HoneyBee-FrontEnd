import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LikeCounselor.module.css";

const LikeCounselor = () => {
  const navigate = useNavigate();
  const [counselors, setCounselors] = useState([
    {
      id: 1,
      name: "김상담",
      address: "서울시 강남구",
      rating: 4.5,
      reviews: 25,
      categories: ["불안", "우울", "가족관계"],
      image: "https://cdn-icons-png.flaticon.com/128/4439/4439988.png",
      isChecked: false,
    },
    {
      id: 2,
      name: "이상담",
      address: "서울시 서초구",
      rating: 4.8,
      reviews: 32,
      categories: ["직장스트레스", "인간관계"],
      image: "https://cdn-icons-png.flaticon.com/128/4439/4439988.png",
      isChecked: false,
    },
    // 추가 더미 데이터...
  ]);

  const [isAllChecked, setIsAllChecked] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // 전체 선택 처리
  const handleAllCheck = (checked) => {
    setIsAllChecked(checked);
    setCounselors(
      counselors.map((counselor) => ({
        ...counselor,
        isChecked: checked,
      }))
    );
  };

  // 개별 체크박스 처리
  const handleCheck = (id) => {
    setCounselors(
      counselors.map((counselor) =>
        counselor.id === id
          ? { ...counselor, isChecked: !counselor.isChecked }
          : counselor
      )
    );
  };

  // 선택된 항목 있는지 확인
  const hasCheckedItems = counselors.some((counselor) => counselor.isChecked);

  // 선택 항목 삭제
  const handleDelete = () => {
    // 실제 구현시에는 백엔드 API 호출
    setCounselors(counselors.filter((counselor) => !counselor.isChecked));
    setShowDeleteModal(false);
    setIsAllChecked(false);
  };

  // 상담사 상세 페이지로 이동
  const handleCounselorClick = (id) => {
    navigate(`/counselorlist/counselordetail/${id}`);
  };

  // 전체 선택 상태 업데이트
  useEffect(() => {
    setIsAllChecked(counselors.every((counselor) => counselor.isChecked));
  }, [counselors]);

  return (
    <div className={styles.likeCounselorContainer}>
      <h2>즐겨찾는 상담사</h2>

      <div className={styles.controlPanel}>
        <div className={styles.checkAllContainer}>
          <input
            type="checkbox"
            checked={isAllChecked}
            onChange={(e) => handleAllCheck(e.target.checked)}
            id="checkAll"
          />
          <label htmlFor="checkAll">전체 선택</label>
        </div>
        <button
          className={styles.deleteButton}
          onClick={() => setShowDeleteModal(true)}
          disabled={!hasCheckedItems}
        >
          선택 삭제
        </button>
      </div>

      <div className={styles.counselorList}>
        {counselors.map((counselor) => (
          <div key={counselor.id} className={styles.counselorCard}>
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                checked={counselor.isChecked}
                onChange={() => handleCheck(counselor.id)}
              />
            </div>
            <div
              className={styles.counselorInfo}
              onClick={() => handleCounselorClick(counselor.id)}
            >
              <img src={counselor.image} alt={counselor.name} />
              <div className={styles.counselorDetails}>
                <h3>{counselor.name}</h3>
                <p>{counselor.address}</p>
                <div className={styles.rating}>
                  <span className={styles.stars}>
                    {"★".repeat(Math.floor(counselor.rating))}
                  </span>
                  <span className={styles.ratingNumber}>
                    {counselor.rating.toFixed(1)}
                  </span>
                  <span className={styles.reviewCount}>
                    (후기 {counselor.reviews}개)
                  </span>
                </div>
                <div className={styles.categories}>
                  {counselor.categories.map((category, index) => (
                    <span key={index} className={styles.category}>
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>선택한 상담사를 삭제하시겠습니까?</p>
            <div className={styles.modalButtons}>
              <button onClick={handleDelete}>삭제</button>
              <button onClick={() => setShowDeleteModal(false)}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LikeCounselor;