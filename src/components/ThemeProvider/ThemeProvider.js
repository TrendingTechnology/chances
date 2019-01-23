import React, { Component } from 'react';
export const ThemeContext = React.createContext();
export default class ThemeProvider extends Component {
  state = { theme: 'light' };

  setTheme = theme => {
    this.setState({ theme });
  };

  render() {
    return (
      <ThemeContext.Provider
        value={{
          ...this.state,
          setTheme: this.setTheme,
        }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}
