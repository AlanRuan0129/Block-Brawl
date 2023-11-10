// Customized Modal window with wanted components as parameters
import "./Modal.css";
export function Modal({ show, pageJump, mainPrompt, buttonPrompt, title }) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className="">
          <div>
            <div className="text-center ">
              {/* The component at the top of the modal window */}
              {title}
              <h3>
                {/* Main prompt message */}
                {mainPrompt}
              </h3>
              {/* The button and its function on the window */}
              <button onClick={pageJump}>{buttonPrompt}</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
