import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingMessage = "Loading...";

export function AppLoading(): JSX.Element {
	return (
		<Box sx={{
			minHeight: 500,
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
		}}>
			<Alert icon={<CircularProgress size="1.5rem" />} variant="outlined" severity="info" sx={{ minWidth: 250 }}>
				{LoadingMessage}
			</Alert>
		</Box>
	);
}
