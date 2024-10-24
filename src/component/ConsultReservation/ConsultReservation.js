import React, { useState } from "react";
import styles from "./ConsultReservation.module.css"; // CSS 모듈 가져오기

const ConsultReservation = () => {
  const [selectedDate, setSelectedDate] = useState(31);
  const [selectedTime, setSelectedTime] = useState(null);

  const timeSlots = ["6:00", "6:30", "7:00", "7:30", "8:00"];

  const generateCalendarData = () => {
    const days = [];
    const month = 9; // 10월
    const year = 2024;

    // 첫 날의 요일을 구하기
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate(); // 마지막 날

    // 빈 날짜 추가
    for (let i = 0; i < firstDay; i++) {
      days.push({ date: null, isNextMonth: true });
    }

    // 해당 월 날짜 추가
    for (let i = 1; i <= lastDate; i++) {
      days.push({
        date: i,
        isToday: i === new Date().getDate() && month === new Date().getMonth(),
        isNextMonth: false,
      });
    }

    // 다음 달 날짜 추가 (예: 한 주가 다 차지 않으면)
    const remainingDays = 42 - days.length; // 6주 * 7일
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: null,
        isNextMonth: true,
      });
    }

    return days;
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  return (
    <div className={styles["calendar-container"]}>
      <header className={styles["calendar-header"]}>
        <div className={styles["month-selector"]}>
          <button className={styles["month-arrow"]}>&lt;</button>
          <span>2024.10</span>
          <button className={styles["month-arrow"]}>&gt;</button>
        </div>
      </header>

      <div className={styles["calendar-grid"]}>
        <div className={styles["weekdays"]}>
          <div>일</div>
          <div>월</div>
          <div>화</div>
          <div>수</div>
          <div>목</div>
          <div>금</div>
          <div>토</div>
        </div>

        <div className={styles["dates"]}>
          {generateCalendarData().map((day, index) => (
            <div
              key={index}
              className={`${styles["date-cell"]} ${
                day.isToday ? styles["today"] : ""
              } 
          ${day.isNextMonth ? styles["next-month"] : ""} 
          ${selectedDate === day.date ? styles["selected"] : ""}`}
              onClick={() => day.date && handleDateClick(day.date)} // 날짜가 null이 아닐 때만 클릭 이벤트
            >
              {day.date !== null ? day.date : ""}
            </div>
          ))}
        </div>
      </div>

      <div className={styles["reservation-text"]}>시간을 선택해 주세요</div>
      <div className={styles["time-slots"]}>
        <div className={styles["time-label"]}>오후</div>
        <div className={styles["time-grid"]}>
          {timeSlots.map((time, index) => (
            <button
              key={index}
              className={`${styles["time-slot"]} ${
                selectedTime === time ? styles["selected"] : ""
              }`}
              onClick={() => handleTimeClick(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <div className={styles["reservation-info"]}>
        <h3>예약 시 확인해 주세요</h3>
        <div className={styles["info-content"]}>
          <ul>
            <li>네이버 페이로 시간 예약 후 결제 시에만 생성됩니다.</li>
            <li>예약 프로모션 상품은 선착제 입니다.</li>
            <li>
              천재지변에 대한 변경, 추가 금액 발생 시 기타 할인 혜택 중복 적용
              및 바우처 사용 불가합니다.
            </li>
            <li>
              네이버 페이로 예약 시, 와우트 멤버 등 멤버십 포인트 적립 및 기타
              중복 할인 적용이 불가합니다.
            </li>
            <li>최대 4인까지 예약 가능합니다.</li>
          </ul>
        </div>
        <div className={styles["reservation-number"]}>
          예약문의: 02 2016 1235
        </div>
      </div>
    </div>
  );
};

export default ConsultReservation;
