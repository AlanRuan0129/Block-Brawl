import React, { useState } from "react";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import "./Homepage.css";

const HomePage = () => {
  // Define state variables to control modal visibility
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);

  // Function to handle user logout
  const handleLogout = () => {
    // Remove the user's token from local storage
    localStorage.removeItem("token");
    // Reload the window to log the user out
    window.location.reload();
  };

  return (
    <div className="overflow-hidden">
      <div className="flex flex-col h-screen">
        {/* Navigation bar */}
        <nav className="w-full h-[40px] bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 flex items-center justify-between">
          <img
            src="/assets/logo.png"
            alt="Logo"
            className="mt-[2px] h-[70px] ml-2"
          />

          <button
            type="button"
            className="mr-7 bg-power-off-purple toggle-btn relative inline-flex items-center justify-between p-0 w-[65px] h-7 rounded-full focus:outline-none focus:ring-4 focus:ring-red-300 transition-colors duration-300"
            onClick={handleLogout}
          >
            <span className="ml-2 text-base font-bold text-white">Off</span>
            <span className="toggle-slider absolute border-[1px] border-white right-1 top-1/2 -translate-y-1/2 bg-power-font w-[25px] h-[25px] rounded-full shadow-md transition-transform duration-300 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="4"
                stroke="currentColor"
                className="w-4 h-4 text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
                />
              </svg>
            </span>
          </button>
        </nav>

        {/* Main content */}
        <div className="bg-homepage bg-center bg-cover flex-grow flex flex-col items-center justify-center space-y-10">
          <div className="mt text-custom-pink font-nanum-pen font-bold text leading">
            BLOCK BRAWL
          </div>

          <div className="mt-35 flex-grow flex flex-col items-center justify-center space-y-[50px]">
            {/* Button to create a room */}
            <button
              type="button"
              className="text-white shadow-3d w-[20rem] h-[5.5rem] bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-luckiest-guy  font-bold rounded-[25px] text-[1.5rem] text-center"
              onClick={() => setOpenModal1(true)}
            >
              Create Room
            </button>

            {/* Display the CreateRoom modal if openModal1 is true */}
            {openModal1 && <CreateRoom closeModal={setOpenModal1} />}

            {/* Button to join a room */}
            <button
              type="button"
              className="text-white shadow-3d w-[20rem] h-[5.5rem]  bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-luckiest-guy  font-bold rounded-[25px] text-[1.5rem] text-center"
              onClick={() => setOpenModal2(true)}
            >
              Join Room
            </button>

            {/* Display the JoinRoom modal if openModal2 is true */}
            {openModal2 && <JoinRoom closeModal={setOpenModal2} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
