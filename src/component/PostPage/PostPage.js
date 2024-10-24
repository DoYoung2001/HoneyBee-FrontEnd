import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PostPage.module.css';

const PostPage = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState({});
  const [replyText, setReplyText] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const [editText, setEditText] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const menuRef = useRef(null);


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


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
        setIsMenuOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
      setReplyingTo(prev => ({...prev, [commentId]: false}));
    }
  };

  const handleEdit = (commentId, isReply = false, parentId = null) => {
    let targetComment;
    if (isReply) {
      targetComment = comments.find(c => c.id === parentId)?.replies.find(r => r.id === commentId);
    } else {
      targetComment = comments.find(c => c.id === commentId);
    }
    if (targetComment) {
      setEditingComment({ id: commentId, isReply, parentId });
      setEditText(targetComment.text);
    }
    setActiveMenu(null);
  };

  const handleEditSubmit = () => {
    if (editText.trim()) {
      const updatedComments = comments.map(comment => {
        if (editingComment.isReply && comment.id === editingComment.parentId) {
          return {
            ...comment,
            replies: comment.replies.map(reply =>
              reply.id === editingComment.id ? { ...reply, text: editText } : reply
            )
          };
        } else if (!editingComment.isReply && comment.id === editingComment.id) {
          return { ...comment, text: editText };
        }
        return comment;
      });
      setComments(updatedComments);
      setEditingComment(null);
      setEditText('');
    }
  };

  const handleDelete = (commentId, isReply = false, parentId = null) => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      if (isReply) {
        const updatedComments = comments.map(comment => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: comment.replies.filter(reply => reply.id !== commentId)
            };
          }
          return comment;
        });
        setComments(updatedComments);
      } else {
        const updatedComments = comments.filter(comment => comment.id !== commentId);
        setComments(updatedComments);
      }
    }
    setActiveMenu(null);
  };

  const toggleCommentMenu = (commentId) => {
    setActiveMenu(activeMenu === commentId ? null : commentId);
  };

  const toggleReply = (commentId) => {
    setReplyingTo(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  const togglePostMenu = (e) => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleModifyPost = (e) => {
    e.preventDefault();
    setIsEditing(true);
    setEditedContent(postInfo.content);
    setIsMenuOpen(false);
  };

  const handleDeletePost = (e) => {
    e.preventDefault();
    if (setShowDeleteModal(true)) {
      // 여기에 실제 삭제 로직을 추가
      navigate('/questionboard');
    }
    setIsMenuOpen(false);
  };

  const handleSaveEdit = () => {
    setPostInfo({ ...postInfo, content: editedContent });
    setIsEditing(false);
  };


  return (
    <div className={styles.pageContainer}>
      <div className={styles.postHeader}>
        <h1 className={styles.postTitle}>{postInfo.title}</h1>
        <div className={styles.postInfoContainer}>
    <div className={styles.postInfo}>
      <span className={styles.postCategory}>{postInfo.category}</span>
      <span className={styles.postAuthor}>{postInfo.author}</span>
      <span className={styles.postDate}>{postInfo.date}</span>
    </div>
        <div className={styles.overflowMenuContainer} ref={menuRef}>   
          <a 
            href="#" 
            className={styles.btnOverflowMenu} 
            onClick={togglePostMenu}
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
          )}
        </div>
      </div>
      </div>
      <div className={styles.postContent}>
        {isEditing ? (
          <>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className={styles.editTextarea}
            />
            <div className={styles.editButtons}>
              <button onClick={handleSaveEdit} className={styles.button}>저장</button>
              <button onClick={() => setIsEditing(false)} className={styles.button}>취소</button>
            </div>
          </>
        ) : (
          postInfo.content
        )}
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
              <span className={styles.authorName}>{comment.author}</span>
              <div className={styles.commentActions} ref={menuRef}>
                <div className={styles.menuContainer}>
                <button className={styles.menuButton} onClick={() => toggleCommentMenu(comment.id)}>⋮</button>
                  {activeMenu === comment.id && (
                    <div className={styles.menuDropdown}>
                      <button onClick={() => handleEdit(comment.id)}>수정</button>
                      <button onClick={() => handleDelete(comment.id)}>삭제</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {editingComment && editingComment.id === comment.id && !editingComment.isReply ? (
              <div className={styles.editContainer}>
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className={styles.editInput}
              />
              <div className={styles.editButtons}>
                <button onClick={handleEditSubmit} className={styles.button}>저장</button>
                <button onClick={() => setEditingComment(null)} className={styles.button}>취소</button>
              </div>
            </div>
            ) : (
              <>
                <p className={styles.commentText}>{comment.text}</p>
                <span className={styles.timestamp}>{comment.timestamp}</span>
              </>
            )}
            <div>
            <button className={styles.replyButton} onClick={() => toggleReply(comment.id)}>
              답글
            </button>
            </div>
            {replyingTo[comment.id] && (
              <div className={styles.replyForm}>
                <span className={styles.replyArrow}>↳</span>
                <input
                  className={styles.replyInput}
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="답글을 입력하세요"
                />
                <button className={styles.button} onClick={() => handleReplySubmit(comment.id)}>
                  답글 작성
                </button>
              </div>
            )}
            {comment.replies.map(reply => (
              <div key={reply.id} className={styles.reply}>
                <span className={styles.replyArrow}>↳</span>
                <div className={styles.replyContent}>
                  <div className={styles.replyHeader}>
                    <span className={styles.authorName}>{reply.author}</span>
                    <div className={styles.replyActions}>
                      <div className={styles.menuContainer} ref={menuRef}>
                      <button className={styles.menuButton} onClick={() => toggleCommentMenu(reply.id)}>⋮</button>
                        {activeMenu === reply.id && (
                          <div className={styles.menuDropdown}>
                            <button onClick={() => handleEdit(reply.id, true, comment.id)}>수정</button>
                            <button onClick={() => handleDelete(reply.id, true, comment.id)}>삭제</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {editingComment && editingComment.id === reply.id && editingComment.isReply ? (
                    <div className={styles.editContainer}>
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className={styles.editInput}
                      />
                      <div className={styles.editButtons}>
                        <button onClick={handleEditSubmit} className={styles.button}>저장</button>
                        <button onClick={() => setEditingComment(null)} className={styles.button}>취소</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className={styles.commentText}>{reply.text}</p>
                      <span className={styles.timestamp}>{reply.timestamp}</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>게시글을 삭제하시겠습니까?</p>
            <div className={styles.modalButtons}>
              <button onClick={handleDelete}>삭제</button>
              <button onClick={() => setShowDeleteModal(false)}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostPage;