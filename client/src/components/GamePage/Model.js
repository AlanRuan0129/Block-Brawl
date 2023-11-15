export function Modal({ show, pageJump, mainPrompt, buttonPrompt, title }) {
  const showHideClassName = show ? "fixed inset-0 z-50" : "hidden";
  return (
    <div
      className={
        showHideClassName +
        " bg-black bg-opacity-80 flex items-center justify-center"
      }
    >
      <section className="flex flex-col bg-cover bg-center bg-no-repeat bg-win bg-indigo-300  rounded-xl shadow-3d text-center transform -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2">
        {/* The component at the top of the modal window */}
        <div className="flex flex-col  relative h-[4rem] items-center justify-center bg-indigo-400 rounded-tl-xl rounded-tr-xl">
          <p className="text-2xl font-extrabold text-white">{"LEADERBOARD"}</p>
          <div className=" absolute bottom-0 left-0 w-full h-1 bg-game-pink "></div>
        </div>

        <div className="flex flex-col mt-3">
          <div className="text-xl font-bold text-white ">{title}</div>
          <h3 className="text-pink-500 mt-[-1rem] px-2">{mainPrompt}</h3>
        </div>

        {/* The button and its function on the window */}
        <div className="flex items-center justify-center py-[1rem] ">
          <button
            onClick={pageJump}
            className="flex items-center justify-center bg-game-pink border-white w-[7rem] text-white font-bold py-2 px-4 rounded-lg"
          >
            {buttonPrompt}
          </button>
        </div>
      </section>
    </div>
  );
}
