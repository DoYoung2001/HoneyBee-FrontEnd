import React, { useState } from 'react';
import styles from './MyReserve.module.css';

const MyReserve = () => {
  const [activeTab, setActiveTab] = useState('offline');

  const reservationData = {
    current: [
      {
        id: 1,
        counselor: "이지영 변호사",
        rating: 4.5,
        reviews: 17,
        tags: ["행정사건", "손해배상", "민사소송"]
      },
      {
        id: 2,
        counselor: "이지영 변호사",
        rating: 4.5,
        reviews: 17,
        tags: ["행정사건", "손해배상", "민사소송"]
      }
    ],
    waiting: [
      {
        id: 3,
        counselor: "이지영 변호사",
        rating: 4.5,
        reviews: 17,
        tags: ["행정사건", "손해배상", "민사소송"]
      },
      {
        id: 4,
        counselor: "이지영 변호사",
        rating: 4.2,
        reviews: 15,
        tags: ["행정사건", "손해배상", "민사소송"]
      }
    ],
    completed: [
      {
        id: 5,
        counselor: "이지영 변호사",
        rating: 4.5,
        reviews: 17,
        tags: ["행정사건", "손해배상", "민사소송"]
      },
      {
        id: 6,
        counselor: "이지영 변호사",
        rating: 4.2,
        reviews: 15,
        tags: ["행정사건", "손해배상", "민사소송"]
      }
    ]
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>나의 예약 내역</h1>
      
      <div className={styles.tabContainer}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'offline' ? styles.active : ''}`}
          onClick={() => setActiveTab('offline')}
        >
          오프라인 예약
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'online' ? styles.active : ''}`}
          onClick={() => setActiveTab('online')}
        >
          온라인 예약
        </button>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.sectionHeader}>
          <h2>진행 예정</h2>
          <span className={styles.toggle}>▼</span>
        </div>
        {reservationData.current.map(item => (
          <div key={item.id} className={styles.reservationCard}>
            <div className={styles.profileSection}>
              <img src="/placeholder-avatar.jpg" alt="Profile" className={styles.avatar} />
              <div className={styles.counselorInfo}>
                <div className={styles.counselorName}>{item.counselor}</div>
                <div className={styles.rating}>
                  ★ {item.rating} ({item.reviews}개의 상담 5점)
                </div>
                <div className={styles.tags}>
                  {item.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            <button className={styles.actionButton}>수정</button>
          </div>
        ))}

        <div className={styles.sectionHeader}>
          <h2>완료됨</h2>
          <span className={styles.toggle}>▼</span>
        </div>
        {reservationData.completed.map(item => (
          <div key={item.id} className={styles.reservationCard}>
            <div className={styles.profileSection}>
              <img src="/placeholder-avatar.jpg" alt="Profile" className={styles.avatar} />
              <div className={styles.counselorInfo}>
                <div className={styles.counselorName}>{item.counselor}</div>
                <div className={styles.rating}>
                  ★ {item.rating} ({item.reviews}개의 상담 5점)
                </div>
                <div className={styles.tags}>
                  {item.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            <button className={styles.reviewButton}>리뷰쓰기</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReserve;