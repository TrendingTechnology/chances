import React from 'react';
import cx from 'classnames';
import T from 'prop-types';
import './GithubButton.css';
import GithubIcon from '../GithubIcon';

const GithubButton = ({
  className,
  user,
  repo,
  label,
  appendToHref,
  ...rest
}) => (
  <a
    className={cx('GithubButton', className)}
    href={`https://github.com/${user}/${repo}/${appendToHref}`}
    target="_blank"
    rel="noopener noreferrer"
    {...rest}
  >
    <GithubIcon className="GithubButton__icon" size={16} srt={true} />
    <span className="GithubButton__label">{label}</span>
  </a>
);

GithubButton.defaultProps = {
  appendToHref: 'fork',
  repo: 'chances',
  user: 'chancestrickland',
};

GithubButton.propTypes = {
  appendToHref: T.string,
  className: T.string,
  repo: T.string,
  user: T.string,
};

export default GithubButton;
