import { ColorTones } from "../CommonComponents/ColorTones";
import { NavigationContext } from "../NavigationLayout";
import { ReadOnlyTextField } from "../CommonComponents/ReadOnlyTextField";
import { Theme as MCTTheme } from "@material/material-color-utilities";
import { useCallback, useDeferredValue, useEffect, useMemo, useState } from "react";
import { useObservable } from "@residualeffect/rereactor";
import { useOutletContext, Link as RouterLink } from "react-router-dom";
import AppService from "../AppService";
import ColorScheme from "../ColorScheme/ColorScheme";
import ColorSwatchInput from "../CommonComponents/ColorSwatchInput";
import ColorTools from "../ColorTools";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import PreviewIcon from "@mui/icons-material/Preview";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import TabPanel from "../CommonComponents/TabPanel.";
import Tabs from "@mui/material/Tabs";
import type { PaletteMode } from "@mui/material";
import Typography from "@mui/material/Typography";


const CalculateTheme = (argb: number) => ColorTools.ThemeFromSourceColor(argb);

export default function Index({ service }: { service: AppService}) {
	const ctx = useOutletContext<NavigationContext>();
	const currentArgb = useObservable(service.CurrentArgb);
	const currentArgbDeferred = useDeferredValue(currentArgb);
	const theme =  useMemo(() => CalculateTheme(currentArgbDeferred), [currentArgbDeferred]);

	useEffect(() => ctx.updateTitle(),[ctx]);
	useEffect(() => { service.LoadHexColor("#3557FF") }, [service]);

	return (
		<>
			<InputColorStatus currentArgb={currentArgb} service={service} />
			<ColorSchemeTabs materialToolsTheme={theme}/>
			<TonalPalettes theme={theme} />
		</>
	);
}


function InputColorStatus(props: { service: AppService; currentArgb: number; }) {
	const { service } = props;
	const hex = useObservable(props.service.CurrentHex);
	const onAccept = useCallback((newColor: string) => {service.LoadHexColor(newColor)}, [service]);

	return (
		<Stack spacing={2}>
			<Stack spacing={1} direction="row" alignItems="center">
				<Typography variant="h6">Input Color</Typography>
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
	);
}


function TonalPalettes(props: {theme: MCTTheme; }) {
	return (
		<Stack spacing={2}>
			<Typography gutterBottom variant="h6">Tonal Palettes</Typography>
			<Stack spacing={3}>
				<ColorTones label="Primary" palette={props.theme.palettes.primary} />
				<ColorTones label="Secondary" palette={props.theme.palettes.secondary} />
				<ColorTones label="Tertiary" palette={props.theme.palettes.tertiary} />
				<ColorTones label="Error" palette={props.theme.palettes.error} />
			</Stack>
		</Stack>
	);
}


function ColorSchemeTabs({ materialToolsTheme }: { materialToolsTheme: MCTTheme; }) {
	const [current, setCurrent] = useState<PaletteMode>("light");
	const onChange = (_: unknown, newValue: PaletteMode): void => setCurrent(newValue);

	return (
		<Stack spacing={1}>
			<Tabs sx={{ borderBottom: 1, borderColor: "divider" }} value={current} onChange={onChange} aria-label="Light or Dark color scheme">
				<Tab id="colorSchemeTab-light" aria-controls="colorSchemePanel-light" value="light" icon={<LightModeIcon />} label="Light" />
				<Tab id="colorSchemeTab-dark" aria-controls="colorSchemePanel-dark" value="dark" icon={<DarkModeIcon />} label="Dark" />
			</Tabs>
			<TabPanel identifier="colorSchemePanel" aria-labelledby="colorSchemeTab-light" current={current} value="light">
				{(current === "light") && <ColorScheme mode="light" theme={materialToolsTheme} />}
			</TabPanel>
			<TabPanel identifier="colorSchemePanel" current={current} value="dark" aria-labelledby="colorSchemeTab-dark">
				{(current === "dark") && <ColorScheme mode="dark"  theme={materialToolsTheme} />}
			</TabPanel>
		</Stack>
	);
}
