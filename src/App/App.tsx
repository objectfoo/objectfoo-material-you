import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { AppLoading } from "./AppLoading";
import Index, { FetchIndex } from "../Index/Index";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import { AppError } from "./AppError";
import { Preview } from "../Preview/Preview";
import { Example } from "../Preview/Example";

const router = createBrowserRouter([
	{
		path: "/",
		errorElement: <AppError />,
		children: [
			{
				index: true,
				element: <Index />,
				loader: FetchIndex,
			},
			{
				path: "example/:hex",
				element: <Preview />,
				children: [
					{
						index: true,
						element: <Example />,
					},
				],
			},
			{
				path: "*",
				element: <Navigate to="/" replace />,
			},
		],
	},
], { basename: "/objectfoo-material-you" });


export default function App() {
	return (
		<ScopedCssBaseline sx={{ bgcolor: "grey.100", minHeight: "100vh", overflow: "auto" }}>
			<RouterProvider router={router} fallbackElement={<AppLoading />} />
		</ScopedCssBaseline>
	);
}
