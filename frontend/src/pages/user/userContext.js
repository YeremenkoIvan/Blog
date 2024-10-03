import { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken"));

  const fetchUserData = (token) => {
    if (token) {
      fetch("http://localhost:8000/users/getByToken", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            console.log(data);
            setUser(data);
          } else {
            console.log(
              "Не удалось получить данные пользователя:",
              data.status
            );
          }
        })
        .catch((error) => {
          console.error("Ошибка при получении данных пользователя:", error);
        });
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserData(token);
    } else {
      setUser(null);
    }
  }, [token]);

  const updateToken = (newToken) => {
    localStorage.setItem("authToken", newToken);
    setToken(newToken);
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateToken }}>
      {children}
    </UserContext.Provider>
  );
}
