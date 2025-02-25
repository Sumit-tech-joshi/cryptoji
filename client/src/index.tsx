import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "react-multi-carousel/lib/styles.css";
import { ClerkProvider } from "@clerk/clerk-react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);


// Need to remove this and use it from env file
const PUBLISHABLE_KEY =
  "pk_test_c21pbGluZy1wdW1hLTEzLmNsZXJrLmFjY291bnRzLmRldiQ";

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env.local file");
}

root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/login">
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
