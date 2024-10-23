import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CounselorDetail.module.css'; 

const CounselorDetail = () => {
    const navigate = useNavigate();

    const counselor = {
        id:1,
        name:'김상담',
        address:'서울시 강남구',
        rating :4.5,
        reviews :25,
        phone :'010-1234-5678',
        certifications:['심리상담사1급','가족상담사'],
        categories:['불안','우울','가족관계'],
        availableTime:'평일10시-18시',
        introduction:'안녕하세요. 10년 경력의 전문상담사 김상담입니다. 여러분의 고민을 함께 나누고 해결해나가고싶습니다.',
        image:'https://cdn-icons-png.flaticon.com/128/4439/4439988.png'
    };

    const handleReservation = () => {
        console.log('예약하기 클릭');
    };

    const handleGoBack = () => {
       navigate('/counselorlist');
    };

    return (
        <div className={styles.counselorDetail}>
            <div className={styles.counselorHeader}>
                <img src={counselor.image} alt={counselor.name} className={styles.counselorImage} />
                <div className={styles.counselorBasicInfo}>
                    <h1>{counselor.name}</h1>
                    <p className={styles.address}>{counselor.address}</p>
                    <div className={styles.rating}>
                        <span className={styles.stars}>{'★'.repeat(Math.floor(counselor.rating))}</span>
                        <span className={styles.ratingNumber}>{counselor.rating.toFixed(1)}</span>
                        <span className={styles.reviewCount}>(후기 {counselor.reviews}개)</span>
                    </div>
                </div>
            </div>
            <div className={styles.counselorDetails}>
                <div className={styles.detailItem}>
                    <h3>연락처</h3>
                    <p>{counselor.phone}</p>
                </div>
                <div className={styles.detailItem}>
                    <h3>자격증</h3>
                    <p>{counselor.certifications.join(', ')}</p>
                </div>
                <div className={styles.detailItem}>
                    <h3>상담 분야</h3>
                    <p>{counselor.categories.join(', ')}</p>
                </div>
                <div className={styles.detailItem}>
                    <h3>상담 가능 시간</h3>
                    <p>{counselor.availableTime}</p>
                </div>
                <div className={styles.detailItem}>
                    <h3>소개</h3>
                    <p>{counselor.introduction}</p>
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <button onClick={handleGoBack} className={styles.backButton}>뒤로가기</button>
                <button onClick={handleReservation} className={styles.reservationButton}>예약하기</button>
            </div>
        </div>
    );
};

export default CounselorDetail;
