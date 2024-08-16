import { InputColorStatus } from "../Shared/InputColorStatus";
import { Theme as MCTTheme } from "@material/material-color-utilities";
import { createContext, useCallback, useContext, useDeferredValue, useMemo, useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import ColorScheme from "../ColorScheme/ColorScheme";
import ColorTools from "../ColorTools";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import TabPanel from "../Shared/TabPanel";
import Tabs from "@mui/material/Tabs";
import type { PaletteMode, Theme } from "@mui/material";
import type { IndexViewData } from "./FetchIndex";


export interface TReactIndex {
	color: ColorState;
	theme: MCTTheme;
	updateHex: (newHex: string) => void;
}

export const IndexContext = createContext<TReactIndex>({} as TReactIndex);

export interface ColorState {
	hex: string;
	argb: number;
}

export default function Root(): JSX.Element {
	const { argb, hex } = useLoaderData() as Awaited<IndexViewData>;
	const [color, setColor] = useState<ColorState>({ hex, argb });
	const lazyArgb = useDeferredValue(color.argb);

	const theme = useMemo(
		() => ColorTools.ThemeFromSourceColor(lazyArgb > 0 ? lazyArgb : argb),
		[lazyArgb, argb]
	);

	const updateHex = useCallback(
		(newHex: string) => { setColor((state) => ({ ...state, hex: newHex, argb: ColorTools.ArgbFromHex(newHex) })); },
		[setColor]
	);

	const ctx = useMemo(
		() => ({ color, theme, updateHex }),
		[color, theme, updateHex]
	);

	return (
		<IndexContext.Provider value={ctx}>
			<ScopedCssBaseline sx={RootStyles}>
				<div className="viewRoot">
					<InputColorStatus />
					<Outlet />
				</div>
			</ScopedCssBaseline>
		</IndexContext.Provider>
	);
}

const RootStyles = (theme: Theme) => {
	return {
		bgcolor: "grey.100",
		display: "flow-root",
		minHeight: "100vh",
		px: 2,
		[theme.breakpoints.down(975)]: { px: 0 },
		"& .viewRoot": {
			maxWidth: 1200,
			minWidth: 950 - 48 - 2, // 48 padding 2 border width
			bgcolor: "background.paper",
			borderRadius: 1,
			mx: "auto",
			my: 2,
			p: 3,
			[theme.breakpoints.down(975)]: { my: 0 },
		},
	};
};


export function ColorSchemeTabs() {
	const { theme } = useContext(IndexContext);
	const [current, setCurrent] = useState<PaletteMode>("light");
	const onChange = (_: unknown, newValue: PaletteMode): void => setCurrent(newValue);

	return (
		<Stack spacing={2} sx={{ mt: 3 }}>
			<Tabs sx={{ borderBottom: 1, borderColor: "divider" }} value={current} onChange={onChange} aria-label="Light or Dark color scheme">
				<Tab id="colorSchemeTab-light" aria-controls="colorSchemePanel-light" value="light" icon={<LightModeIcon />} label="Light" />
				<Tab id="colorSchemeTab-dark" aria-controls="colorSchemePanel-dark" value="dark" icon={<DarkModeIcon />} label="Dark" />
			</Tabs>
			<TabPanel identifier="colorSchemePanel" aria-labelledby="colorSchemeTab-light" current={current} value="light">
				{(current === "light") && <ColorScheme mode="light" theme={theme} />}
			</TabPanel>
			<TabPanel identifier="colorSchemePanel" current={current} value="dark" aria-labelledby="colorSchemeTab-dark">
				{(current === "dark") && <ColorScheme mode="dark" theme={theme} />}
			</TabPanel>
		</Stack>
	);
}
