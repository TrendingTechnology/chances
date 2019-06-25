import React from 'react';
import { ThemeProvider } from './src/providers/ThemeProvider';
import 'what-input';
import '@lib/theme.css';

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
);
