import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registration from "./pages/auth/Registration.js";
import Login from "./pages/auth/Login.js";
import MainPage from "./pages/mainPage/mainPage.js";
import Navbar from "./pages/Navbar/navbar.js";
import UserProfile from "./pages/user/UserProfile.js";
import PostWrite from "./pages/post/PostWrite.js";
import { UserProvider } from "./pages/user/userContext.js";

function App() {
  return (
    <Router>
      <div className="App">
        <UserProvider>
          <Navbar />
          <Routes>
            <Route path="/main" element={<MainPage />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/create-post" element={<PostWrite />} />
          </Routes>
        </UserProvider>
      </div>
    </Router>
  );
}

export default App;
