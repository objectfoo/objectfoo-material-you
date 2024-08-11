import "./index.css";
import App from "./App/App";
import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyles from "@mui/material/GlobalStyles";


ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<GlobalStyles styles={{ body: { overflowY: "scroll" } }} />
		<App />
	</React.StrictMode>
);
