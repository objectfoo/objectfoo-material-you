import { createContext, forwardRef, useCallback, useDeferredValue, useMemo, useState } from "react";
import { ExampleSelector } from "../Example/ExampleSelector";
import { InputColorStatus } from "./InputColorStatus";
import { Outlet, useLoaderData } from "react-router-dom";
import { SchemeModeButton } from "./SchemeMode";
import ColorTools, { MaterialFoundationTheme } from "../ColorTools";
import Paper from "@mui/material/Paper";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import Stack from "@mui/material/Stack";
import type { IndexViewData } from "./FetchIndex";
import type { Theme } from "@mui/material";


export interface ColorState {
	hex: string;
	argb: number;
}

export type SchemeMode = "light" | "dark";

export interface TIndexContext {
	color: ColorState;
	theme: MaterialFoundationTheme;
	mode: SchemeMode;
	updateHex: (newHex: string) => void;
	toggleMode: () => void;
}


export const IndexContext = createContext<TIndexContext>({} as TIndexContext);


export default function Index(): JSX.Element {
	const { argb, hex } = useLoaderData() as Awaited<IndexViewData>;
	const [color, setColor] = useState<ColorState>({ hex, argb });
	const [mode, setMode] = useState<SchemeMode>("light");
	const lazyArgb = useDeferredValue(color.argb);

	const theme = useMemo(
		() => ColorTools.ThemeFromSourceColor(lazyArgb > 0 ? lazyArgb : argb),
		[lazyArgb, argb]
	);

	const updateHex = useCallback(
		(newHex: string) => {
			setColor((state) => ({
				...state,
				hex: newHex,
				argb: ColorTools.ArgbFromHex(newHex),
			}));
		},
		[setColor]
	);

	const toggleMode = useCallback(
		() => { setMode((state) => state === "dark" ? "light" : "dark"); },
		[setMode]
	);


	const ctx = useMemo<TIndexContext>(
		() => ({ color, theme, updateHex, mode, toggleMode: toggleMode }),
		[color, theme, updateHex, mode, toggleMode]
	);

	return (
		<IndexContext.Provider value={ctx}>
			<ScopedCssBaseline sx={RootStyles}>
				<div className="viewRoot">
					<Stack direction="row" spacing={4} useFlexGap>
						<FooCard>
							<InputColorStatus />
						</FooCard>
						<FooCard>
							<SchemeModeButton />
						</FooCard>
						<FooCard>
							<ExampleSelector />
						</FooCard>
					</Stack>
					<Outlet />
				</div>
			</ScopedCssBaseline>
		</IndexContext.Provider>
	);
}

const FooCard = forwardRef<HTMLDivElement | null, { children: React.ReactNode; }>((props, ref): JSX.Element => {
	return (
		<Paper variant="outlined" ref={ref} sx={{
			borderTopRightRadius: "12px",
			borderTopLeftRadius: "12px",
			borderBottomRightRadius: "4px",
			borderBottomLeftRadius: "4px",
			display: "inline-flex",
			flexDirection: "column",
			px: 3,
			pb: 2,
			pt: 1,
			gap: 1,
		}}>
			{props.children}
		</Paper>
	);
});


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
			// bgcolor: "background.paper",
			borderRadius: 1,
			mx: "auto",
			my: 2,
			p: 3,
			[theme.breakpoints.down(975)]: { my: 0 },
		},
	};
};
