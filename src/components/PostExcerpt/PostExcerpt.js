import React from 'react';
import { Link } from 'gatsby';
import cx from 'classnames';
import { leadingSlashIt } from '@lib/utils';
import './PostExcerpt.css';

const PostExcerpt = ({ className, title, slug, date, timeToRead, spoiler }) => {
  return (
    <article className={cx('PostExcerpt', className)}>
      <header className="PostExcerpt__header">
        <h3 className="PostExcerpt__title">
          <Link className="PostExcerpt__titleLink" to={leadingSlashIt(slug)}>
            {title}
          </Link>
        </h3>
        <small className="PostExcerpt__meta">
          {date}
          {` • ${timeToRead}`}
        </small>
      </header>
      <p
        className="PostExcerpt__spoiler"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: spoiler }}
      />
      <small className="PostExcerpt__more">
        <Link
          className="PostExcerpt__moreLink"
          to={leadingSlashIt(slug)}
          rel="bookmark"
        >
          Read More
        </Link>
      </small>
    </article>
  );
};

export default PostExcerpt;
