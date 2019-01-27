import React from 'react';
import cx from 'classnames';
import './SidePanel.css';

const SidePanel = ({ className, isActive, children, ...rest }) => (
  <div
    className={cx('SidePanel', className, {
      'SidePanel--active': isActive,
    })}
    {...rest}
  >
    {children}
  </div>
);

export default SidePanel;
