import React, { useContext, useState } from "react";
import { AppContext } from "../../GameContext";
import Socket from "../../Socket";
import { useNavigate } from "react-router-dom";

// JoinRoom Component: Modal for users to join an existing room
function JoinRoom({ closeModal }) {
  const navigate = useNavigate();

  const [userName] = useState("");
  const [roomNumber] = useState("");

  const { setIsHost, setRoomId, roomId, name, setName } =
    useContext(AppContext);

  const handleChange = (e) => {
    try {
      const { name, value } = e.target;
      if (name === "value") {
        setName(value);
      } else if (name === "number") {
        setRoomId(value);
      }
      setIsHost(false);
    } catch (error) {
      console.log(error);
    }
  };

  const joinRoom = () => {
    try {
      Socket.connect();
      Socket.emit("join-room", { roomId, name });
      navigate("/" + roomId.toString() + "/roompage");
    } catch (error) {
      console.log(error);
    }
  };

  // Main modal container with positioning styles
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
      {/* Background overlay */}
      <div className="absolute mt-[30px] top-0 left-0 w-full h-full bg-purple-600 opacity-50 backdrop-blur-md"></div>

      {/* Actual modal content container */}
      <div className="relative w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 z-60">
        {/* Modal header: title and close button */}
        <div className="flex items-start justify-between mb-4 rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Join Room
          </h3>

          {/* Close modal button */}
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
            onClick={() => closeModal(false)}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            {/* Accessibility: descriptive text for screen readers */}
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        {/* Form to enter username and room number to join */}
        <form className="space-y-6" action="#">
          <div>
            {/* Input field for username */}
            <input
              name="value"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter your username"
              value={userName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            {/* Input field for room number */}
            <input
              name="number"
              placeholder="Enter your room number"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              value={roomNumber}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit button to confirm and join the room */}
          <button
            type="submit"
            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={joinRoom}
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}

export default JoinRoom;
