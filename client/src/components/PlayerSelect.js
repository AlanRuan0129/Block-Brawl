import { ColorSwatch, CheckIcon, rem } from "@mantine/core";

export function PlayerSelect(props) {
  const swatches = props.colorStrings?.map((color, index) => {
    return (
      <ColorSwatch
        key={index}
        color={color}
        size={32}
        component="button"
        disabled={!props.colorStatus[index] && !props.isReady ? false : true}
        radius="md"
        onClick={() => props.handleClick(index)}
        style={{ color: "#000000" }}
      >
        {index === props.colorChecked &&
          !(props.colorStatus[index] && !props.isReady) && (
            <CheckIcon style={{ width: rem(12), height: rem(12) }} />
          )}
      </ColorSwatch>
    );
  });

  return <div>{swatches}</div>;
}
