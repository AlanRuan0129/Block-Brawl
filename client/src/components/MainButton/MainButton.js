export function MainButton(props) {
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={props.handleClick}
        className="px-5 py-3 text-lg bg-game-pink font-semibold text-[1.5rem] text-white hover:bg-pink-400 focus:outline-none rounded-[0.5rem]"
      >
        {props.text}
      </button>
      {/* <div className="px-6 py-3 mt-2 text-xl font-semibold">{props.text}</div> */}
    </div>
  );
}
