import React, { PureComponent } from 'react';
import { uniqueId } from 'lodash';
import cx from 'classnames';
import Toggle from '../Toggle';
import { Consumer } from '../Context';
import './DarkModeToggle.css';

class DarkModeToggle extends PureComponent {
  _toggleId = uniqueId(`toggle-`);

  render() {
    return (
      <Consumer>
        {({ darkMode, toggleDarkMode }) => (
          <div className={cx('DarkModeToggle', this.props.className)}>
            <label htmlFor={this._toggleId} className="DarkModeToggle__label">
              <small>{darkMode ? 'Dark' : 'Light'} Mode</small>
            </label>
            <Toggle
              id={this._toggleId}
              className="DarkModeToggle"
              checked={darkMode}
              onChange={toggleDarkMode}
              label="Toggle between dark and light mode"
              tabIndex={this.props.tabIndex}
              trackClass="DarkModeToggle__track"
              thumbClass="DarkModeToggle__thumb"
              thumbChildren={() => (
                <>
                  <div className="DarkModeToggle__crater" aria-hidden />
                  <div className="DarkModeToggle__crater" aria-hidden />
                </>
              )}
            />
          </div>
        )}
      </Consumer>
    );
  }
}

export default DarkModeToggle;
