import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../user/userContext"; // Импортируйте UserContext

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { updateToken } = useContext(UserContext); // Получите функцию updateToken из контекста

  const handleClick = () => {
    fetch("http://localhost:8000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== "200") {
          console.log("Login failed:", data.message);
        } else {
          console.log("Registration successful:", data);
          updateToken(data.token);
          console.log("Token saved to Local Storage:", data.token);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div className="App">
      <h1>Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleClick();
        }}
      >
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
