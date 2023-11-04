import { Route, Routes, Navigate } from "react-router-dom";
// import { Route, Routes } from "react-router-dom";
import Home from "./components/HomePage/HomePage";
import Room from "./components/RoomPage/RoomPage";
import Signup from "./components/Signup/index";
import Login from "./components/Login/index";


function App() {
	const user = localStorage.getItem("token");
	return (
		<Routes>
			{user && <Route path="/" exact element={<Home />} />}

			
			<Route path="/homepage" exact element={<Home />} />
			<Route path="/roompage" exact element={<Room />} />

			
			

			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			
			<Route path="/" element={<Navigate replace to="/login" />} />
		</Routes>
	);
	
}

export default App
