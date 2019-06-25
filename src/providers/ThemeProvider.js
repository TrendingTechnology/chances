import React, { createContext, useState, useEffect } from 'react';
import { noop } from 'lodash';
const defaultState = {
  darkMode: false,
  toggleDarkMode: noop,
};

export const ThemeContext = createContext(defaultState);

export const ThemeProvider = ({ children }) => {
  const isBrowser = typeof window === 'object';
  const defaultDarkMode = isBrowser
    ? JSON.parse(window.localStorage.getItem('darkMode')) ||
      window.matchMedia('(prefers-color-scheme: dark)').matches === true
    : false;
  const [darkMode, setDarkMode] = useState(defaultDarkMode);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    if (isBrowser) {
      window.localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkMode]);

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
