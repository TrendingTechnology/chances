import React, { Component } from 'react';
const Context = React.createContext();

export class Provider extends Component {
  state = {
    darkMode: false,
  };

  toggleDarkMode = () => this.setState(state => ({ darkMode: !state.darkMode }));

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
