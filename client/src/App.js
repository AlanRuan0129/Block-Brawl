import { Route, Routes, Navigate } from "react-router-dom";
// import { Route, Routes } from "react-router-dom";
import Home from "./components/HomePage/HomePage";
import Signup from "./components/Signup/index";
import Login from "./components/Login/index";
import Layout from "./components/Layout";
import SettingPage from "./components/SettingPage";
import GamePage from "./components/GamePage";

function App() {
  const user = localStorage.getItem("token");
  return (
    <Routes>
      {user && <Route path="/" exact element={<Home />} />}

      <Route path="/homepage" exact element={<Home />} />

      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />

      <Route path="/Layout" element={<Layout />}>
        <Route path="setting" element={<SettingPage />} />
        <Route path="game" element={<GamePage />} />
      </Route>

      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;
