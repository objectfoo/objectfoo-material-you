import { PaletteMode } from "@mui/material";


interface TabPanelProps {
	current: PaletteMode;
	value: PaletteMode;
	children: React.ReactNode;
	identifier: string;
}

export default function TabPanel(props: TabPanelProps) {
	return (
		<div
			role="tabpanel"
			hidden={props.current !== props.value}
			id={`${props.identifier}-${props.value}`}
			aria-labelledby={`colorSchemeTab-${props.value}`}>{props.children}</div>
	);
}
