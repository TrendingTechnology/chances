import React from 'react';
import cx from 'classnames';
import './SidePanel.css';

const SidePanel = ({ className, isActive, children }) => (
  <div
    className={cx('SidePanel', className, {
      'SidePanel--active': isActive,
    })}
  >
    {children}
  </div>
);

export default SidePanel;
