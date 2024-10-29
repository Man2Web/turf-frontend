import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import { BrowserRouter } from "react-router-dom";
import "aos/dist/aos.css";
import "../src/style/scss/main.scss";
import "../src/style/css/feather.css";
import "./index.scss";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { base_path } from "./environment";
import Feature from "./router/Feature";
import { ConfigProvider } from "antd";

// Define the context interface
interface UserLocationContextInterface {
  userLocationInContext: string | null;
  setUserLocationInContext: React.Dispatch<React.SetStateAction<string | null>>;
}

// Create the context
export const UserLocationContext = React.createContext<
  UserLocationContextInterface | undefined
>(undefined);

// Create the main App component
const App = () => {
  const userLocationInStorage = localStorage.getItem("userLocation");

  // console.log(userLocationInStorage);
  const [userLocationInContext, setUserLocationInContext] = useState<
    string | null
  >(userLocationInStorage || null);

  return (
    <UserLocationContext.Provider
      value={{ userLocationInContext, setUserLocationInContext }}
    >
      <BrowserRouter basename={base_path}>
        <ConfigProvider
          theme={{
            components: {
              Modal: {
                titleFontSize: 20,
                titleLineHeight: 2.0,
              },
            },
            token: {
              colorPrimary: "#097E52",
              fontFamily: "Outfit",
            },
          }}
        >
          <Feature />
        </ConfigProvider>
      </BrowserRouter>
    </UserLocationContext.Provider>
  );
};

// Render the App
const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Element with id 'root' not found.");
}
