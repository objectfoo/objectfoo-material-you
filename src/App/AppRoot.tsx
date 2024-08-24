import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { AppLoading } from "./AppLoading";
import { AppError } from "./AppError";
import { IndexRoot } from "../Index/IndexRoot";
import { FetchIndex } from "../Index/FetchIndex";
import { ExampleIndex } from "../Example/ExampleIndex";


function NavigateToRoot(): JSX.Element {
	return <Navigate to="example" replace />;
}


const router = createBrowserRouter([
	{
		path: "/",
		errorElement: <AppError />,
		element: <IndexRoot />,
		loader: async({ request }) => await FetchIndex(request),
		children: [
			{
				index: true,
				element: <NavigateToRoot />,
			},
			{
				path: "example/:layout?",
				element: <ExampleIndex />,
			},
			{
				path: "*",
				element: <NavigateToRoot />,
			},
		],
	},
], { basename: "/objectfoo-material-you" });


export function AppRoot() {
	return <RouterProvider router={router} fallbackElement={<AppLoading />} />;
}
