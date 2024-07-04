import React, { useState } from "react";
import "../styles/postCard.css";

const PostCard = ({ post, onEdit, onDelete }) => {
  const [likes, setLikes] = useState(post.likes ?? 0);
  const [dislikes, setDislikes] = useState(post.dislikes ?? 0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post.comments ?? []);

  const handleLike = () => setLikes(likes + 1);
  const handleDislike = () => setDislikes(dislikes + 1);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-info">
          <h2>{post.post_title}</h2>
          <p>Posted on:{new Date(post.createdAt).toLocaleString()}</p>
        </div>
        <div className="post-actions">
          <button
            onClick={() => {
              window.location.href = `/edit-post/${post._id}`;
            }}
          >
            Edit
          </button>
          <button onClick={onDelete}>Delete</button>
        </div>
      </div>
      <p className="post-content">{post.post_description}</p>
      <div className="post-interactions">
        <button onClick={handleLike}>Like ({likes ?? 0})</button>
        <button onClick={handleDislike}>Dislike ({dislikes ?? 0})</button>
      </div>
      <form onSubmit={handleCommentSubmit} className="comment-form">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button type="submit">Comment</button>
      </form>
      <div className="comments-section">
        {comments &&
          comments.length > 0 &&
          comments.map((comment, index) => (
            <p key={index} className="comment">
              {comment}
            </p>
          ))}
      </div>
    </div>
  );
};

export default PostCard;
