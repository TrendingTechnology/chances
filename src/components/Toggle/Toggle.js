/*
 * Copyright (c) 2015 instructure-react
 * Forked from https://github.com/aaronshaf/react-toggle/
 * + applied https://github.com/aaronshaf/react-toggle/pull/90
 **/
import React, { PureComponent } from 'react';
import cx from 'classnames';
import pointerCoord from '../../utils/pointerCoord';
import './Toggle.css';

class Toggle extends PureComponent {
  state = {
    checked: !!(this.props.checked || this.props.defaultChecked),
    hasFocus: false,
  };

  _previouslyChecked = !!(this.props.checked || this.props.defaultChecked);

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({ checked: !!nextProps.checked });
      this._previouslyChecked = !!nextProps.checked;
    }
  }

  handleClick = event => {
    const checkbox = this.input;
    this._previouslyChecked = checkbox.checked;
    if (event.target !== checkbox && !this.moved) {
      event.preventDefault();
      checkbox.focus();
      checkbox.click();
      return;
    }

    this.setState({ checked: checkbox.checked });
  };

  handleTouchStart = event => {
    this.startX = pointerCoord(event).x;
    this.touchStarted = true;
    this.hadFocusAtTouchStart = this.state.hasFocus;
    this.setState({ hasFocus: true });
  };

  handleTouchMove = event => {
    if (!this.touchStarted) return;
    this.touchMoved = true;

    if (this.startX != null) {
      let currentX = pointerCoord(event).x;
      if (this.state.checked && currentX + 15 < this.startX) {
        this.setState({ checked: false });
        this.startX = currentX;
      } else if (!this.state.checked && currentX - 15 > this.startX) {
        this.setState({ checked: true });
        this.startX = currentX;
      }
    }
  };

  handleTouchEnd = event => {
    if (!this.touchMoved) return;
    const checkbox = this.input;
    event.preventDefault();

    if (this.startX != null) {
      if (this._previouslyChecked !== this.state.checked) {
        checkbox.click();
      }

      this.touchStarted = false;
      this.startX = null;
      this.touchMoved = false;
    }

    if (!this.hadFocusAtTouchStart) {
      this.setState({ hasFocus: false });
    }
  };

  handleTouchCancel = event => {
    if (this.startX != null) {
      this.touchStarted = false;
      this.startX = null;
      this.touchMoved = false;
    }

    if (!this.hadFocusAtTouchStart) {
      this.setState({ hasFocus: false });
    }
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
    return (
      <div
        className={cx('Toggle', className, {
          'Toggle--checked': this.state.checked,
          'Toggle--focus': this.state.hasFocus,
          'Toggle--disabled': this.props.disabled,
        })}
        onClick={this.handleClick}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        onTouchCancel={this.handleTouchCancel}
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
