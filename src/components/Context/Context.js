import React, { Component } from 'react';
const Context = React.createContext();

export class Provider extends Component {
  state = {
    darkMode: localStorage.getItem('theme') === 'dark' ? true : false,
  };

  toggleDarkMode = () =>
    this.setState(state => {
      localStorage.setItem('theme', state.darkMode ? 'light' : 'dark');
      return { darkMode: !state.darkMode };
    });

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
