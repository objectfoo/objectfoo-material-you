import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { AppLoading } from "./AppLoading";
import Index, { FetchIndex } from "../Index/Index";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
import { AppError } from "./AppError";
import { Preview } from "../Preview/Preview";
import { ExampleFactory } from "../Preview/ExampleFactory";
import { createContext, useMemo, useState } from "react";

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
				path: "/example",
				element: <Preview />,
				children: [
					{
						index: true,
						element: <ExampleFactory />,
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


interface ColorContext {
	color: string;
	setColor: React.Dispatch<React.SetStateAction<string>>;
}

export const SchemeContext = createContext({} as ColorContext);

export default function App() {
	const [schemeColor, setSchemeColor] = useState("#3557FF");
	const schemeContext = useMemo(() => ({ color: schemeColor, setColor: setSchemeColor }), [schemeColor]);

	return (
		<SchemeContext.Provider value={schemeContext}>
			<ScopedCssBaseline sx={{ bgcolor: "grey.100", minHeight: "100vh", overflow: "auto" }}>
				<RouterProvider router={router} fallbackElement={<AppLoading />} />
			</ScopedCssBaseline>
		</SchemeContext.Provider>
	);
}
