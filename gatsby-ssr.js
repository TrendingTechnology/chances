import React from 'react';
import { ThemeProvider } from './src/providers/ThemeProvider';

/* export const onRenderBody = ({ setPostBodyComponents }) => {
  return setPostBodyComponents([
    // TODO: we can add some scripts here but let's be careful
    // and not add any render-blocking ones.
    // In the past there used to be ConvertKit here.
  ]);
}; */

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
);
