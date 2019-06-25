import React from 'react';
import { ThemeProvider } from './src/providers/ThemeProvider';
import 'what-input';
import './src/utils/theme.css';

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
);
