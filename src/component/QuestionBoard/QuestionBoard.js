import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './QuestionBoard.module.css';

const QuestionBoard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 10;
  const navigate = useNavigate();

  const questions = [
    {
      id: 1,
      title: "우울증 증상에 대해 궁금합니다",
      content: "최근에 계속 우울한 기분이 들고 의욕이 없어요. 이게 우울증의 증상인가요?",
      author: "우울한사람",
      date: new Date("2023-05-20T14:30:00"),
      category: "우울증"
    },
    {
      id: 2,
      title: "스트레스 해소법 추천해주세요",
      content: "직장에서 받는 스트레스가 너무 심해요. 효과적인 스트레스 해소법이 있을까요?",
      author: "직장인김씨",
      date: new Date("2023-05-19T10:15:00"),
      category: "스트레스"
    },
    {
      id: 3,
      title: "정신과 상담 어떻게 받나요?",
      content: "정신과 상담을 받고 싶은데 어떤 절차로 진행되는지 궁금합니다.",
      author: "상담초보",
      date: new Date("2023-05-18T16:45:00"),
      category: "병원 문의"
    },
    // ... 추가 게시글 (총 20개 이상)
  ].sort((a, b) => b.date - a.date); // 최신순 정렬

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  const formatDate = (date) => {
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  const handleWriteClick = () => {
    navigate('/createpost');
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(questions.length / questionsPerPage);

  return (
    <div className={styles.boardContainer}>
      <div className={styles.headerContainer}>
        <h1 className={styles.boardTitle}>질문게시판</h1>
        <button onClick={handleWriteClick} className={styles.writeButton}>작성하기</button>
      </div>
      
      <div className={styles.questionsContainer}>
        {currentQuestions.map(question => (
          <div key={question.id} className={styles.questionItem}>
            <span className={styles.category}>{question.category}</span>
            <div className={styles.questionContent}>
              <h2 className={styles.questionTitle}>{question.title}</h2>
              <p className={styles.questionText}>
                {question.content.length > 10 
                  ? question.content.slice(0, 10) + '...' 
                  : question.content}
              </p>
            </div>
            <div className={styles.questionMeta}>
              <span className={styles.author}>{question.author}</span>
              <span className={styles.date}>{formatDate(question.date)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className={styles.pageArrow}>
          &lt;
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button 
            key={i} 
            onClick={() => paginate(i + 1)} 
            className={`${styles.pageButton} ${currentPage === i + 1 ? styles.activePage : ''}`}
          >
            {i + 1}
          </button>
        ))}

        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className={styles.pageArrow}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default QuestionBoard;