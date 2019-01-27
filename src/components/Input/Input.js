import React from 'react';
import cx from 'classnames';
import T from 'prop-types';
import { Field } from 'formik';
import './Input.css';

const Input = ({
  className,
  component,
  children,
  label,
  showLabel,
  errors,
  touched,
  placeholder,
  type,
  ...rest
}) => {
  return (
    <label className={cx(className, 'Input')}>
      <span
        className={cx('Input__label', {
          'Input__label--hide': !showLabel,
        })}
      >
        {label}
      </span>
      <Field
        className={cx('Input__field', {
          [`Input__field--${type}`]: type,
          [`Input__field--${component}`]: component,
          'Input__field--error': errors && touched,
        })}
        component={component}
        placeholder={!showLabel ? label : placeholder}
        type={type || 'text'}
        {...rest}
      >
        {children}
      </Field>
      {errors && touched && <div className="Input__errors">{errors}</div>}
    </label>
  );
};

Input.defaultProps = {
  showLabel: false,
};

Input.propTypes = {
  className: T.string,
  label: T.string.isRequired,
  showLabel: T.bool,
  errors: T.node,
};

export default Input;
