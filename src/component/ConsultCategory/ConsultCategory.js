import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ConsultCategory.module.css";

const consultCategories = [
  { name: "우울증 상담", icon: "😔", counselors: 15, hospitals: 5 },
  { name: "불안 장애 상담", icon: "😨", counselors: 10, hospitals: 3 },
  { name: "스트레스 관리 상담", icon: "😓", counselors: 8, hospitals: 4 },
  { name: "부부 상담", icon: "❤️", counselors: 15, hospitals: 5 },
  { name: "가족 상담", icon: "👪", counselors: 10, hospitals: 3 },
  { name: "청소년 상담", icon: "👦", counselors: 8, hospitals: 4 },
  { name: "성인 상담", icon: "👨‍🦳", counselors: 15, hospitals: 5 },
  { name: "자존감 회복 상담", icon: "💪", counselors: 10, hospitals: 3 },
  { name: "트라우마 치료 상담", icon: "💔", counselors: 8, hospitals: 4 },
  { name: "전체보기", icon: "⋯" },
];

const ConsultCategory = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가
  const [filteredCategories, setFilteredCategories] =
    useState(consultCategories); // 필터링된 카테고리 상태
  const navigate = useNavigate();

  const handleMouseEnter = (category) => {
    setHoveredCategory(category);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  const handleCategoryClick = (category) => {
    // 카테고리 클릭 시 해당 경로로 이동
    navigate(`/counselorlist?category=${category.name}`); // 카테고리 이름을 쿼리 파라미터로 전달
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // 검색어 상태 업데이트
  };

  const handleSearchClick = () => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase(); // 대소문자 구분 없애기
    const filtered = consultCategories.filter(
      (category) => category.name.toLowerCase().includes(lowerCaseSearchTerm) // 검색어가 포함된 카테고리 필터링
    );
    setFilteredCategories(filtered); // 필터링된 카테고리 상태 업데이트
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className={styles.consultCategory}>
      <h1 className={styles.title}>상담 카테고리</h1>
      {/* 검색 섹션 */}
      <div className={styles.searchBox}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="상담 종류를 입력하세요"
            className={styles.searchInput}
            value={searchTerm} // 입력값을 상태로 관리
            onChange={handleSearchChange} // 입력값 변경 시 핸들러 호출
            onKeyDown={handleKeyPress} // 키 입력 시 핸들러 호출
          />
          <button className={styles.searchButton} onClick={handleSearchClick}>
            🔍
          </button>
        </div>
      </div>
      {/* 카테고리 클릭 섹션 */}
      <div className={styles.categorySeparator}></div> {/* 구분선 추가 */}
      <div className={styles.categoryGrid}>
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category, index) => (
            <div
              key={index}
              className={styles.categoryItem}
              onMouseEnter={() => handleMouseEnter(category)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleCategoryClick(category)}
            >
              <span className={styles.categoryIcon}>{category.icon}</span>
              <span className={styles.categoryName}>{category.name}</span>
              {hoveredCategory === category && (
                <div className={styles.tooltip}>
                  상담사: {category.counselors}명, 병원: {category.hospitals}곳
                </div>
              )}
            </div>
          ))
        ) : (
          <div className={styles.noResultsContainer}>
            <p className={styles.noResults}>검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultCategory;
