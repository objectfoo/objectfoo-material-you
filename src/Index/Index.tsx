import { InputColorStatus } from "./InputColorStatus";
import { NavigationContext } from "../NavigationLayout";
import { Theme as MCTTheme } from "@material/material-color-utilities";
import { TonalPalettes } from "./TonalPalettes";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { useObservable } from "@residualeffect/rereactor";
import { useOutletContext } from "react-router-dom";
import AppService from "../AppService";
import ColorScheme from "../ColorScheme/ColorScheme";
import ColorTools from "../ColorTools";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import TabPanel from "../CommonComponents/TabPanel.";
import Tabs from "@mui/material/Tabs";
import type { PaletteMode } from "@mui/material";


const CalculateTheme = (argb: number) => ColorTools.ThemeFromSourceColor(argb);

export default function Index({ service }: { service: AppService }) {
	const ctx = useOutletContext<NavigationContext>();
	const currentArgb = useObservable(service.CurrentArgb);
	const currentArgbDeferred = useDeferredValue(currentArgb);
	const theme = useMemo(() => CalculateTheme(currentArgbDeferred), [currentArgbDeferred]);

	useEffect(() => ctx.updateTitle(), [ctx]);
	useEffect(() => { service.LoadHexColor("#3557FF"); }, [service]);

	return (
		<>
			{theme.source !== 0 && (
				<>
					<InputColorStatus currentArgb={currentArgb} service={service} />
					<ColorSchemeTabs materialToolsTheme={theme}/>
					<TonalPalettes theme={theme} />
				</>
			)}
		</>
	);
}


function ColorSchemeTabs({ materialToolsTheme }: { materialToolsTheme: MCTTheme; }) {
	const [current, setCurrent] = useState<PaletteMode>("light");
	const onChange = (_: unknown, newValue: PaletteMode): void => setCurrent(newValue);

	return (
		<Stack spacing={2} sx={{ mt: 3 }}>
			<Tabs sx={{ borderBottom: 1, borderColor: "divider" }} value={current} onChange={onChange} aria-label="Light or Dark color scheme">
				<Tab id="colorSchemeTab-light" aria-controls="colorSchemePanel-light" value="light" icon={<LightModeIcon />} label="Light" />
				<Tab id="colorSchemeTab-dark" aria-controls="colorSchemePanel-dark" value="dark" icon={<DarkModeIcon />} label="Dark" />
			</Tabs>
			<TabPanel identifier="colorSchemePanel" aria-labelledby="colorSchemeTab-light" current={current} value="light">
				{(current === "light") && <ColorScheme mode="light" theme={materialToolsTheme} />}
			</TabPanel>
			<TabPanel identifier="colorSchemePanel" current={current} value="dark" aria-labelledby="colorSchemeTab-dark">
				{(current === "dark") && <ColorScheme mode="dark" theme={materialToolsTheme} />}
			</TabPanel>
		</Stack>
	);
}
