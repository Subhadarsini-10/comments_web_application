import React, { useEffect, useState } from "react";
import "../App.css";
import {
  getComments,
  createComments,
  deleteComments,
  updateComments,
} from "./getComments";
import { Comment } from "./Comment";
import { CommentFrom } from "./CommentFrom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


const Comments = ({ commentsUrl, currentUserId }) => {
  const navigate = useNavigate();
  const [backendComments, setBackendComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeComment, setActiveComment] = useState(null);
  const [loading, setLoading] = useState(true); 
  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdat).getTime() - new Date(b.createdat).getTime()
      );
  const addComment = (text, parentId) => {
    createComments(text, parentId).then((comment) => {
      setBackendComments([comment, ...backendComments]);
      setActiveComment(null);
    });
  };

  const updateComment = (text, commentId) => {
    updateComments(text).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
  };
  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteComments().then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
        );
        setBackendComments(updatedBackendComments);
      });
    }
  };
  const filteredComments = backendComments.filter((comment) => {
    const commentBodyIncludesTerm = comment.body.toLowerCase().includes(searchTerm.toLowerCase());
    const commenterUsernameIncludesTerm = comment.username.toLowerCase().includes(searchTerm.toLowerCase());

    return commentBodyIncludesTerm || commenterUsernameIncludesTerm;
  });
  

  useEffect(() => {
    getComments().then((data) => {
      setBackendComments(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="comments">
      <div className="home-button" onClick={() => navigate("/")}>
        <FontAwesomeIcon icon={faHome} />
      </div>
      <h3 className="comments-title">Comments</h3>
      
      <div className="search-bar-container">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
<path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
</svg>
        <input
          className="search-input"
          type="text"
          placeholder="Search posts and usernames"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="comment-form-title">Write comment</div>
      
      <CommentFrom submitLabel="Write" handleSubmit={addComment} />
      {loading && <div className="loader"></div>}

      <div className="comments-container">
        {!loading &&
          (filteredComments.length > 0 ? (
            filteredComments.map((rootComment) => (
              <Comment
                key={rootComment.id}
                comment={rootComment}
                replies={getReplies(rootComment.id)}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                addComment={addComment}
                deleteComment={deleteComment}
                updateComment={updateComment}
                currentUserId={currentUserId}
              />
            ))
          ) : (
            <div className="no-results-message">Nothing found. Create a new one!</div>
          ))}
      </div>
    </div>
  );
};

export default Comments;
