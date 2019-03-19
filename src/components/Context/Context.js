import React, { PureComponent } from 'react';
import { noop } from 'lodash';
const defaultState = {
  darkMode: false,
  toggleDarkMode: noop,
};
const Context = React.createContext(defaultState);

export class Provider extends PureComponent {
  state = {
    darkMode: false,
  };

  setDarkModeInLocalStorage = darkMode =>
    window.localStorage.setItem('darkMode', JSON.stringify(darkMode));

  componentDidMount() {
    // Get the dark mode value from localStorage.
    const darkMode = JSON.parse(window.localStorage.getItem('darkMode'));
    if (darkMode) {
      this.setState(state => {
        if (state.darkMode !== darkMode) {
          return { darkMode };
        }
      });
    } else if (
      // Check dark mode preference in macOS Mojave.
      // Not currently cross-browser compatible.
      window.matchMedia('(prefers-color-scheme: dark)').matches === true
    ) {
      this.setState(
        state => {
          if (state.darkMode !== true) {
            return { darkMode: true };
          }
        },
        () => this.setDarkModeInLocalStorage(true)
      );
    }
  }

  toggleDarkMode = () =>
    this.setState(
      state => ({ darkMode: !state.darkMode }),
      () => this.setDarkModeInLocalStorage(this.state.darkMode)
    );

  render() {
    return (
      <Context.Provider
        value={{
          darkMode: this.state.darkMode,
          toggleDarkMode: this.toggleDarkMode,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
