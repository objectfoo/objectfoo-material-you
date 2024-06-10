import Box from "@mui/material/Box";
import ColorTools, { ViewColor } from "../ColorTools";
import Typography from "@mui/material/Typography";


interface LabelledColorProps {
	color: ViewColor;
	onColor?: ViewColor;
	gridArea?: string,
	variant?: "top"|"bottom"|"solo"|"none",
}

const InlineColorVars = (color: number, onColor: number) => {
	return {
		"--mu-main-color": ColorTools.HexFromArgb(color),
		"--mu-alternate-color": ColorTools.HexFromArgb(onColor),
	} as React.CSSProperties;
};

export function LabelledColor(props: LabelledColorProps) {
	// if onColor is not defined create one with sufficient contrast
	const onColor = props.onColor?.color ?? ColorTools.GetContrastTextArgb(props.color.color);
	return (
		<Box
			style={InlineColorVars(props.color.color, onColor)}
			className="labelledColor"
			sx={(_) => ({
				display: "flex",
				gridArea: props.gridArea,
				color: "var(--mu-alternate-color)",
				backgroundColor: "var(--mu-main-color)",
				gap: 1,
				px: 1,
				py: .5,
				...(props.variant === "solo" && {
					borderRadius: "3px",
					border: `1px solid ${_.palette.divider}`,
				}),
				...(props.variant === "top" && {
					borderTopLeftRadius: "3px",
					borderTopRightRadius: "3px",
					borderBottom: `1px solid ${_.palette.divider}`,
				}),
				...(props.variant === "bottom" && {
					borderBottomLeftRadius: "3px",
					borderBottomRightRadius: "3px",
					alignItems: "flex-end",
				}),
				"& .colorName": {
					flexGrow: 1,
				},
				"& .paletteId": {
					pt: "4px",
					flex: "none",
				},
			})}>
			<Typography variant={props.variant === "bottom" ? "caption" : "body1"} className="colorName">{props.color.colorName ?? "Color"}</Typography>
			<Typography variant="caption" className="paletteId">{props.color.paletteId ?? ""}</Typography>
		</Box>
	);
}

