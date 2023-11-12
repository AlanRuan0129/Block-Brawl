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
      <section className="bg-white p-8 rounded shadow-lg text-center transform -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2">
        {/* The component at the top of the modal window */}
        <div className="text-purple-600">{title}</div>
        <h3 className="text-pink-500">
          {/* Main prompt message */}
          {mainPrompt}
        </h3>
        {/* The button and its function on the window */}
        <button
          onClick={pageJump}
          className="bg-purple-500 text-white font-bold py-2 px-4 rounded hover:bg-purple-700 transition duration-300 ease-in-out mt-4"
        >
          {buttonPrompt}
        </button>
      </section>
    </div>
  );
}
