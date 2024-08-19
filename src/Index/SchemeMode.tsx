import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { IndexContext, type TIndexContext } from "./IndexRoot";
import { ColorScheme } from "../ColorScheme/ColorScheme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

export function SchemeModeButton(): JSX.Element {
	const ctx = useContext<TIndexContext>(IndexContext);

	return (
		<>
			<Stack spacing={1} direction="row" alignItems="center" useFlexGap>
				<Typography fontWeight="normal" variant="h6">Scheme Mode</Typography>
			</Stack>
			<Stack display="flex" alignItems="center" justifyContent="center" flexGrow={1} useFlexGap>
				<Button variant="contained" color="primary" sx={{ flexDirection: "row", gap: 1 }} onClick={() => { ctx.toggleMode(); }} disableElevation>
					{ctx.mode === "dark" ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
					<Typography component="span" variant="body2">{ctx.mode}</Typography>
				</Button>
			</Stack>
		</>
	);
}

export function SelectedTheme(): JSX.Element {
	const { mode, theme } = useContext(IndexContext);
	return (
		<Stack mt={3}>
			<ColorScheme mode={mode} theme={theme} />
		</Stack>
	);
}
