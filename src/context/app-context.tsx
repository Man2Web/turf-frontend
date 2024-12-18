// AppContextProvider.tsx

import React, { createContext, useContext, useState, useEffect } from "react";
import Loader from "../components/common/loader/Loader";

interface AppContextInterface {
  userLocation: string | null;
  setUserLocation: React.Dispatch<React.SetStateAction<string | null>>;
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  isUser: boolean;
  setIsUser: React.Dispatch<React.SetStateAction<boolean>>;
  isSuperAdmin: boolean;
  setIsSuperAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loading: {
    status: boolean;
    description: string;
  };
  setLoading: React.Dispatch<
    React.SetStateAction<{
      status: boolean;
      description: string;
    }>
  >;
}

// Create a context with default values
export const AppContext = createContext<AppContextInterface | undefined>(
  undefined
);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Define the state variables for the different contexts
  const [userLocation, setUserLocation] = useState<string | null>(
    localStorage.getItem("userLocation") || null
  );
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isUser, setIsUser] = useState<boolean>(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>("light");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<{
    status: boolean;
    description: string;
  }>({ status: false, description: "" });
  // Sync userLocation with local storage
  useEffect(() => {
    if (userLocation) {
      localStorage.setItem("userLocation", userLocation);
    } else {
      localStorage.removeItem("userLocation");
    }
  }, [userLocation]);

  return (
    <AppContext.Provider
      value={{
        userLocation,
        setUserLocation,
        theme,
        setTheme,
        isAuthenticated,
        setIsAuthenticated,
        isAdmin,
        setIsAdmin,
        isUser,
        setIsUser,
        isSuperAdmin,
        setIsSuperAdmin,
        isMenuOpen,
        setIsMenuOpen,
        loading,
        setLoading,
      }}
    >
      <Loader
        loader={loading?.status}
        loadingDescription={loading?.description}
      />
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
