import Box from "@mui/material/Box";
import { useMemo, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

export interface PreviewOutletContext {
	color: string | null;
	setColor: React.Dispatch<React.SetStateAction<string>>;
}

type PreviewParams = {
	hex?: null | string;
};

export function Preview() {
	const { hex } = useParams() satisfies PreviewParams;
	const [color, setColor] = useState(hex);
	const ctx = useMemo(() => ({ color, setColor }), [color, setColor]);

	return (
		<Box>
			<Outlet context={ctx} />
		</Box>
	);
}
