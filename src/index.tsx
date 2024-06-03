import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import { Navbar } from "./components/Navbar";
import { TaskCreator } from "./components/TaskCreator";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
	<React.StrictMode>
		<Navbar />
		<TaskCreator />
	</React.StrictMode>
);