import { Link as RouterLink } from "react-router-dom";
import { ReadOnlyTextField } from "../CommonComponents/ReadOnlyTextField";
import { useCallback, useContext } from "react";
import Button from "@mui/material/Button";
import ColorSwatchInput from "../CommonComponents/ColorSwatchInput";
import PreviewIcon from "@mui/icons-material/Preview";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ColorTools from "../ColorTools";
import { IndexContext } from "./Index";

export function InputColorStatus() {
	const { color, updateHex } = useContext(IndexContext);
	const onAccept = useCallback((newColor: string) => { updateHex(newColor); }, [updateHex]);
	const hex = ColorTools.HexForUrl(color.hex, "#ccc");

	return (
		<Stack direction="row" spacing={2}>
			<Stack className="color-detail" spacing={2}>
				<Stack spacing={1} direction="row" alignItems="center">
					<Typography fontWeight="normal" variant="h6">Color</Typography>
					<Button
						size="small"
						component={RouterLink}
						to={`/${hex}/example`}
						sx={{ borderRadius: "4px", p: 1, minWidth: "unset" }}
						color="inherit"
						aria-label="Preview">
						<PreviewIcon />
					</Button>
				</Stack>
				<Stack spacing={3} direction="row">
					<ColorSwatchInput hex={color.hex} onAccept={onAccept} />
					<ReadOnlyTextField label="HEX" value={color.hex} />
					<ReadOnlyTextField label="ARGB" value={color.argb} />
				</Stack>
			</Stack>
		</Stack>
	);
}
