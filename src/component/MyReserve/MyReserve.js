import React, { useState, useEffect, useCallback } from 'react'; // useCallback import 추가
import styles from './MyReserve.module.css';

const MyReserve = () => {
  const [activeTab, setActiveTab] = useState('offline');
  const [reservations, setReservations] = useState({
    current: [],
    waiting: [],
    completed: [],
    canceled: []
  });
  
  // expandedSections 상태를 온라인/오프라인으로 구분
  const [expandedSections, setExpandedSections] = useState({
    offline: {
      current: true,
      waiting: true,
      completed: true,
      canceled: true
    },
    online: {
      current: true,
      waiting: true,
      completed: true,
      canceled: true
    }
  });
  const fetchReservations = useCallback(async () => {
    try {
      const tempData = {
        offline: {
          current: [
            {
              id: 1,
              counselor: "이지영 상담사",
              rating: 4.5,
              reviews: 17,
              tags: ["가족"],
              date: "2024-03-25",
              time: "14:00",
              location: "서울시 강남구",
              type: "offline"
            }
          ],
          completed: [
            {
              id: 2,
              counselor: "이상화 상담사",
              rating: 4.8,
              reviews: 24,
              tags: ["우울"],
              date: "2024-03-20",
              time: "11:00",
              location: "서울시 서초구",
              type: "offline"
            }
          ],
          canceled: [
            {
              id: 3,
              counselor: "땡떙이 상담사",
              rating: 4.6,
              reviews: 20,
              tags: ["학업"],
              date: "2024-03-15",
              time: "15:00",
              location: "서울시 강남구",
              type: "offline"
            }
          ]
        },
        online: {
          current: [
            {
              id: 4,
              counselor: "아무개 상담사",
              rating: 4.7,
              reviews: 15,
              tags: ["취업"],
              date: "2024-03-26",
              time: "16:00",
              type: "online"
            }
          ],
          completed: [],
          canceled: []
        }
      };
      
      setReservations(tempData[activeTab]);
    } catch (error) {
      console.error('예약 데이터 로딩 실패:', error);
    }
  }, [activeTab]);

  // 나머지 이벤트 핸들러들도 useCallback으로 감싸줄 수 있습니다
  const handleModifyReservation = useCallback(async (reservationId) => {
    try {
      alert('예약 수정 페이지로 이동합니다.');
    } catch (error) {
      console.error('예약 수정 실패:', error);
    }
  }, []);

  const handleWriteReview = useCallback(async (reservationId) => {
    try {
      alert('리뷰 작성 페이지로 이동합니다.');
    } catch (error) {
      console.error('리뷰 작성 실패:', error);
    }
  }, []);

  // 토글 함수 수정
  const toggleSection = useCallback((section) => {
    setExpandedSections(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [section]: !prev[activeTab][section]
      }
    }));
  }, [activeTab]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

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
        {/* 진행 예정 섹션 */}
        <div 
          className={styles.sectionHeader} 
          onClick={() => toggleSection('current')}
        >
          <h2>진행 예정</h2>
          <span className={styles.toggle}>
          {expandedSections[activeTab].current ? '▼' : '▶'}
          </span>
        </div>
        {expandedSections[activeTab].current && reservations.current?.map(item => (
          <div key={item.id} className={styles.reservationCard}>
            <div className={styles.profileSection}>
              <img src="/placeholder-avatar.jpg" alt="Profile" className={styles.avatar} />
              <div className={styles.counselorInfo}>
                <div className={styles.counselorName}>{item.counselor}</div>
                <div className={styles.reservationDetail}>
                  {item.date} {item.time} {item.type === 'offline' && `| ${item.location}`}
                </div>
                <div className={styles.rating}>
                  <span className={styles.star}>★</span> {item.rating} ({item.reviews}개의 상담)
                </div>
                <div className={styles.tags}>
                  {item.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            <button 
              className={styles.actionButton}
              onClick={() => handleModifyReservation(item.id)}
            >
              수정
            </button>
          </div>
        ))}

        {/* 완료됨 섹션 */}
        <div 
          className={styles.sectionHeader}
          onClick={() => toggleSection('completed')}
        >
          <h2>완료됨</h2>
          <span className={styles.toggle}>
          {expandedSections[activeTab].completed ? '▼' : '▶'}
          </span>
        </div>
        {expandedSections[activeTab].completed && reservations.completed?.map(item => (
          <div key={item.id} className={styles.reservationCard}>
            <div className={styles.profileSection}>
              <img src="/placeholder-avatar.jpg" alt="Profile" className={styles.avatar} />
              <div className={styles.counselorInfo}>
                <div className={styles.counselorName}>{item.counselor}</div>
                <div className={styles.reservationDetail}>
                  {item.date} {item.time} {item.type === 'offline' && `| ${item.location}`}
                </div>
                <div className={styles.rating}>
                  <span className={styles.star}>★</span> {item.rating} ({item.reviews}개의 상담)
                </div>
                <div className={styles.tags}>
                  {item.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            <button 
              className={styles.reviewButton}
              onClick={() => handleWriteReview(item.id)}
            >
              리뷰쓰기
            </button>
          </div>
        ))}

        {/* 취소됨 섹션 */}
        <div 
          className={styles.sectionHeader}
          onClick={() => toggleSection('canceled')}
        >
          <h2>취소됨</h2>
          <span className={styles.toggle}>
            {expandedSections[activeTab].canceled ? '▼' : '▶'}
          </span>
        </div>
        {expandedSections[activeTab].canceled && reservations.canceled?.map(item => (
          <div key={item.id} className={styles.reservationCard}>
            <div className={styles.profileSection}>
              <img src="/placeholder-avatar.jpg" alt="Profile" className={styles.avatar} />
              <div className={styles.counselorInfo}>
                <div className={styles.counselorName}>{item.counselor}</div>
                <div className={styles.reservationDetail}>
                  {item.date} {item.time} {item.type === 'offline' && `| ${item.location}`}
                </div>
                <div className={styles.rating}>
                  <span className={styles.star}>★</span> {item.rating} ({item.reviews}개의 상담)
                </div>
                <div className={styles.tags}>
                  {item.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReserve;