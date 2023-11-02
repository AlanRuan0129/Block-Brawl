import React, { useState } from "react";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";


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
    <div className="w-full h-full flex flex-col">
      {/* Navigation bar */}
      <nav className="w-full h-[70px] bg-yellow-400 flex items-center justify-between">
        <h1 className="text-white text-2xl font-bold ml-5">BlockBrawl</h1>

        {/* Logout button */}
        <button
          type="button"
          className="text-white bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-2 py-2 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          onClick={handleLogout}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
            />
          </svg>
        </button>
      </nav>

      {/* Main content */}
      <div className="fixed bottom-80 left-0 right-0 flex flex-col items-center justify-end mt-auto space-y-10 pb-4">
        {/* Button to create a room */}
        <button
          type="button"
          className="text-white w-40 h-12 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm text-center"
          onClick={() => setOpenModal1(true)}
        >
          Create Room
        </button>
        {/* Display the CreateRoom modal if openModal1 is true */}
        {openModal1 && <CreateRoom closeModal={setOpenModal1} />}

        {/* Button to join a room */}
        <button
          type="button"
          className="text-white w-40 h-12 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm text-center"
          onClick={() => setOpenModal2(true)}
        >
          Join Room
        </button>

        {/* Display the JoinRoom modal if openModal2 is true */}
        {openModal2 && <JoinRoom closeModal={setOpenModal2} />}
      </div>
    </div>
  );
};

export default HomePage;
