import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
// import CreateEdit from "./CreateEditPost";
import "../styles/homepage.css";
import axios from "axios";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    // Fetch posts from an API or load from local storage
    // For this example, we'll use dummy data
    // const dummyPosts = [
    //   {
    //     id: 1,
    //     title: "First Post",
    //     content: "This is the first post",
    //     date: new Date(),
    //     likes: 0,
    //     dislikes: 0,
    //     comments: [],
    //   },
    //   {
    //     id: 2,
    //     title: "Second Post",
    //     content: "This is the second post",
    //     date: new Date(),
    //     likes: 0,
    //     dislikes: 0,
    //     comments: [],
    //   },
    // ];
    // setPosts(dummyPosts);

    axios.get("http://localhost:5001/post/get-posts").then((res) => {
      setPosts(res.data);
    });
  }, [isDeleted]);

  const handleCreatePost = (newPost) => {
    setPosts([
      ...posts,
      {
        ...newPost,
        id: Date.now(),
        date: new Date(),
        likes: 0,
        dislikes: 0,
        comments: [],
      },
    ]);
  };

  const handleEditPost = (updatedPost) => {
    setPosts(
      posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

  const handleDeletePost = (postId) => {
    axios
      .delete(`http://localhost:5001/post/delete-post/${postId}`)
      .then((res) => {
        setIsDeleted(true);
      });
  };

  return (
    <div className="home-page">
      <div className="header_container">
        <h1>Blog Posts</h1>
        <button
          onClick={() => {
            window.location.href = "/create";
          }}
        >
          Add Post
        </button>
      </div>
      {posts.length > 0 &&
        posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            // onEdit={() => setEditingPost(post)}
            onDelete={() => handleDeletePost(post._id)}
          />
        ))}
    </div>
  );
};

export default HomePage;
