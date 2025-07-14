
// Main application entry point for the blog app. This file bootstraps the React application and mounts it to the DOM.
// It imports the root App component and global styles, then renders the app into the #root element.
// If the root element is missing, an error is logged and the app does not render.
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Render the React application with exception handling
try {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element with id 'root' not found. App cannot be mounted.");
  }
  createRoot(rootElement).render(<App/>);
} catch (err) {
  // Log the error to the console and optionally show a fallback UI
  // (In production, you might want to report this to an error tracking service)
  // eslint-disable-next-line no-console
  console.error("Failed to mount React app:", err);
  // Optionally, display a fallback message to the user
  const fallback = document.createElement('div');
  fallback.style.cssText = 'color: red; font-family: monospace; padding: 2rem;';
  fallback.innerText = 'An error occurred while loading the application. Please try refreshing the page.';
  document.body.appendChild(fallback);
}
