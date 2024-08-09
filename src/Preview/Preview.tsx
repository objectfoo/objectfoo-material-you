import { NavigationContext } from "../NavigationLayout";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import AppService from "../AppService";

export default function Preview(_: { service: AppService }) {
	const ctx = useOutletContext<NavigationContext>();
	useEffect(() => ctx.updateTitle("Preview"), [ctx]);

	return (
		<>
			<Typography>Preview</Typography>
			<Box sx={{ minHeight: 1500 }}></Box>
		</>
	);
}
