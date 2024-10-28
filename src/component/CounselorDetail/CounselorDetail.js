import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styles from "./CounselorDetail.module.css";

const CounselorDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const counselor = location.state?.counselor || {
    id: 1,
    name: "김상담",
    address: "서울시 강남구",
    rating: 4.5,
    reviews: 25,
    phone: "010-1234-5678",
    email: "kim.counselor@example.com",
    certifications: ["심리상담사 1급", "가족상담사", "청소년상담사 2급"],
    education: [
      "서울대학교 심리학과 학사",
      "연세대학교 상담심리 석사"
    ],
    experience: [
      "서울심리상담센터 수석상담사 (현재)",
      "청소년상담복지센터 전문상담사 (5년)",
      "대학교 학생상담센터 인턴 (2년)"
    ],
    categories: ["불안", "우울", "가족관계", "청소년 문제", "자존감 향상"],
    availableTime: "평일 10시-18시, 토요일 10시-15시",
    languages: ["한국어", "영어"],
    introduction:
      "안녕하세요. 10년 경력의 전문상담사 김상담입니다. 여러분의 고민을 함께 나누고 해결해나가고 싶습니다. 각 내담자의 unique한 경험과 감정을 존중하며, 따뜻하고 안전한 상담 환경을 제공하기 위해 노력하고 있습니다. 불안, 우울, 관계 문제 등 다양한 심리적 어려움에 대해 체계적이고 전문적인 상담을 제공해 드리겠습니다.",
    approach: "인지행동치료(CBT), 해결중심단기치료(SFBT), 마음챙김 기반 접근",
    image: "https://cdn-icons-png.flaticon.com/128/4439/4439988.png",
  };

  const handleReservation = () => {
    navigate("/consult-reservation");
  };

  const handleGoBack = () => {
    navigate("/counselorlist");
  };

  const handleReviewClick = () => {
    navigate(`/counselorlist/counselordetail/${id}/reviews`, { state: { counselor } });
  };

  if (!counselor) {
    return <div>상담사 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <div className={styles.counselorDetail}>
    <div className={styles.counselorHeader}>
      <img src={counselor.image} alt={counselor.name} className={styles.counselorImage} />
      <div className={styles.counselorBasicInfo}>
        <div className={styles.nameAndReview}>
          <h1>{counselor.name}</h1>
          <button onClick={handleReviewClick} className={styles.reviewButton}>
            후기 보기
          </button>
        </div>
        <p className={styles.address}>{counselor.address}</p>
        <div className={styles.rating}>
          <span className={styles.stars}>{"★".repeat(Math.floor(counselor.rating))}</span>
          <span className={styles.ratingNumber}>{counselor.rating.toFixed(1)}</span>
          <span className={styles.reviewCount}>(후기 {counselor.reviews}개)</span>
        </div>
      </div>
    </div>

    <div className={styles.counselorDetails}>
      <div className={styles.detailItem}>
        <h4>연락처 정보</h4>
        <p>전화: {counselor.phone}</p>
        <p>이메일: {counselor.email}</p>
      </div>
      <hr className={styles.separator} />
      <div className={styles.detailItem}>
        <h4>자격 및 경력</h4>
        <h5>자격증</h5>
        <ul>
            {counselor.certifications?.map((cert, index) => (
              <li key={`cert-${index}`}>{cert}</li>
            ))}
          </ul>
        <h5>학력</h5>
        <ul>
            {counselor.education?.map((edu, index) => (
              <li key={`edu-${index}`}>{edu}</li>
            ))}
          </ul>
        <h5>경력</h5>
        <ul>
            {counselor.experience?.map((exp, index) => (
              <li key={`exp-${index}`}>{exp}</li>
            ))}
          </ul>
      </div>
      <hr className={styles.separator} />
      <div className={styles.detailItem}>
        <h4>상담 분야</h4>
        <p>{counselor.categories?.join(", ") || "정보 없음"}</p>
      </div>
      <hr className={styles.separator} />
      <div className={styles.detailItem}>
        <h4>상담 가능 시간</h4>
        <p>{counselor.availableTime}</p>
      </div>
      <hr className={styles.separator} />
      <div className={styles.detailItem}>
        <h4>사용 가능 언어</h4>
        <p>{counselor.languages?.join(", ") || "정보 없음"}</p>
      </div>
      <hr className={styles.separator} />
      <div className={styles.detailItem}>
        <h4>상담 접근법</h4>
        <p>{counselor.approach}</p>
      </div>
      <hr className={styles.separator} />
      <div className={styles.detailItem}>
        <h4>소개</h4>
        <p>{counselor.introduction}</p>
      </div>
    </div>

      {/* 버튼 컨테이너 */}
      <div className={styles.buttonContainer}>
        <button onClick={handleGoBack} className={styles.backButton}>뒤로가기</button>
        <button onClick={handleReservation} className={styles.reservationButton}>예약하기</button>
      </div>

    </div>
  );
};

export default CounselorDetail;