import { LabelledColor } from "./LabelledColor";
import Box from "@mui/material/Box";
import { ColorTools, type ViewColor } from "../ColorTools";
import type { Theme } from "@mui/material";


interface ColorOnColorProps {
	gridArea: string;
	color: ViewColor;
	onColor: ViewColor;
}

export function ColorOnColor(props: ColorOnColorProps) {
	return (
		<Box
			className="colorOnColor"
			style={ColorTools.InlineColorVars(props.color.color, props.onColor.color)}
			sx={(_: Theme) => ({
				gridArea: props.gridArea,
				borderRadius: "3px",
				display: "grid",
				gridTemplateColumns: "auto",
				gridTemplateRows: "2fr 1fr",
				border: `1px solid ${_.palette.divider}`,
			})}>
			<LabelledColor variant="top" color={props.color} onColor={props.onColor} />
			<LabelledColor variant="bottom" color={props.onColor} onColor={props.color} />
		</Box>
	);
}
