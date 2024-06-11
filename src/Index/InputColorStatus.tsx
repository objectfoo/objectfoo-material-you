import { Link as RouterLink } from "react-router-dom";
import { ReadOnlyTextField } from "../CommonComponents/ReadOnlyTextField";
import { useCallback } from "react";
import { useObservable } from "@residualeffect/rereactor";
import AppService from "../AppService";
import Button from "@mui/material/Button";
import ColorSwatchInput from "../CommonComponents/ColorSwatchInput";
import PreviewIcon from "@mui/icons-material/Preview";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export function InputColorStatus(props: { service: AppService; currentArgb: number; }) {
	const { service } = props;
	const hex = useObservable(props.service.CurrentHex);
	const onAccept = useCallback((newColor: string) => {service.LoadHexColor(newColor)}, [service]);

	return (
		<Stack direction="row" spacing={2}>

			<Stack className="color-detail" spacing={2}>
				<Stack spacing={1} direction="row" alignItems="center">
					<Typography fontWeight="normal" variant="h6">Color</Typography>
					<Button
						size="small"
						component={RouterLink}
						to={"/Preview"}
						sx={{ borderRadius: "4px", p: 1, minWidth: "unset" }}
						color="inherit"
						aria-label="Preview">
						<PreviewIcon />
					</Button>
				</Stack>
				<Stack spacing={3} direction="row">
					<ColorSwatchInput hex={hex} onAccept={onAccept} />
					<ReadOnlyTextField label="HEX" value={hex} />
					<ReadOnlyTextField label="ARGB" value={props.currentArgb} />
				</Stack>
			</Stack>

		</Stack>
	);
}
