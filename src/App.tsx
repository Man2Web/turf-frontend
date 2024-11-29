import React, { useState } from "react";
import { base_path } from "./environment";
import Feature from "./router/Feature";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./context/app-context";
import { BookingContextProvider } from "./context/booking-context";

// Create the main App component
export const App = () => {
  return (
    <AppContextProvider>
      <BookingContextProvider>
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
      </BookingContextProvider>
    </AppContextProvider>
  );
};
