import React, { useState, useContext } from "react";
import { UserContext } from "../user/userContext";

export default function PostWrite() {
  const { user, setUser } = useContext(UserContext);

  // Состояния для формы
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/users/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        title,
        category,
        tags: tags.split(","),
        content,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== "201") {
          console.log("Failed to create post:", data.message);
        } else {
          console.log("Post created successfully:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div>
      <h1>User Profile</h1>
      <h2>{user?.username}</h2>
      <h2>{user?.email}</h2>

      <h3>Create a New Post</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tags (comma separated):</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
