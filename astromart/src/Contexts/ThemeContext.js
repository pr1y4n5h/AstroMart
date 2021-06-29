import { createContext, useContext, useState } from "react";

export const themeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setDark] = useState(false);

  return (
    <themeContext.Provider value={{ isDark, setDark }}>
      {children}
    </themeContext.Provider>
  );
}

export function useTheme() {
  return useContext(themeContext);
}
