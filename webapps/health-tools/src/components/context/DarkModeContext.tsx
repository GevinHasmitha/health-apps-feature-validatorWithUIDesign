import React, { createContext, useState } from "react";

interface DarkModeContextType {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DarkModeContext = createContext<DarkModeContextType>(
  {} as DarkModeContextType
);

export const DarkModeProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
