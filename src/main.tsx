// Main application entry point
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

// Render the React application
createRoot(document.getElementById("root")!).render(
{/* <HashRouter> */}
<App />
{/* </HashRouter> */}
);
