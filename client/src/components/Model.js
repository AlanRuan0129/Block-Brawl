// export function Modal({ show, pageJump, mainPrompt, buttonPrompt, title }) {
//   const showHideClassName = show ? "fixed inset-0 z-50" : "hidden";

//   return (
//     <div
//       className={`${showHideClassName} bg-black bg-opacity-80 flex items-center justify-center`}
//     >
//       <section className="bg-white p-6 rounded shadow-lg">
//         <div className="text-center">
//           {/* The component at the top of the modal window */}
//           <div className="font-bold text-lg mb-4">{title}</div>
//           {/* Main prompt message */}
//           <h3 className="mb-4">{mainPrompt}</h3>
//           {/* The button and its function on the window */}
//           <button
//             onClick={pageJump}
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           >
//             {buttonPrompt}
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// }
export function Modal({ show, pageJump, mainPrompt, buttonPrompt, title }) {
  const showHideClassName = show ? "fixed inset-0 z-50" : "hidden";
  return (
    <div
      className={
        showHideClassName +
        " bg-black bg-opacity-80 flex items-center justify-center"
      }
    >
      <section className="bg-white p-8 rounded-lg shadow-lg text-center transform -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2">
        {/* The component at the top of the modal window */}
        <div className="text-3xl text-custom-pink mb-5 ">{title}</div>
        <div className="border border-power-off border-[0.17rem]"></div>
        <h3 className="text-pink-500 mt-[-1rem]">
          {/* Main prompt message */}
          {mainPrompt}
        </h3>
        {/* The button and its function on the window */}
        <button
          onClick={pageJump}
          className="bg-game-pink text-white font-bold py-2 px-4 rounded-lg"
        >
          {buttonPrompt}
        </button>
      </section>
    </div>
  );
}
