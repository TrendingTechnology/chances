import React from 'react';
import cx from 'classnames';
import { range } from 'lodash';
import './Burger.css';

const Burger = ({ isActive, className, onClick, label }) => (
  <button
    className={cx('Burger', className, { 'Burger--active': isActive })}
    onClick={onClick}
  >
    {range(3).map((x, i) => (
      <span key={i} className="Burger__line" aria-hidden />
    ))}
    <span className="Burger__label">{label}</span>
  </button>
);

export default Burger;
