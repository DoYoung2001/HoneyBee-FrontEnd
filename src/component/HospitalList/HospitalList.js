import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./HospitalList.module.css";

const HospitalList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("역삼동");
  const navigate = useNavigate();
  const location = useLocation();

  // URL에서 현재 페이지 번호 가져오기
  const currentPage =
    parseInt(new URLSearchParams(location.search).get("page")) || 1;

  // 자동으로 병원 데이터를 생성하는 함수
  const generateHospitals = (count) => {
    const hospitals = [];
    for (let i = 1; i <= count; i++) {
      hospitals.push({
        id: i,
        name: `병원 ${i}`,
        rating: (Math.random() * 2 + 3).toFixed(1), // 임의의 평점 (3.0 ~ 5.0)
        reviews: Math.floor(Math.random() * 3000), // 임의의 리뷰 수
        category: "정신과",
        distance: `${Math.floor(Math.random() * 1000)}m`, // 임의의 거리
        location: `서울특별시 강남구 역삼동 ${i}`, // 임의의 위치
      });
    }
    return hospitals;
  };

  const hospitals = generateHospitals(101);

  const itemsPerPage = 10; // 한 페이지에 보일 병원 개수

  // 병원 데이터를 페이지별로 나누기
  const indexOfLastHospital = currentPage * itemsPerPage;
  const indexOfFirstHospital = indexOfLastHospital - itemsPerPage;
  const currentHospitals = hospitals.slice(
    indexOfFirstHospital,
    indexOfLastHospital
  );

  // 총 페이지 수
  const totalPages = Math.ceil(hospitals.length / itemsPerPage);

  // 페이지 변경 처리 함수
  const handlePageChange = (page) => {
    navigate(`?page=${page}`);
  };

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    if (filter === "가까운 순") {
      hospitals.sort((a, b) => a.distance - b.distance);
    } else if (filter === "평점 순") {
      hospitals.sort((a, b) => b.rating - a.rating);
    } else if (filter === "진료 중") {
      // 진료 중 기준 정렬 로직 추가 (예: 리뷰 수로 정렬)
      hospitals.sort((a, b) => b.reviews - a.reviews);
    }
  };

  const handleSearchClick = () => {
    const filteredHospitals = hospitals.filter(
      (hospital) =>
        hospital.name.includes(searchTerm) ||
        hospital.location.includes(searchTerm)
    );

    console.log("Filtered hospitals:", filteredHospitals);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>병원 목록</h1>

      <div className={styles.searchSection}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="병원, 지역, 증상"
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className={styles.searchButton} onClick={handleSearchClick}>
            🔍
          </button>
        </div>

        <div className={styles.separator} />

        <div className={styles.filters}>
          <button
            className={`${styles.filterButton} ${
              selectedFilter === "평점 순" ? styles.activeFilter : ""
            }`}
            onClick={() => handleFilterClick("평점 순")}
          >
            평점 순
          </button>
          <button
            className={`${styles.filterButton} ${
              selectedFilter === "진료 중" ? styles.activeFilter : ""
            }`}
            onClick={() => handleFilterClick("진료 중")}
          >
            진료 중
          </button>
          <button
            className={`${styles.filterButton} ${
              selectedFilter === "내 현재 위치" ? styles.activeFilter : ""
            }`}
            onClick={() => handleFilterClick("내 현재 위치")}
          >
            <span className="mr-1.5">📍</span>내 현재 위치
          </button>
        </div>
      </div>

      <div className={styles.hospitalList}>
        {currentHospitals.map((hospital) => (
          <div key={hospital.id} className={styles.hospitalItem}>
            <div className={styles.hospitalInfo}>
              <div className={styles.hospitalHeader}>
                <h2>{hospital.name}</h2>
                <div className={styles.rating}>
                  <span>★ {hospital.rating}</span>
                  <span className={styles.reviews}>({hospital.reviews})</span>
                </div>
              </div>
              <p>{hospital.category}</p>
              <div className={styles.location}>
                <span>{hospital.distance}</span>
                <span>{hospital.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        {/* 처음 페이지로 이동 */}
        {currentPage > 1 && (
          <button
            className={styles.pageButton}
            onClick={() => handlePageChange(1)}
          >
            {"<<"}
          </button>
        )}

        {/* 5페이지씩 이전으로 이동 */}
        {currentPage > 5 && (
          <button
            className={styles.pageButton}
            onClick={() => handlePageChange(currentPage - 5)}
          >
            {"<"}
          </button>
        )}

        {/* 개별 페이지 버튼 */}
        {Array.from({ length: totalPages }, (_, index) => {
          // 현재 페이지에서 ±2 페이지만 표시되도록 함
          if (index + 1 >= currentPage - 2 && index + 1 <= currentPage + 2) {
            return (
              <button
                key={index + 1}
                className={`${styles.pageButton} ${
                  currentPage === index + 1 ? styles.active : ""
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            );
          }
          return null; // 표시되지 않을 페이지는 렌더링하지 않음
        })}

        {/* 5페이지씩 이후로 이동 */}
        {currentPage < totalPages - 5 && (
          <button
            className={styles.pageButton}
            onClick={() => handlePageChange(currentPage + 5)}
          >
            {">"}
          </button>
        )}

        {/* 마지막 페이지로 이동 */}
        {currentPage < totalPages && (
          <button
            className={styles.pageButton}
            onClick={() => handlePageChange(totalPages)}
          >
            {">>"}
          </button>
        )}
      </div>
    </div>
  );
};

export default HospitalList;
