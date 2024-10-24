import React, { useState } from 'react';
import styles from './PostPage.module.css';

const PostPage = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  // SVG 아이콘 컴포넌트
const ModifyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

  const [postInfo, setPostInfo] = useState({
    id: '223328025788', // 예시 ID
    title: '게시글 제목',
    category: '스트레스',
    author: '직장인건가요',
    date: '2024-10-24',
    content: '여기에 게시글 내용이 들어갑니다. 여기에 게시글 내용이 들어갑니다. 여기에 게시글 내용이 들어갑니다.'
  });

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        text: newComment,
        author: '사용자',
        timestamp: new Date().toLocaleString(),
        replies: [],
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const handleReplySubmit = (commentId) => {
    if (replyText.trim()) {
      const updatedComments = comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, {
              id: Date.now(),
              text: replyText,
              author: '사용자',
              timestamp: new Date().toLocaleString(),
            }],
          };
        }
        return comment;
      });
      setComments(updatedComments);
      setReplyText('');
      setReplyingTo(null);
    }
  };

  const handleEdit = (commentId, newText) => {
    const updatedComments = comments.map(comment => 
      comment.id === commentId ? { ...comment, text: newText } : comment
    );
    setComments(updatedComments);
  };

  const handleDelete = (commentId) => {
    const updatedComments = comments.filter(comment => comment.id !== commentId);
    setComments(updatedComments);
  };

  const toggleMenu = (e) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleModifyPost = (e) => {
    e.preventDefault();
    console.log('게시글 수정:', postInfo.id);
    setIsMenuOpen(false);
  };

  const handleDeletePost = (e) => {
    e.preventDefault();
    console.log('게시글 삭제:', postInfo.id);
    setIsMenuOpen(false);
  };


  return (
    <div className={styles.pageContainer}>
      <div className={styles.postHeader}>
        <h1 className={styles.postTitle}>{postInfo.title}</h1>
        <div className={styles.postInfo}>
          <span className={styles.postCategory}>{postInfo.category}</span>
          <span className={styles.postAuthor}>{postInfo.author}</span>
          <span className={styles.postDate}>{postInfo.date}</span>
        </div>
        <div className={styles.overflowMenuContainer}>
            <a 
              href="#" 
              className={styles.btnOverflowMenu} 
              onClick={toggleMenu}
              role="button"
              aria-haspopup="true"
              aria-expanded={isMenuOpen}
            >
              <span className={styles.blind}>본문 기타 기능</span>
            </a>
            {isMenuOpen && (
              <div className={styles.overflowMenu}>
                <a href="#" className={styles.modifyLink} onClick={handleModifyPost}>
                  수정하기 <ModifyIcon />
                </a>
                <div className={styles.menuDivider}></div>
                <a href="#" className={styles.deleteLink} onClick={handleDeletePost}>
                  삭제하기 <DeleteIcon />
                </a>
              </div>
             )
            }
          </div>
      </div>
      <div className={styles.postContent}>
        {postInfo.content}
      </div>
      <div className={styles.commentSection}>
        <h2>댓글</h2>
        <form className={styles.commentForm} onSubmit={handleCommentSubmit}>
          <input
            className={styles.commentInput}
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요"
          />
          <button className={styles.button} type="submit">댓글 작성</button>
        </form>
        {comments.map(comment => (
          <div key={comment.id} className={styles.comment}>
            <div className={styles.commentHeader}>
              <span>{comment.author}</span>
              <span>{comment.timestamp}</span>
            </div>
            <p>{comment.text}</p>
            <div className={styles.commentActions}>
              <button className={styles.button} onClick={() => handleEdit(comment.id, prompt('수정할 내용을 입력하세요:'))}>수정</button>
              <button className={styles.button} onClick={() => handleDelete(comment.id)}>삭제</button>
              <button className={styles.button} onClick={() => setReplyingTo(comment.id)}>답글</button>
            </div>
            {replyingTo === comment.id && (
              <div className={styles.replyForm}>
                <input
                  className={styles.replyInput}
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="답글을 입력하세요"
                />
                <button className={styles.button} onClick={() => handleReplySubmit(comment.id)}>답글 작성</button>
              </div>
            )}
            {comment.replies.map(reply => (
              <div key={reply.id} className={`${styles.reply}`}>
                <div className={styles.replyArrow}>↳</div>
                <div className={styles.replyContent}>
                  <div className={styles.replyHeader}>
                    <span>{reply.author}</span>
                    <span>{reply.timestamp}</span>
                  </div>
                  <p>{reply.text}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostPage;