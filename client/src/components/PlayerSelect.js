import { ColorSwatch, CheckIcon } from "@mantine/core";

export function PlayerSelect(props) {
  const swatches = props.colorStrings.slice(0, 4)?.map((color, index) => (
    <div className="w-1/4 p-2" key={`avatar-${index}`}>
      <div className="w-40 h-40 flex justify-center items-center overflow-hidden">
        <img
          src={process.env.PUBLIC_URL + `/assets/avatar${index + 1}.png`}
          alt={`Avatar ${index + 1}`}
          className="w-full h-full object-cover bg-pic-blue rounded-full"
        />
      </div>

      <div className="flex justify-center items-center">
        <ColorSwatch
          color={color}
          size={32}
          component="button"
          disabled={props.colorStatus[index] || props.isReady}
          radius="lg"
          onClick={() => props.handleClick(index)}
          style={{ color: "#000000", marginTop: "1rem" }}
        >
          {index === props.colorChecked &&
            !props.colorStatus[index] &&
            !props.isReady && (
              <CheckIcon style={{ width: "1.5rem", height: "1.5rem" }} />
            )}
        </ColorSwatch>
      </div>
    </div>
  ));

  return <div className="flex flex-wrap justify-center">{swatches}</div>;
}
