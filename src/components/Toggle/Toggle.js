// Forked from https://github.com/aaronshaf/react-toggle/
import React, { PureComponent } from 'react';
import cx from 'classnames';
import T from 'prop-types';
import { noop } from 'lodash';
import './Toggle.css';

class Toggle extends PureComponent {
  static defaultProps = {
    thumbChildren: noop,
  };

  static propTypes = {
    thumbChildren: T.func,
  };

  state = {
    checked: false,
    hasFocus: false,
  };

  static getDerivedStateFromProps(props) {
    if ('checked' in props) {
      return { checked: !!props.checked };
    }
  }

  handleClick = e => {
    const checkbox = this.input;
    if (e.target !== checkbox) {
      e.preventDefault();
      checkbox.focus();
      checkbox.click();
      return;
    }
    this.setState({ checked: checkbox.checked });
  };

  handleFocus = event => {
    const { onFocus } = this.props;
    if (onFocus) onFocus(event);
    this.setState({ hasFocus: true });
  };

  handleBlur = event => {
    const { onBlur } = this.props;
    if (onBlur) onBlur(event);
    this.setState({ hasFocus: false });
  };

  render() {
    const {
      className,
      label,
      trackClass,
      thumbClass,
      thumbChildren,
      inputClass,
      ...inputProps
    } = this.props;
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
        <div className={cx('Toggle__track', trackClass)} />
        <div className={cx('Toggle__thumb', thumbClass)}>{thumbChildren()}</div>
        <input
          {...inputProps}
          ref={ref => {
            this.input = ref;
          }}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          className={cx('Toggle__input', inputClass)}
          type="checkbox"
          aria-label={label}
        />
      </div>
    );
  }
}

export default Toggle;
