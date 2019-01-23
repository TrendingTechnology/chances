import React, { Component } from 'react';
import cx from 'classnames';
import Bio from '../Bio';
import './BlogHeader.css';

class BlogHeader extends Component {
  render() {
    const { title, subtitle, timeToRead, image, date } = this.props;
    return (
      <div
        className={cx('BlogHeader', {
          'BlogHeader--hasImage': image,
        })}
      >
        {image && (
          <figure className="BlogHeader__imageWrapper">
            <img className="BlogHeader__image" src={image} alt="" />
          </figure>
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
            nameLink="/"
          />
        </div>
      </div>
    );
  }
}

export default BlogHeader;
