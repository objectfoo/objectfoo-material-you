import { NavigationContext } from "../NavigationLayout";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import AppService from "../AppService";

export default function Preview(_: { service: AppService }) {
	const ctx = useOutletContext<NavigationContext>();
	useEffect(() => ctx.updateTitle("Preview"), [ctx]);

	return (
		<>
			<Typography>Preview</Typography>
		</>
	);
}
