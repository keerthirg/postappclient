import React, { useState, useEffect } from "react";
import "../styles/createEdit.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const CreateEdit = ({ onSubmit, onCancel }) => {
  const { post_id } = useParams();
  console.log("post_id: ", post_id);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [user, setUser] = useState({});

  const [post, setPost] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") ?? {}));
    if (post_id)
      axios
        .get(`http://localhost:5001/post/get-post/${post_id}`)
        .then((res) => {
          setPost(res.data);
          setTitle(res.data.post_title);
          setContent(res.data.post_description);
        });
  }, [post_id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (post_id) {
      axios
        .put(`http://localhost:5001/post/update-post/${post_id}`, {
          user_id: user?._id,
          post_title: title,
          post_description: content,
        })
        .then((res) => {
          window.location.href = "/";
        });
      return;
    }
    axios
      .post("http://localhost:5001/post/add-post", {
        user_id: user?._id,
        post_title: title,
        post_description: content,
      })
      .then((res) => (window.location.href = "/"));
    setTitle("");
    setContent("");
  };

  return (
    <div className="create-edit">
      <h2>{post_id ? "Edit Post" : "Create New Post"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter post content"
          required
        />
        <div className="form-actions">
          <button type="submit">{post_id ? "Update" : "Create"}</button>
          {post_id && (
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateEdit;
