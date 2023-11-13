import { ColorSwatch, CheckIcon } from "@mantine/core";

export function HostSelect(props) {
  

  const swatches = props.colorStrings.slice(4)?.map((color, index) => (
    
    <div className="w-1/10 p-6" key={`avatar-${index}`}>
      <div className="w-40 h-40 flex bg-pic-blue rounded-full justify-center items-center overflow-hidden">
        <img
          src={process.env.PUBLIC_URL + `/assets/avatar${index + 5}.png`}
          alt={`Avatar ${index + 5}`}
          className="object-cover "
        />
      </div>
      
      <div className="flex justify-center items-center">
        <ColorSwatch
          color={color}
          size={32}
          component="button"
          disabled={props.colorStatus[index+4] || props.isReady}
          radius="lg"
          onClick={() => {
            const indexAsNumber = parseInt(index, 10);
            const newIndex = indexAsNumber + 4;
            console.log(typeof(index+4));
            props.handleClick(newIndex);
          }}
          style={{ color: "#000000", marginTop: "1rem" }}
        >
          {index+4 === props.colorChecked &&
            !props.colorStatus[index+4] &&
            !props.isReady && (
              <CheckIcon style={{ width: "1.5rem", height: "1.5rem" }} />
            )}
        </ColorSwatch>
      </div>
    </div>
  ));

  return <div className="flex flex-wrap justify-center">{swatches}</div>;
}
