import React, { useState } from 'react';
import cx from 'classnames';
import { useTransition, animated } from 'react-spring';
import T from 'prop-types';
import Bio from '../Bio';
import './BlogHeader.css';

const BlogHeader = ({
  title,
  subtitle,
  timeToRead,
  image,
  imageAlt,
  date,
  updated,
}) => {
  const [show, set] = useState(false);
  const transitions = useTransition(show, null, {
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  return (
    <div
      className={cx('BlogHeader', {
        'BlogHeader--hasImage': image,
      })}
    >
      {image && (
        <div className="BlogHeader__imageWrapper">
          {transitions.map(({ item, key, props }) => (
            <animated.figure
              key={key}
              className="BlogHeader__imageFigure"
              style={props}
            >
              <img
                className="BlogHeader__image"
                src={image}
                alt={imageAlt}
                loading="lazy"
              />
            </animated.figure>
          ))}
        </div>
      )}
      <div className="BlogHeader__info">
        <div className="BlogHeader__headingWrapper">
          <h1 className="BlogHeader__title">{title}</h1>
          {subtitle && <p className="BlogHeader__subtitle">{subtitle}</p>}
        </div>
        <Bio
          className="BlogHeader__bio"
          timeToRead={timeToRead}
          date={date}
          updated={updated}
          nameLink="/"
        />
      </div>
    </div>
  );
};

BlogHeader.propTypes = {
  title: T.string,
  subtitle: T.string,
  timeToRead: T.string,
  image: T.string,
  imageAlt: T.string,
  date: T.string,
};

export default BlogHeader;
