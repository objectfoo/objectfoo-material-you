import { useCallback, useContext, useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ColorState, IndexContext } from "./IndexRoot";
import ColorTools from "../ColorTools";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, getContrastRatio } from "@mui/material";
import { ReadOnlyTextField } from "../Shared/ReadOnlyTextField";

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

export default function ColorSwatchInput(props: ColorSwatchInputProps) {
	const { size, hex, argb, onAccept } = props;
	const [open, setOpen] = useState(false);
	const openDialog = () => { setOpen(true); };
	const onDialogAccept = (value: string) => {
		setOpen(false);
		onAccept(value);
	};
	const onCancel = useCallback(() => { setOpen(false); }, []);
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
			<button aria-label="Select Color" onClick={openDialog}></button>
			<ColorPickerDialog {...{ onAccept: onDialogAccept, open, onCancel }} initialHex={hex} />
		</Box>
	);
}

interface ColorPickerDialogProps {
	initialHex: string;
	open: boolean;
	onAccept: (value: string) => void;
	onCancel: () => void;
}

function ColorPickerDialog(props: ColorPickerDialogProps) {
	const [hex, setHex] = useState(props.initialHex);
	const handleClose = (_: unknown, reason: "backdropClick" | "escapeKeyDown") => {
		if (reason !== "backdropClick") {
			props.onCancel();
		}
	};

	useEffect(() => {
		if (props.open === true) {
			setHex(props.initialHex);
		}
	}, [props.initialHex, props.open]);

	return (
		<Dialog maxWidth="sm" fullWidth open={props.open} onClose={handleClose}>
			<DialogTitle>Select Color</DialogTitle>
			<DialogContent>
				<Stack spacing={1} direction="row">
					<Stack spacing={1}>
						<Stack spacing={1} direction="row" sx={{ pt: 1 }}>
							<ReadOnlyTextField label="HEX" value={hex} />
							<ReadOnlyTextField label="ARGB" value={ColorTools.ArgbFromHex(hex)} />
						</Stack>
						<Stack spacing={1} direction="row" sx={{ pt: 1 }}>
							<ReadOnlyTextField label="Contrast w/Black" value={`${contrast(hex, "#000000")}:1`} />
							<ReadOnlyTextField label="Contrast w/White" value={`${contrast(hex, "#FFFFFF")}:1`} />
						</Stack>
					</Stack>
					<input
						className="colorInput"
						type="color"
						value={hex}
						style={{ height: "56px", width: "100%" }}
						onChange={(e) => { setHex(e.target.value); }}
						onInput={(e) => { setHex(e.currentTarget.value); }} />

				</Stack>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.onCancel}>Cancel</Button>
				<Button onClick={() => props.onAccept(hex)}>Accept</Button>
			</DialogActions>
		</Dialog>
	);
}

function contrast(foreground: string, background: string) {
	const raw = getContrastRatio(foreground, background);
	if (typeof raw === "number") {
		return parseFloat(raw.toFixed(2));
	}
	return 0;
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
