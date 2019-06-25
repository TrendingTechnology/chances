import React from 'react';
import T from 'prop-types';
import { compact } from 'lodash';
import cx from 'classnames';
import { Link } from 'gatsby';
import profilePic from '@assets/headshot.jpg';
import TwitterIcon from '@components/TwitterIcon';
import './Bio.css';

const Bio = ({
  headingEl = 'h3',
  className,
  nameLink,
  timeToRead,
  date,
  updated,
}) => {
  const name = 'Chance Strickland';
  const H = headingEl;
  const sep = <span className="Bio__sep">·</span>;
  const description = compact([
    date,
    updated ? `Updated ${updated}` : null,
    timeToRead || `Tech, leadership and people`,
  ]).map((e, i, a) => (
    <React.Fragment key={e}>
      {e} {sep}
    </React.Fragment>
  ));
  return (
    <div className={cx(`Bio`, className)}>
      <img
        className="Bio__image"
        src={profilePic}
        alt={`Chance Strickland headshot`}
        loading="lazy"
      />
      <div className="Bio__info">
        <H className="Bio__heading">
          {nameLink ? (
            <Link className="Bio__nameLink" to={nameLink}>
              {name}
            </Link>
          ) : (
            name
          )}
        </H>
        <p className="Bio__description">
          {description}
          <a
            className="Bio__iconLink"
            href="https://twitter.com/chancethedev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon
              className="Bio__twitterIcon"
              title="Click to go to Chance's Twitter"
            />
          </a>
        </p>
      </div>
    </div>
  );
};

Bio.propTypes = {
  headingEl: T.oneOfType([T.node, T.string]),
  nameLink: T.string,
  date: T.string,
  updated: T.string,
};

export default Bio;
