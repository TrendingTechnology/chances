import React from 'react';
import { Provider } from './src/components/Context';

/* export const onRenderBody = ({ setPostBodyComponents }) => {
  return setPostBodyComponents([
    // TODO: we can add some scripts here but let's be careful
    // and not add any render-blocking ones.
    // In the past there used to be ConvertKit here.
  ]);
}; */

export const wrapRootElement = ({ element }) => <Provider>{element}</Provider>;
