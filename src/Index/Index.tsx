import { InputColorStatus } from "./InputColorStatus";
import { Theme as MCTTheme } from "@material/material-color-utilities";
import { TonalPalettes } from "./TonalPalettes";
import { createContext, useCallback, useContext, useDeferredValue, useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import ColorScheme from "../ColorScheme/ColorScheme";
import ColorTools from "../ColorTools";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Stack from "@mui/material/Stack";
import Tab from "@mui/material/Tab";
import TabPanel from "./TabPanel.";
import Tabs from "@mui/material/Tabs";
import type { PaletteMode } from "@mui/material";
import Box from "@mui/material/Box";


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

export default function Index(): JSX.Element {
	const ctx = useIndex();
	return (
		<IndexContext.Provider value={ctx}>
			<Box sx={{}}>
				<InputColorStatus />
				<ColorSchemeTabs />
				<TonalPalettes />
			</Box>
		</IndexContext.Provider>
	);
}


function useIndex(): { color: ColorState; theme: MCTTheme; updateHex: (newHex: string) => void; } {
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

	return useMemo(
		() => ({ color, theme, updateHex }),
		[color, theme, updateHex]
	);
}

function ColorSchemeTabs() {
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

const defaultColor = "#3557FF";

async function TransformInitialData(hexColor: string): Promise<{ hex: string; argb: number; }> {
	return {
		hex: hexColor,
		argb: ColorTools.ArgbFromHex(hexColor),
	};
};

async function FetchInitialColor() {
	await new Promise((r) => setTimeout(r, 300));
	return defaultColor;
}

type IndexViewData = ReturnType<typeof TransformInitialData>;

export async function FetchIndex(): Promise<IndexViewData> {
	let initialHex;
	try {
		initialHex = await FetchInitialColor();
	} catch {
		initialHex = defaultColor;
	}

	return await TransformInitialData(initialHex);
}

