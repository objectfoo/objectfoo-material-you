import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { IndexContext } from "../Index/Root";
import { ColorTones } from "./ColorTones";


export function TonalPalettes() {
	const { theme } = useContext(IndexContext);
	return (
		<Stack spacing={2}>
			<Typography gutterBottom variant="h6">Tonal Palettes</Typography>
			<Stack spacing={3}>
				<ColorTones label="Primary" palette={theme.palettes.primary} />
				<ColorTones label="Secondary" palette={theme.palettes.secondary} />
				<ColorTones label="Tertiary" palette={theme.palettes.tertiary} />
				<ColorTones label="Error" palette={theme.palettes.error} />
			</Stack>
		</Stack>
	);
}

