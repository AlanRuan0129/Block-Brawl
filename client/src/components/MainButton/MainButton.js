export function MainButton(props) {
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={props.handleClick}
        className="absolute z-40 px-6 py-3 text-xl bg-game-pink font-semibold text-white rounded-lg shadow-inner active:mt-2"
      >
        {props.text}
      </button>
      {/* <div className="px-6 py-3 mt-2 text-xl font-semibold">{props.text}</div> */}
    </div>
  );
}
