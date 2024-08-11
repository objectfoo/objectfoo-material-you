import Typography from "@mui/material/Typography";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";


export function AppError(): JSX.Element {
	const error = useRouteError();


	return (
		<>
			<Typography variant="h5" component="p">Sorry...</Typography>
			<Typography>{MessageForError(error)}</Typography>
		</>
	);
}


function MessageForError(x: unknown): string {
	let errorMessage;
	if (isRouteErrorResponse(x)) {
		errorMessage = x.statusText;
	} else if (x instanceof Error) {
		errorMessage = x.message;
	} else if (typeof x === "string") {
		errorMessage = x;
	} else if (Array.isArray(x) && typeof x[0] === "string") {
		errorMessage = x[0];
	} else {
		errorMessage = "Unknown Error";
		// eslint-disable-next-line no-console
		console.log(errorMessage);
	}
	return errorMessage;
}
