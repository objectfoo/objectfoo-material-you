import { useContext, useMemo, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { PreviewThemeProvider } from "./PreviewThemeProvider";
import { SchemeContext } from "../App/App";

export interface PreviewOutletContext {
	color: string | null;
	setColor: React.Dispatch<React.SetStateAction<string>>;
}

type PreviewParams = {
	hex?: string;
};

export function Preview() {
	const x = useContext(SchemeContext);
	console.log(x);
	const [color, setColor] = useState(hex);
	const ctx = useMemo(() => ({ color, setColor }), [color, setColor]);

	return (
		<PreviewThemeProvider color={color}>
			<Outlet context={ctx} />
		</PreviewThemeProvider>
	);
}
