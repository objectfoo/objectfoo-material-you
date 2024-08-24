import { useCallback, useContext } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ColorState, IndexContext } from "./IndexRoot";
import { ColorTools } from "../ColorTools";

export function InputColorStatus() {
	const { color, updateHex } = useContext(IndexContext);
	const onAccept = useCallback((newColor: string) => { updateHex(newColor); }, [updateHex]);

	return (
		<Stack className="color-detail" spacing={2} useFlexGap>
			<Stack spacing={1} direction="row" alignItems="center" useFlexGap>
				<Typography fontWeight="normal" variant="h6">Seed Color</Typography>
			</Stack>

			<Stack spacing={2} direction="row" alignItems="center">
				<ColorSwatchInput hex={color.hex} onAccept={onAccept} />
				<InputColorValues color={color} />
			</Stack>
		</Stack>
	);
}


interface ColorSwatchInputProps {
	onAccept: (value: string) => void;
	hex: string;
	argb?: number;
	size?: "small" | "medium" | "large"
}

const pxForSize = (size?: "small" | "medium" | "large"): string | undefined => {
	const sizes = { small: "32px", medium: "48px", large: "56px" };
	return size === undefined ? sizes.medium : sizes[size];
};

function ColorSwatchInput(props: ColorSwatchInputProps) {
	const { size, hex, argb, onAccept } = props;
	const dimension = pxForSize(size);
	const color = (argb !== undefined) ? ColorTools.HexFromArgb(argb) : hex;
	return (
		<Box className="swatchColorInputContainer" sx={(t) => ({
			borderRadius: "3px",
			backgroundColor: t.palette.grey[200],
			outline: `1px solid ${t.palette.grey[500]}`,
			border: "0",
			display: "flex",
			alignItems: "stretch",
			justifyContent: "stretch",
			"&:hover": { boxShadow: t.shadows[2] },
			// funky focus ring style selectors to match native cross browser
			"&:focus-within": { outline: "5px auto Highlight" },
			"&.swatchColorInputContainer:focus-within": { outline: "5px auto -webkit-focus-ring-color" },
			"& button": {
				outline: 0,
				appearance: "none",
				margin: "4px",
				padding: 0,
				width: dimension,
				height: dimension,
				backgroundColor: color,
				flexGrow: 1,
				border: "1px solid #e5e5e5",
				borderRadius: "3px",
			},
		})}>
			<input
				className="colorInput"
				type="color"
				value={hex}
				style={{ height: "56px", width: "56px" }}
				onChange={(e) => { onAccept(e.target.value); }}
				onInput={(e) => { onAccept(e.currentTarget.value); }}
			/>
		</Box>
	);
}

const Caption = ({ children, alignRight }: { children: React.ReactNode; alignRight?: boolean; }): JSX.Element => (
	<Typography variant="caption" textAlign={alignRight === true ? "right" : undefined}>{children}</Typography>
);

function InputColorValues({ color }: { color: ColorState }): JSX.Element {
	return (
		<>
			<Stack direction="row" gap={1}>
				<Stack direction="column">
					<Caption>HEX</Caption>
					<Caption>ARGB</Caption>
				</Stack>
				<Stack direction="column">
					<Caption alignRight>{color.hex}</Caption>
					<Caption alignRight>{color.argb}</Caption>
				</Stack>
			</Stack>
		</>
	);
}
