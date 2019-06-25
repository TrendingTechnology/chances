import React from 'react';
import T from 'prop-types';
import cx from 'classnames';
import { uniqueId } from 'lodash';

const Svg = ({ children, className, title, titleId, ...rest }) => {
  const _titleId = uniqueId(`${titleId}-`);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cx('Svg', className)}
      aria-labelledby={titleId}
      role="img"
      {...rest}
    >
      <title id={_titleId}>{title}</title>
      {children}
    </svg>
  );
};

Svg.propTypes = {
  children: T.node.isRequired,
  title: T.string.isRequired,
  titleId: T.string.isRequired,
};

export default Svg;
