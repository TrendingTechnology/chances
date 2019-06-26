import React, { createContext } from 'react';
import { usePromise } from '@lib/hooks';
import { Fonts } from '@lib/fonts';

const defaultState = { fontsLoaded: true, fontError: null };

export const FontContext = createContext(defaultState);

export const FontProvider = ({ children }) => {
  const isBrowser = typeof window === 'object';
  const [fontsLoaded, fontError] = usePromise(Fonts(), []);
  return (
    <FontContext.Provider
      value={{ fontsLoaded: isBrowser ? fontsLoaded : true, fontError }}
    >
      {children}
    </FontContext.Provider>
  );
};
