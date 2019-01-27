import React from 'react';
import { Provider, Consumer } from './src/components/Context';

export const onRenderBody = ({ setPostBodyComponents }) => {
  return setPostBodyComponents([
    // TODO: we can add some scripts here but let's be careful
    // and not add any render-blocking ones.
    // In the past there used to be ConvertKit here.
  ]);
};

export const wrapRootElement = ({ element }) => {
  return <Provider>{element}</Provider>;
};

export const wrapPageElement = ({ element, props }) => (
  <Consumer>
    {({ darkMode, toggleDarkMode }) =>
      React.cloneElement(element, { ...props, darkMode, toggleDarkMode })
    }
  </Consumer>
);
