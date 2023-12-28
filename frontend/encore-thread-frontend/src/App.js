import './App.css';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import MainProfile from "./components/UserProfile/MainProfile"
import TopLevelPage from "./components/TopLevelPage/TopLevelPage"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/userProfile" element={<MainProfile/>} />
          <Route path="/TopLevelPage" element={<TopLevelPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;