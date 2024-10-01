import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registration from "./pages/auth/Registration.js";
import Login from "./pages/auth/Login.js";
import MainPage from "./pages/mainPage/mainPage.js";
import Navbar from "./pages/Navbar/navbar.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
