import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './QuestionBoard.module.css';

const QuestionBoard = () => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const questionsPerPage = 10;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 초기 게시글 목록 설정
    setQuestions([
      {
        id: 1,
        title: "우울증 증상에 대해 궁금합니다",
        content: "최근에 계속 우울한 기분이 들고 의욕이 없어요. 이게 우울증의 증상인가요? 여러 가지 이유로 우울증에 대한 걱정이 커지고 있습니다. 주변 사람들과도 이야기하기가 힘든 상황이에요.",
        author: "우울한사람",
        date: new Date("2024-10-15T14:30:00"),
        category: "우울증"
      },
      {
        id: 2,
        title: "불안장애와 공황장애의 차이점",
        content: "불안장애와 공황장애가 어떻게 다른지 궁금합니다. 증상의 차이점을 알고 싶어요. 특히, 공황발작이 일어날 때의 느낌과 불안감의 차이를 알고 싶습니다.",
        author: "불안한마음",
        date: new Date("2024-10-13T10:15:00"),
        category: "불안장애"
      },
      {
        id: 3,
        title: "ADHD 성인 진단 과정",
        content: "성인 ADHD 진단을 받고 싶은데 어떤 과정을 거쳐야 하나요? 진단을 받기 위해 필요한 검사나 절차가 궁금합니다. 또한, 치료 방법도 알고 싶어요.",
        author: "집중력부족",
        date: new Date("2024-10-10T16:45:00"),
        category: "ADHD"
      },
      {
        id: 4,
        title: "스트레스 해소법 추천해주세요",
        content: "직장 스트레스가 너무 심해요. 효과적인 스트레스 해소법을 알고 싶습니다. 운동이나 명상 같은 방법들이 도움이 될까요?",
        author: "스트레스폭발",
        date: new Date("2024-10-08T09:20:00"),
        category: "스트레스"
      },
      {
        id: 5,
        title: "불면증 극복 방법",
        content: "몇 달째 불면증에 시달리고 있어요. 약물 없이 극복할 수 있는 방법이 있을까요? 수면 환경을 개선하는 방법이나 자연 요법도 알고 싶습니다.",
        author: "잠못드는밤",
        date: new Date("2024-10-05T22:10:00"),
        category: "수면장애"
      },
      {
        id: 6,
        title: "대인관계 불안 극복하기",
        content: "사람들과 대화할 때 극심한 불안감을 느껴요. 어떻게 극복할 수 있을까요? 특히, 처음 만나는 사람들과의 대화에서 긴장을 풀 수 있는 팁이 필요합니다.",
        author: "소심이",
        date: new Date("2024-10-03T13:30:00"),
        category: "사회불안"
      },
      {
        id: 7,
        title: "강박증 증상과 대처 방법",
        content: "반복적인 확인 행동을 하게 돼요. 이게 강박증인가요? 어떻게 대처해야 할까요? 강박증으로 인해 일상생활에 지장이 생기고 있습니다.",
        author: "확인또확인",
        date: new Date("2024-09-30T11:05:00"),
        category: "강박증"
      },
      {
        id: 8,
        title: "식이장애 극복 경험 공유",
        content: "거식증을 극복한 경험이 있으신 분들의 이야기를 듣고 싶어요. 어떤 치료를 받았는지, 그리고 어떤 마음가짐으로 극복했는지 공유해주시면 감사하겠습니다.",
        author: "회복희망",
        date: new Date("2024-09-27T17:40:00"),
        category: "식이장애"
      },
      {
        id: 9,
        title: "양극성 장애의 조기 징후",
        content: "양극성 장애의 초기 증상은 어떤 것들이 있나요? 어떻게 알아볼 수 있을까요? 조기 발견을 위한 체크리스트 같은 게 있으면 좋겠습니다.",
        author: "기분파",
        date: new Date("2024-09-25T08:55:00"),
        category: "양극성장애"
      },
      {
        id: 10,
        title: "트라우마 치료법 추천",
        content: "어린 시절의 트라우마로 고통받고 있어요. 효과적인 치료법을 추천해주세요. 상담치료 외에 어떤 방법들이 있는지 알고 싶습니다.",
        author: "과거의그림자",
        date: new Date("2024-09-22T19:25:00"),
        category: "트라우마"
      },
      {
        id: 11,
        title: "자존감 향상을 위한 방법",
        content: "낮은 자존감 때문에 힘들어요. 자존감을 높일 수 있는 방법을 알고 싶습니다. 특히, 일상에서 쉽게 실천할 수 있는 팁이 있으면 좋겠어요.",
        author: "자존감UP",
        date: new Date("2024-09-20T12:00:00"),
        category: "자존감"
      },
      {
        id: 12,
        title: "알코올 중독 극복 과정",
        content:"알코올 중독을 극복하고 싶어요. 어떤 단계를 거쳐야 하나요? 주변의 도움도 필요하지만, 스스로 할 수 있는 방법도 알고 싶습니다.",
         author:"새출발",
         date:new Date("2024-09-18T20:15:00"),
         category:"중독"
       },
       {
         id : 13,
         title : "공부 집중력 높이는 방법",
         content : "공부할 때 집중력이 너무 낮아요. 집중력을 높일 수 있는 방법을 알려주세요. 특히, 공부 환경이나 시간 관리에 대한 조언이 필요합니다.",
         author : "열공하고싶어",
         date : new Date("2024-09-15T15:30:00"),
         category : "학업"
       },
       {
         id : 14,
         title : "가족 갈등 해결 방법",
         content : "부모님과의 갈등이 심해요. 원만한 가족 관계를 위한 조언이 필요합니다. 서로 이해하고 소통하는 방법에 대한 조언도 듣고 싶어요.",
         author : "화목한가정",
         date : new Date("2024-09-12T18:45:00"),
         category : "가족관계"
       },
       {
         id : 15,
         title : "번아웃 증후군 대처법",
         content : "직장에서 심한 번아웃을 겪고 있어요. 어떻게 대처해야 할까요? 특히, 휴식이나 재충전을 위한 좋은 방법들을 알고 싶습니다.",
         author : "지친직장인",
         date : new Date("2024-09-10T09:50:00"),
         category : "직장스트레스"
       }
     ]);
   }, []);

  useEffect(() => {
    if (location.state && location.state.newPost) {
      setQuestions(prevQuestions => [location.state.newPost, ...prevQuestions]);
      navigate(location.pathname, { replace: true, state: {} }); 
    }
  }, [location, navigate]);

  const formatDate = (date) => {
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  const handleWriteClick = () => {
    navigate('/createpost');
  };

  const handleQuestionClick = (question) => {
    navigate(`/postpage/${question.id}`, { state: { question } });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // 검색 시 첫 페이지로 리셋
  };

  const filteredQuestions = questions
  .filter(question =>
    question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.content.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => b.date - a.date); 

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

  return (
    <div className={styles.boardContainer}>
      <div className={styles.headerContainer}>
        <h1 className={styles.boardTitle}>질문게시판</h1>
        <button onClick={handleWriteClick} className={styles.writeButton}>작성하기</button>
      </div>
      
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="제목 또는 내용으로 검색"
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.questionsContainer}>
        {currentQuestions.map(question => (
          <div 
            key={question.id} 
            className={styles.questionItem} 
            onClick={() => handleQuestionClick(question)}
          >
            <div className={styles.questionHeader}>
            <span className={styles.category}>{question.category}</span>
            </div>
            <div className={styles.questionContent}>
              <h2 className={styles.questionTitle}>{question.title}</h2>
              <p className={styles.questionText}>
                    {question.content.length > 50 
                  ? question.content.slice(0, 50) + '...' 
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