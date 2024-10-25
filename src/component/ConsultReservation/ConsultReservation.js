import React, { useState } from "react";
import styles from "./ConsultReservation.module.css";

const ConsultReservation = () => {
  const [selectedDate, setSelectedDate] = useState(31);
  const [selectedTime, setSelectedTime] = useState(null);
  const [month, setMonth] = useState(9);
  const [year, setYear] = useState(2024);

  const timeSlots = ["10:00", "10:30", "11:00", "11:30", "13:00"];

  const generateCalendarData = () => {
    const days = [];
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // 첫 날의 요일을 구하기
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate(); // 마지막 날
    const lastDay = new Date(year, month, lastDate).getDay(); // 마지막 날의 요일

    // 빈 날짜 추가 (이전 달 빈 칸)
    for (let i = 0; i < firstDay; i++) {
      days.push({ date: null, isNextMonth: true });
    }

    // 해당 월 날짜 추가
    for (let i = 1; i <= lastDate; i++) {
      const dayOfWeek = new Date(year, month, i).getDay(); // 요일 구하기
      const dateToCheck = new Date(year, month, i);

      days.push({
        date: i,
        isToday:
          i === currentDay && month === currentMonth && year === currentYear,
        isNextMonth: false,
        isSunday: dayOfWeek === 0, // 일요일 여부
        isSaturday: dayOfWeek === 6, // 토요일 여부
        isPast: dateToCheck < today.setHours(0, 0, 0, 0), // 오늘 이전 날짜인지 여부
      });
    }

    // 마지막 주의 남은 칸만 채우기 (토요일까지)
    if (lastDay < 6) {
      for (let i = lastDay + 1; i <= 6; i++) {
        days.push({ date: null, isNextMonth: true });
      }
    }

    return days;
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <div className={styles["calendar-container"]}>
      <h1 className={styles.title}>예약하기</h1>
      <div className={styles.separator}></div>
      <header className={styles["calendar-header"]}>
        <div className={styles["month-selector"]}>
          <button className={styles["month-arrow"]} onClick={handlePrevMonth}>
            &lt;
          </button>
          <span>{`${year}.${month + 1}`}</span> {/* 0부터 시작하므로 +1 */}
          <button className={styles["month-arrow"]} onClick={handleNextMonth}>
            &gt;
          </button>
        </div>
      </header>

      <div className={styles["calendar-box"]}>
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
                className={`${styles["date-cell"]} 
                          ${day.isToday ? styles["today"] : ""} 
                          ${day.isNextMonth ? styles["next-month"] : ""} 
                          ${day.isSunday ? styles["sunday"] : ""} 
                          ${day.isSaturday ? styles["saturday"] : ""} 
                          ${day.isPast ? styles["past-date"] : ""} 
                          ${
                            selectedDate === day.date ? styles["selected"] : ""
                          }`}
                onClick={() =>
                  !day.isPast && day.date && handleDateClick(day.date)
                } // 지나간 날짜는 클릭 금지
              >
                {day.date !== null ? day.date : ""}
                {day.isToday && day.date !== null && (
                  <div className={styles["today-label"]}>
                    오늘
                  </div> /* 오늘 날짜에 '오늘' 표시 */
                )}
              </div>
            ))}
          </div>
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
