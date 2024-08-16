import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { AppLoading } from "./AppLoading";
import IndexRoot from "../Index/Root";
import { FetchIndex } from "../Index";
import { AppError } from "./AppError";

const router = createBrowserRouter([
	{
		path: "/",
		errorElement: <AppError />,
		children: [
			{
				index: true,
				element: <IndexRoot />,
				loader: async({ request }) => await FetchIndex(request),
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
		<RouterProvider router={router} fallbackElement={<AppLoading />} />
	);
}
