import React, { useEffect, useState } from "react";
import styles from "./Mypage.module.css";

function Mypage() {
  const [userData, setUserData] = useState({
    name: "홍길동", // 예시 데이터
    nickname: "딱풀핑",
    email: "hong@example.com",
    phoneNumber: "010-0000-0000",
    address: "서울특별시 은평구",
  });

  useEffect(() => {
    // 실제로는 API 호출을 통해 유저 데이터를 불러오는 로직이 들어가야 함
    // 예: fetch("/api/user/mypage").then(response => response.json()).then(data => setUserData(data))
  }, []);

  return (
    <div className={styles.mypageContainer}>
      <div className={styles.userprofile}>
        <div className={styles.mypagePhoto}></div>
        <div>
          <button className={styles.photoButton}>사진 추가</button>
        </div>
        <div className={styles.profileName}>
          <p>딱풀핑</p>
        </div>
      </div>
      <div className={styles.userInfo}>
        <div className={styles.userInfoName}>개인정보관리</div>
        <p>
          <strong>이름:</strong> {userData.name}
        </p>
        <p>
          <strong>닉네임:</strong> {userData.nickname}
        </p>
        <p>
          <strong>이메일:</strong> {userData.email}
        </p>
        <p>
          <strong>전화번호:</strong> {userData.phoneNumber}
        </p>
        <p>
          <strong>주소:</strong> {userData.address}
        </p>
        <div className={styles.userActions}>
          <button>수정하기</button>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
