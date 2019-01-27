/*
 * Copyright (c) 2015 instructure-react
 * Forked from https://github.com/aaronshaf/react-toggle/
 * + applied https://github.com/aaronshaf/react-toggle/pull/90
 **/
import React, { PureComponent } from 'react';
import cx from 'classnames';
import './Toggle.css';

class Toggle extends PureComponent {
  state = {
    checked: false,
    hasFocus: false,
  };

  static getDerivedStateFromProps(props) {
    if ('checked' in props) {
      return { checked: !!props.checked };
    }
  }

  handleClick = event => {
    const checkbox = this.input;
    if (event.target !== checkbox && !this.moved) {
      event.preventDefault();
      checkbox.focus();
      checkbox.click();
      return;
    }

    this.setState({ checked: checkbox.checked });
  };

  handleFocus = event => {
    const { onFocus } = this.props;

    if (onFocus) {
      onFocus(event);
    }

    this.hadFocusAtTouchStart = true;
    this.setState({ hasFocus: true });
  };

  handleBlur = event => {
    const { onBlur } = this.props;

    if (onBlur) {
      onBlur(event);
    }

    this.hadFocusAtTouchStart = false;
    this.setState({ hasFocus: false });
  };

  render() {
    const { className, label, ...inputProps } = this.props;
    const { checked } = this.state;
    return (
      <div
        className={cx('Toggle', className, {
          'Toggle--checked': checked,
          'Toggle--focus': this.state.hasFocus,
          'Toggle--disabled': this.props.disabled,
        })}
        onClick={this.handleClick}
      >
        <div className="Toggle__track" />
        <div className="Toggle__thumb" />

        <input
          {...inputProps}
          ref={ref => {
            this.input = ref;
          }}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          className="Toggle__srt"
          type="checkbox"
          aria-label={label}
        />
      </div>
    );
  }
}

export default Toggle;
