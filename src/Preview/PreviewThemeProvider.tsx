import { Theme } from "@emotion/react";
import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material";
import { useMemo } from "react";

// TODO: validate hexColor and add a #
const createOptions = (hexColor?: string): ThemeOptions => ({
	palette: {
		...(hexColor !== undefined && { primary: { main: `#${hexColor}` } }),
		contrastThreshold: 4.5,
	},
});

export function PreviewThemeProvider(props: { children: React.ReactNode; color?: string; }): JSX.Element {
	const theme = useMemo<Theme>(() => createTheme(createOptions(props.color)), [props.color]);
	return (
		<ThemeProvider theme={theme}>
			{props.children}
		</ThemeProvider>

	);
}
