// import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
// import Signup from "./components/Signup/index";
// import Login from "./components/Login/index"

function App() {
	// const user = localStorage.getItem("token");
	return (
		// <Routes>
		// 	{user && <Route path="/" exact element={<Home />} />}
		// 	<Route path="/signup" exact element={<Signup />} />
		// 	<Route path="/login" exact element={<Login />} />
		// 	<Route path="/" element={<Navigate replace to="/login" />} />
		// </Routes>
		<Home />
	);
}

export default App
