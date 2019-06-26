import React from 'react';
import 'what-input';
import { ThemeProvider, FontProvider } from '@providers';
import '@lib/theme.css';

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider>
      <FontProvider>{element}</FontProvider>
    </ThemeProvider>
  );
};
