import React, { PureComponent } from 'react';
import T from 'prop-types';
import cx from 'classnames';
import { uniqueId } from 'lodash';

class Svg extends PureComponent {
  static propTypes = {
    children: T.node.isRequired,
    title: T.string.isRequired,
    titleId: T.string.isRequired,
  };

  _titleId = uniqueId(`${this.props.titleId}-`);

  render() {
    const { children, className, title, titleId, ...rest } = this.props;
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={cx('Svg', className)}
        aria-labelledby={this._titleId}
        role="img"
        {...rest}
      >
        <title id={this._titleId}>{title}</title>
        {children}
      </svg>
    );
  }
}

export default Svg;
