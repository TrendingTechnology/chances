import React, { useContext } from 'react';
import { uniqueId } from 'lodash';
import cx from 'classnames';
import Toggle from '../Toggle';
import { ThemeContext } from '../../providers/ThemeProvider';
import './DarkModeToggle.css';

export const DarkModeToggle = ({ tabIndex, className }) => {
  const toggleId = uniqueId(`toggle-`);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  return (
    <div className={cx('DarkModeToggle', className)}>
      <label htmlFor={toggleId} className="DarkModeToggle__label">
        <small>{darkMode ? 'Dark' : 'Light'} Mode</small>
      </label>
      <Toggle
        id={toggleId}
        className="DarkModeToggle"
        checked={darkMode}
        onChange={toggleDarkMode}
        label="Toggle between dark and light mode"
        tabIndex={tabIndex}
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
  );
};

export default DarkModeToggle;
