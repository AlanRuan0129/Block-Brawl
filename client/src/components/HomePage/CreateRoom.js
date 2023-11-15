import React, { useContext } from "react";
import { AppContext } from "../../GameContext";
import Socket from "../../Socket";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

function CreateRoom({ closeModal }) {
  const navigate = useNavigate();
  const {
    setIsHost,
    setRoomId,
    handlers,
    name,
    setName,
    setColors,
    setColorStatus,
  } = useContext(AppContext);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setName(newValue);
  };

  const createRoom = (e) => {
    e.preventDefault();
    setIsHost(true);
    Socket.connect();
    console.log("Connected to the server");
    Socket.emit("create-room", { name: name }, (room) => {
      setRoomId(room.roomId);
      handlers.setState(room.players);
      setName(name);
      setColors(room.colors);
      setColorStatus(room.colorStatus);
      alert(`Room ${room.roomId} Created!`);
      navigate("/setting");
    });
  };

  // Main modal container with positioning styles
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
      {/* Background overlay */}

      <div className="flex flex-col bg-cover bg-center bg-indigo-300  rounded-[2rem] shadow-3d text-center p-5 w-[30rem] h-[20rem] shadow z-60">
        {/* Modal header: title and close button */}
        <div className="flex flex-col items-center justify-between mb-[1rem] rounded-t ">
          <div className="flex flex-row items-center justify-center w-full mt-[-0.5rem]">
            {/* <h3 className="text-[2rem] font-medium text-gray-900">Join Room</h3> */}
            <h3 className="text-[3rem] font-extrabold text-white text-center">
              Create Room
            </h3>
            <button
              type="button"
              className="flex text-white rounded-lg text-sm ml-auto inline-flex pt-2"
              onClick={() => closeModal(false)}
            >
              <svg
                className="w-8 h-8"
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
        </div>

        {/* Form to enter username and submit */}

        <form className=" flex flex-col space-y-[2.5rem] mt-[1rem]" action="#">
          <div>
            {/* Input field for username */}
            <input
              className="bg-sky-100 border-[0.2rem] border-white focus:outline-none focus:ring focus:ring-game-pink  text-gray-900 text-[1.5rem] rounded-xl w-full p-2.5"
              placeholder="Enter your username"
              value={name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit button */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="flex items-center justify-center bg-game-pink border-white text-[1.2rem] text-white font-bold py-[0.8rem] px-[3.5rem] rounded-lg"
              onClick={createRoom}
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateRoom;
