import React from "react";
import { UserContext } from "../user/userContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
  };

  return (
    <div>
      <h1>UserProfile</h1>
      <h2>{user?.id}</h2>
      <h2> {user?.username} </h2>
      <h2>{user?.email}</h2>
      <button onClick={handleLogout}>exit</button>
      <button onClick={() => navigate("/create-post")}>New Post</button>
    </div>
  );
}
