import React from 'react';
import { Provider, Consumer } from './src/components/Context';
import 'what-input';
import './src/utils/theme.css';

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
