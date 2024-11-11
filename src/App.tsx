import React, { useState } from "react";
import { base_path } from "./environment";
import Feature from "./router/Feature";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./context/app-context";

// Create the main App component
export const App = () => {
  return (
    <AppContextProvider>
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
    </AppContextProvider>
  );
};
