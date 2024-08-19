import "./index.css";
import AppRoot from "./App/AppRoot";
import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyles from "@mui/material/GlobalStyles";


ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<GlobalStyles styles={{ body: { overflowY: "scroll" } }} />
		<AppRoot />
	</React.StrictMode>
);
