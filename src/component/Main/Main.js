import React from "react";
import styles from "./Main.module.css";

function Main() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainContent}>
        <h1>BuzzyBee</h1>
        <h2>상담해요핑</h2>
      </div>
      <div className={styles.pagesContainer}>
        <div className={styles.pageTitle}>자주찾는 페이지</div>
        <div className={styles.pagesBox}>
          <div className={styles.pageItem}>병원</div>
          <div className={styles.pageItem}>상담사</div>
          <div className={styles.pageItem}>심리테스트</div>
        </div>
      </div>
      <div className={styles.scheduleContainer}>
        <div className={styles.scheduleBox}>
          <div className={styles.scheduleTitle}>
            <span>2024/09/13</span>
            <span>예약일정</span>
            <div className={styles.iconContainer}>
              <div className={styles.icon}>
                <span>2</span>
              </div>
            </div>
          </div>
          <div className={styles.scheduleLine}></div>
          <div className={styles.scheduleDetails}>
            <span>01:00 ~ 02:00</span>
            <span>피부과 상담</span>
            <div className={styles.counselor}>상담사: 000님</div>
            <div className={styles.counselorPh}>000-0000-0000</div>
          </div>
          <div className={styles.scheduleDetails}>
            <span>04:00 ~ 05:00</span>
            <span>정신과 상담</span>
            <div className={styles.counselor}>상담사: 000님</div>
            <div className={styles.counselorPh}>000-0000-0000</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
