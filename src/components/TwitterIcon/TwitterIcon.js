import React from 'react';
import T from 'prop-types';
import cx from 'classnames';
import Svg from '@components/Svg';

const TwitterIcon = ({ className, size, srt, title, ...rest }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cx('TwitterIcon', className)}
      aria-hidden={srt}
      titleId="TwitterIconTitle"
      title={title}
      {...rest}
    >
      <path d="M18.5 4.43a6.9 6.9 0 0 1-2.18.88 3.45 3.45 0 0 0-2.55-1.12 3.49 3.49 0 0 0-3.49 3.48c0 .28.03.55.07.81a9.91 9.91 0 0 1-7.17-3.67 3.9 3.9 0 0 0-.5 1.74 3.6 3.6 0 0 0 1.56 2.92 3.36 3.36 0 0 1-1.55-.44.15.15 0 0 0 0 .06c0 1.67 1.2 3.08 2.8 3.42-.3.06-.6.1-.94.12l-.62-.06A3.5 3.5 0 0 0 7.17 15a7.33 7.33 0 0 1-4.36 1.49L2 16.44A9.96 9.96 0 0 0 7.36 18c6.4 0 9.91-5.32 9.9-9.9v-.5A6.55 6.55 0 0 0 19 5.79a6.18 6.18 0 0 1-2 .56 3.33 3.33 0 0 0 1.5-1.93" />
    </Svg>
  );
};

TwitterIcon.defaultProps = {
  size: 21,
  title: 'Twitter icon',
};

TwitterIcon.propTypes = {
  size: T.number,
  srt: T.bool,
};

export default TwitterIcon;
