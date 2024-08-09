import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationLayout } from "./NavigationLayout";
import { useState } from "react";
import AppService from "./AppService";
import Index from "./Index/Index";
import Preview from "./Preview/Preview";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";


export default function App() {
	const [service] = useState(() => new AppService());

	return (
		<ScopedCssBaseline>
			<BrowserRouter basename="objectfoo-material-you/">
				<Routes>
					<Route path="/" element={<NavigationLayout />}>
						<Route index element={<Index service={service} />} />
						<Route path="/preview" element={<Preview service={service} />} />
					</Route>
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</BrowserRouter>
		</ScopedCssBaseline>
	);
}
